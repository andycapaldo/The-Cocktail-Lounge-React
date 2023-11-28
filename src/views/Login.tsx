import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import UserType from "../types/auth";



type LoginProps = {
    logUserIn: (user:Partial<UserType>) => void,
    isLoggedIn: boolean
}


export default function Login({ logUserIn, isLoggedIn }: LoginProps) {

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn){
            navigate('/home')
        }
    })

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({username:'', password:''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        logUserIn(userFormData);
        navigate('/home');
    }


return (
        <>
            <Container className="loginSignUpContainer">
                <Card className="loginSignUpCard">
                    <Card.Body>
                        <Row>
                            <Col >
                                <h1>Log In</h1>
                            </Col>
                            <Form onSubmit={handleFormSubmit}>
                                <Col>
                                    <Form.Control value={userFormData.username} name='username' onChange={handleInputChange} className="input-box" placeholder="Username" />
                                </Col>
                                <Col>
                                    <Form.Control value={userFormData.password} name='password' type='password' onChange={handleInputChange} className="input-box" placeholder="Password" />
                                </Col>
                                <Col>
                                    <Button type='submit' variant="outline-info" className='loginBtn'>Log In</Button>
                                </Col>
                            </Form>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}