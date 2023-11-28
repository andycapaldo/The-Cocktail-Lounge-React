import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

import UserCocktailType from "../types/user_cocktail"
import UserType from "../types/auth";

type CocktailProps = {
    cocktail: UserCocktailType
}



export default function Cocktail({ cocktail }: CocktailProps) {

    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 10; i++) {
        const ingredientKey = `ingredient${i}` as keyof UserCocktailType;
        const measureKey = `measure${i}` as keyof UserCocktailType;

        // Check if ingredient and measure properties exist and are not empty
        if (cocktail[ingredientKey] && cocktail[measureKey]) {
            ingredients.push(cocktail[ingredientKey]);
            measures.push(cocktail[measureKey]);
        }
    }


  return (
    <Col classsName='col-1'>
        <Card className='my-5 cocktailsViewCard'>
            <Card.Body>
                <Card.Img className="cocktailsViewImg img-fluid" src={ cocktail.imageUrl }></Card.Img>
                <Card.Title>{ cocktail.drinkName }</Card.Title>
            </Card.Body>
        </Card>
    </Col>
  )
}