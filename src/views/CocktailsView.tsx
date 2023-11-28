import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCocktailType from '../types/user_cocktail';
import Cocktail from '../components/Cocktail';
import { getUserCocktails } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import CocktailForm from '../components/CocktailForm';
import CategoryType from '../types/category';
import { Row } from 'react-bootstrap';
import UserType from '../types/auth';




type CocktailsViewProps = {
    isLoggedIn: boolean,
    flashMessage: (message:string, category: CategoryType) => void,
    currentUser: UserType|null
}



export default function CocktailsView({ isLoggedIn, flashMessage, currentUser }: CocktailsViewProps) {
    const [cocktails, setCocktails] = useState<UserCocktailType[]>([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);


    useEffect( () => {
        async function fetchData(){
            const response = await getUserCocktails();
            if (response.data){
                setCocktails(response.data)
            }
        };

        fetchData()
    }, [formSubmitted])

    return (
        <>
        <Row>
            <h2>Cocktails</h2>
            { isLoggedIn && <Button variant='success' onClick={() => setDisplayForm(!displayForm)}>
                    {displayForm ? 'Hide Form' : '+ Create New Cocktail'}
                </Button>}

                {displayForm && <CocktailForm flashMessage={flashMessage} setDisplay={setDisplayForm} setForm={setFormSubmitted} toggle={formSubmitted} />}
            {cocktails.map((cocktail) => (
                <Cocktail key={cocktail.id} cocktail={cocktail} currentUser={currentUser} />
            ))}
        </Row>
        </>
    )
}