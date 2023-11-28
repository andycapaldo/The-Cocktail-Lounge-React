import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import UserType from '../types/auth';
import { createNewUser, login } from '../lib/apiWrapper';
import CategoryType from '../types/category';


type SignUpProps = {
    logUserIn: (user:Partial<UserType>) => void,
    flashMessage: (message: string, category:CategoryType) => void
}



export default function SignUp({ logUserIn, flashMessage }: SignUpProps) {

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
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const response = await createNewUser(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const newUser = response.data!
            const newUserTokenResponse = await login(userFormData.username!, userFormData.password!)
            localStorage.setItem('token', newUserTokenResponse.data?.token!)
            logUserIn(newUser);
            navigate('/home');
        }
    }

    
    const validatePasswords = (password:string, confirmPassword:string):boolean => {
        return password.length >= 5 && password === confirmPassword
    }

    const validatedForm = validatePasswords(userFormData.password!, userFormData.confirmPassword!)

  return (
    <>
    <Container className='loginSignUpContainer'>
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
                            <Form.Control value={userFormData.username} name='username' onChange={handleInputChange} className="input-box" placeholder="Username" />
                        </Col>
                        <Col>
                            <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} className="input-box" placeholder="Password" />
                        </Col>
                        <Col>
                            <Form.Control value={userFormData.confirmPassword} name='confirmPassword' type='password' onChange={handleInputChange} className="input-box" placeholder="Confirm Password" />
                        </Col>
                        <Col>
                            <Button type='submit' variant="outline-info" className='loginBtn' disabled={!validatedForm}>Sign Up</Button>
                        </Col>
                    </Form>
                </Row>
            </Card.Body>
        </Card>
    </Container>
</>
  )
}