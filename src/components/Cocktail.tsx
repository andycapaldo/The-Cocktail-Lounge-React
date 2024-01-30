// Component to show the image and drink name for any given cocktails for the CocktailsView view
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';

import UserCocktailType from "../types/user_cocktail"

type CocktailProps = {
    cocktail: UserCocktailType,
}



export default function Cocktail({ cocktail }: CocktailProps) {

  return (
    <Col classsName='col-1'>
        <Card className='my-5 cocktailsViewCard'>
            <Card.Body>
                <Card.Img className="allUserCocktailsViewImg img-fluid" src={ cocktail.imageUrl }></Card.Img>
                <Card.Title className='mt-3'>{ cocktail.drinkName }</Card.Title>
                <Link to={`/usercocktail/${cocktail.id}`} >
                    <Button variant='dark' className='mt-3'>View More</Button>
                </Link>
            </Card.Body>
        </Card>
    </Col>
  )
}