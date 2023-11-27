import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import UserType from '../../types/auth';
import './SignUpStyles.css'


type SignUpProps = {
    logUserIn: (user:Partial<UserType>) => void
}



export default function SignUp({ logUserIn }: SignUpProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>(
        {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(e.target.name, e.target.value)
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        logUserIn(userFormData);
        navigate('/')
    }

  return (
    <>
    <Container>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <h1>Sign Up</h1>
                    </Col>
                    <Form onSubmit={handleFormSubmit}>
                        <Col>
                            <Form.Control value={userFormData.firstName} name='firstName' onChange={handleInputChange} className="input-box" placeholder="First Name" />
                        </Col>
                        <Col>
                            <Form.Control value={userFormData.lastName} name='lastName' onChange={handleInputChange} className="input-box" placeholder="Last Name" />
                        </Col>
                        <Col>
                            <Form.Control value={userFormData.email} name='email' onChange={handleInputChange} className="input-box" placeholder="Email" />
                        </Col>
                        <Col>
                            <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} className="input-box" placeholder="Password" />
                        </Col>
                        <Col>
                            <Form.Control value={userFormData.confirmPassword} name='confirmPassword' type='password' onChange={handleInputChange} className="input-box" placeholder="Confirm Password" />
                        </Col>
                        <Col>
                            <Button type='submit' variant="outline-info" className='loginBtn'>Sign Up</Button>
                        </Col>
                    </Form>
                </Row>
            </Card.Body>
        </Card>
    </Container>
</>
  )
}