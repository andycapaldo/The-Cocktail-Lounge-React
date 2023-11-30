import { CocktailDBCocktail } from "../types/cocktaildb";
import Card from 'react-bootstrap/Card';
import { Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';



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
        <Row>
            <Card className='my-5 cocktailViewCard'>
                <Card.Body>
                    <Card.Title>{ cocktail!.strDrink }</Card.Title>
                    <Card.Img className="cocktailsViewImg" src={cocktail.strDrinkThumb} />
                    <Card.Text>Type - {cocktail.strAlcoholic}</Card.Text>
                    <Card.Text>Served in - {cocktail!.strGlass}</Card.Text>
                    <Col className="col">
                        <h4>Ingredients</h4>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{String(ingredient)}</li>
                            ))}
                        </ul>
                    </Col>
                    <Col className="col">
                        <h4>Measures</h4>
                        <ul>
                            {measures.map((measure, index) => (
                                <li key={index}>{String(measure)}</li>
                            ))}
                        </ul>
                    </Col>
                    <Card.Text>Instructions: {cocktail!.strInstructions}</Card.Text>
                    <Card.Subtitle className="mt-3">From <Link to='https://www.thecocktaildb.com/'>TheCocktailDB</Link></Card.Subtitle>
                </Card.Body>
            </Card>
        </Row>
    </>
  )
}