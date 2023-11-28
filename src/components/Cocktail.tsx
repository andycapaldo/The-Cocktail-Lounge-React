// Component to show the image and drink name for any given cocktails for the CocktailsView view
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

import UserCocktailType from "../types/user_cocktail"
import UserType from "../types/auth";

type CocktailProps = {
    cocktail: UserCocktailType,
    currentUser: UserType|null
}



export default function Cocktail({ cocktail, currentUser }: CocktailProps) {

  return (
    <Col classsName='col-1'>
        <Card className='my-5 cocktailsViewCard'>
            <Card.Body>
                <Card.Img className="cocktailsViewImg img-fluid" src={ cocktail.imageUrl }></Card.Img>
                <Card.Title>{ cocktail.drinkName }</Card.Title>
                {cocktail.author.id === currentUser?.id && (
                    <Link to={`/cocktails/${cocktail.id}`}>
                        <Button variant='light' className='mt-3'>Edit Cocktail</Button>
                    </Link>
                )}
            </Card.Body>
        </Card>
    </Col>
  )
}