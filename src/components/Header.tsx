import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import UserType from "../types/auth";
import logo from '/logo.svg'


type HeaderProps = {
    loggedInUser: UserType|null,
    isLoggedIn: boolean,
    handleLogOut: ()=>void
}

export default function Header({ loggedInUser, isLoggedIn, handleLogOut }: HeaderProps) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to='/home' className="navText"> <img src={logo} className="mainNavLogo"/>{' '}The Cocktail Lounge</Navbar.Brand>
                <Nav className="d-flex justify-content-center">
                    <Nav.Link className="navText" as={Link} to="/cocktails">User Creations</Nav.Link>
                    <Nav.Link className="navText" as={Link} to={`/profile/${loggedInUser?.id}`}>Profile</Nav.Link>
                    { isLoggedIn ? (
                        <Nav.Link className="navText" as={Link} to='/' onClick={handleLogOut}>Logout</Nav.Link>
                    ) : (
                        <>
                            <Nav.Link className="navText" as={Link} to="/login">Log In</Nav.Link>
                            <Nav.Link className="navText" as={Link} to="/signup">Sign Up</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}