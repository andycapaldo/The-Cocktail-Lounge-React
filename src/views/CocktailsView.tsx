import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCocktailType from '../types/user_cocktail';
import Cocktail from '../components/Cocktail';
import { getUserCocktails } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import CocktailForm from '../components/CocktailForm';




type CocktailsViewProps = {
    isLoggedIn: boolean
}



export default function CocktailsView({ isLoggedIn }: CocktailsViewProps) {
    const [cocktails, setCocktails] = useState<UserCocktailType[]>([]);
    const [displayForm, setDisplayForm] = useState(false);


    useEffect( () => {
        async function fetchData(){
            const response = await getUserCocktails();
            if (response.data){
                setCocktails(response.data)
            }
        };

        fetchData()
    }, [])

    return (
        <>
            <h2>Cocktails</h2>
            { isLoggedIn && <Button variant='success' onClick={() => setDisplayForm(!displayForm)}>
                    {displayForm ? 'Hide Form' : '+ Create New Cocktail'}
                </Button>}

                {displayForm && <CocktailForm />}
            {cocktails.map((cocktail) => (
                <Cocktail key={cocktail.id} cocktail={cocktail} />
            ))}
        </>
    )
}