import { useState, useEffect } from 'react';
import { CocktailDBCocktail } from '../types/cocktaildb';
import { Card } from 'react-bootstrap';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const itemsPerPage = 27;

type CocktailListProps = {
    cocktailArray: CocktailDBCocktail[],
}

const CocktailList: React.FC<CocktailListProps> = ({ cocktailArray }) => {
    const [currentPage, setCurrentPage] = useState('A');

    const indexOfFirstItem = cocktailArray.findIndex(cocktail => cocktail.strDrink.charAt(0).toUpperCase() === currentPage);
    const currentItems = cocktailArray.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const paginate = (letter: string) => {
        setCurrentPage(letter);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    const uniqueLetters = Array.from(new Set(cocktailArray.map(cocktail => cocktail.strDrink.charAt(0).toUpperCase())))
        .filter(letter => /^[A-Z]$/.test(letter)) 
        .sort();

    return (
        <Row>
            {currentItems.map(cocktail => (
                <Col>
                    <Card className='cocktailsViewCard' key={cocktail.idDrink}>
                        <Card.Body >
                            <Card.Img className='cocktailDbImgHomePage img-fluid' src={cocktail.strDrinkThumb}></Card.Img>
                            <Card.Title className='mt-2'>{cocktail.strDrink}</Card.Title>
                            <Link to={`/cocktaildb/${cocktail.idDrink}`}><Button variant='dark'>View More</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}

            <Col className='col-12 d-flex justify-content-center mt-5 mb-5'>
                {uniqueLetters.map(letter => (
                    <button className='paginationButtonHome' key={letter} onClick={() => paginate(letter)}>
                        {letter}
                    </button>
                ))}
            </Col>
        </Row>
    );
};

export default CocktailList;