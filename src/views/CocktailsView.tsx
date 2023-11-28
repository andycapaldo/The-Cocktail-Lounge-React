import { useState, useEffect } from 'react';
import UserCockTailType from '../types/user_cocktail';
import Cocktail from '../components/Cocktail';


type CocktailsViewProps = {}



export default function CocktailsView({}: CocktailsViewProps) {
    const [cocktails, setCocktails] = useState<UserCockTailType[]>([]);

    useEffect( () => {
        fetch('https://the-cocktail-lounge.onrender.com/api/cocktails')
            .then(res => res.json())
            .then(data => setCocktails(data))
    }, [])

  return (
    <>
        <h2>Cocktails</h2>
        {cocktails.map((cocktail) => (
            <Cocktail key={cocktail.id} cocktail={cocktail} />
        ))}
    </>
  )
}