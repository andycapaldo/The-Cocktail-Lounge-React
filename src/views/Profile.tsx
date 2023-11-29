import UserType from "../types/auth"
import UserCocktailType from "../types/user_cocktail";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { getUserCocktails, getUser } from "../lib/apiWrapper";
import Cocktail from "../components/Cocktail";
import { Row, Col } from "react-bootstrap";



type ProfileProps = {
    loggedInUser: Partial<UserType> | null;
}




export default function Profile({ loggedInUser}: ProfileProps) {
    const [cocktails, setCocktails] = useState<UserCocktailType[]>([]);
    const [userProfile, setUserProfile] = useState<UserType|null>(null);
    const { userId } = useParams();

    useEffect( () => {
        async function fetchUser(){
            const response = await getUser(userId as string)
            if (response.data){
                setUserProfile(response.data)
            }else {
                console.warn(response.error)
            }
        };

        fetchUser()
    }, [userProfile])

    useEffect( () => {
        async function fetchData(){
            const response = await getUserCocktails();
            if (response.data){
                setCocktails(response.data)
            }
        };

        fetchData()
    }, [loggedInUser])

    const userCocktails = (cocktails.filter((cocktail) => cocktail.author.id === userProfile?.id))
    

  return (
    <>
        {userProfile && <h1>{userProfile.firstName}'s Profile</h1>}
            <Card>
            <Card.Body>
                <Card.Text>First Name: {userProfile?.firstName}</Card.Text>
                <Card.Text>Last Name: {userProfile?.lastName}</Card.Text>
                <Card.Text>Email: {userProfile?.email}</Card.Text>
                <Card.Text>Cocktails: {userCocktails.length}</Card.Text>
            </Card.Body>
        </Card>
        <Row>
            {loggedInUser && loggedInUser?.id === userProfile?.id && (
            <>
            <Col className="d-flex justify-content-center">
                <Button className='mt-3' variant='success' >
                    Edit Profile
                </Button>
            </Col>
            <Col className="d-flex justify-content-center">
                <Button className='mt-3' variant='danger'>
                    Delete Profile
                </Button>
            </Col>
            </>
            )}
        </Row>
            {userCocktails.map((cocktail) => (
                <Cocktail key={cocktail.id} cocktail={cocktail} />
            ))}
    </>
  )
}