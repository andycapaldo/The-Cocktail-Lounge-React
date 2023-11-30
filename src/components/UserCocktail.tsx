// View for specific user created cocktails, showing details of the drink like ingredients, instructions etc.

import UserCocktailType from "../types/user_cocktail";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



type CocktailDetailsProps = {
    cocktail: UserCocktailType | null
}


export default function CocktailView({ cocktail }: CocktailDetailsProps) {
    if (!cocktail){
        return <div>Loading...</div>
    }

    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 10; i++) {
        const ingredientKey = `ingredient${i}` as keyof UserCocktailType;
        const measureKey = `measure${i}` as keyof UserCocktailType;

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
                <Card.Title>{ cocktail!.drinkName }</Card.Title>
                <Card.Img className="cocktailsViewImg" src={ cocktail!.imageUrl }></Card.Img>
                <Card.Text>Type - {cocktail!.drinkType === true ? 'Alcoholic' : 'Non-Alcoholic'}</Card.Text>
                <Card.Text>Served in - { cocktail!.glassType }</Card.Text>
                <h4>Ingredients</h4>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{String(ingredient)}</li>
                    ))}
                </ul>
                <h4>Measures</h4>
                <ul>
                    {measures.map((measure, index) => (
                        <li key={index}>{String(measure)}</li>
                    ))}
                </ul>
                <Card.Text>Instructions: {cocktail!.instructions}</Card.Text>
                <Card.Subtitle>By <Link to={`/profile/${cocktail.author.id}`}>{cocktail!.author.username}</Link></Card.Subtitle>
            </Card.Body>
        </Card>
    </>
  )
}