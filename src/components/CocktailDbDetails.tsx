import { CocktailDBCocktail } from "../types/cocktaildb";
import Card from 'react-bootstrap/Card';



type CocktailDbDetailsProps = {
    cocktail: CocktailDBCocktail
}




export default function CocktailDbDetails({ cocktail }: CocktailDbDetailsProps) {
    if (!cocktail){
        return <div>Loading...</div>
    }

    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}` as keyof CocktailDBCocktail;
        const measureKey = `strMeasure${i}` as keyof CocktailDBCocktail;

        // Check if ingredient and measure properties exist and are not empty
        if (cocktail![ingredientKey] && cocktail![measureKey]) {
            ingredients.push(cocktail![ingredientKey]);
            measures.push(cocktail![measureKey]);
        }
    }


return (
    <>
        <Card className='my-5'>
            <Card.Body>
                <Card.Title>{ cocktail!.strDrink }</Card.Title>
            </Card.Body>
        </Card>
    </>
  )
}