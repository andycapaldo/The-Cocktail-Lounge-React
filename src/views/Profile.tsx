import UserType from "../types/auth"
import UserCocktailType from "../types/user_cocktail";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { getUserCocktails } from "../lib/apiWrapper";


type ProfileProps = {
    loggedInUser: Partial<UserType> | null;
}




export default function Profile({ loggedInUser}: ProfileProps) {
    const [cocktails, setCocktails] = useState<UserCocktailType[]>([]);

    useEffect( () => {
        async function fetchData(){
            const response = await getUserCocktails();
            if (response.data){
                setCocktails(response.data)
            }
        };

        fetchData()
    }, [loggedInUser])

    console.log(cocktails)

  return (
    <>
        {loggedInUser && <h1>{loggedInUser.firstName}'s Profile</h1>}
            <Card>
            <Card.Body>
                <Card.Text>First Name: {loggedInUser?.firstName}</Card.Text>
                <Card.Text>Last Name: {loggedInUser?.lastName}</Card.Text>
                <Card.Text>Email: {loggedInUser?.email}</Card.Text>
            </Card.Body>
        </Card>
            <Button variant='success' >
                Edit Profile
            </Button>
            <Button variant='danger'>
                Delete Profile
            </Button>
    </>
  )
}