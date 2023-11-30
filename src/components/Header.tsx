import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import UserType from "../types/auth";


type HeaderProps = {
    loggedInUser: UserType|null,
    isLoggedIn: boolean,
    handleLogOut: ()=>void
}

export default function Header({ loggedInUser, isLoggedIn, handleLogOut }: HeaderProps) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to='/home'>The Cocktail Lounge</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/cocktails">User Creations</Nav.Link>
                    <Nav.Link as={Link} to={`/profile/${loggedInUser?.id}`}>Profile</Nav.Link>
                    { isLoggedIn ? (
                        <Nav.Link as={Link} to='/' onClick={handleLogOut}>Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}