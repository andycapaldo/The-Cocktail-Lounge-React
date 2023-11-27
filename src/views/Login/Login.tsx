import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import UserType from "../../types/auth";
import './LoginStyles.css';
import CategoryType from "../../types/category";

type LoginProps = {
    logUserIn: (user:Partial<UserType>) => void,
    // isLoggedIn: boolean,
    // flashMessage: (message:string, category:CategoryType) => void
}


export default function Login({ logUserIn }: LoginProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({username:'', password:''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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