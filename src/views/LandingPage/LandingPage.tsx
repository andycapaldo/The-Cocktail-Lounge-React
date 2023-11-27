import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingStyles.css";
import logo from '/logo.svg'

type LandingPageProps = {}


export default function LandingPage({}: LandingPageProps) {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">The Cocktail Lounge</h1>
              <img src={logo} className="logo" />
              <p className="subtitle">Made by and for Cocktail Aficionados</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
