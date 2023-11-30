// View for viewing a specific cocktail in the 3rd party API by idDrink
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CocktailDbDetails from '../components/CocktailDbDetails';
import { getSingleCocktail } from '../lib/thirdPartyApi';
import CocktailDBArray from '../types/cocktaildb';






export default function CocktailDBView() {
    const { idDrink } = useParams();
    const [cocktailToView, setCocktailToView] = useState<CocktailDBArray|null>(null);


    useEffect( () => {
        async function getCocktailToView(){
            const response = await getSingleCocktail(idDrink as string);
            if (!response.error && response.data){
                setCocktailToView(response.data)
            } else {
                console.warn('Failed to fetch the cocktail:', response.error)
            }
        }
        getCocktailToView();
    }, [idDrink])

    if (cocktailToView === null) {
        return <div>Loading...</div>;
    }

    const drinks = cocktailToView.drinks || [];

  return (
    <>
        <CocktailDbDetails cocktail={drinks[0]} />
    </>
  )
}