import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import UserType from "../types/auth";
import { login, getMe } from "../lib/apiWrapper";
import CategoryType from "../types/category";



type LoginProps = {
    logUserIn: (user:UserType) => void,
    isLoggedIn: boolean,
    flashMessage: (message:string, category:CategoryType) => void
}


export default function Login({ logUserIn, isLoggedIn, flashMessage }: LoginProps) {

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

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const response = await login(userFormData.username!, userFormData.password!)
        if (response.error){
            flashMessage(response.error, 'warning')
        }else {
            localStorage.setItem('token', response.data?.token as string)
            const response2 = await getMe(response.data?.token as string)
            logUserIn(response2.data!)
            navigate('/home');
        }
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