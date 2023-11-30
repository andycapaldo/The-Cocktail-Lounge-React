// View that shows all user submitted cocktails
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCocktailType from '../types/user_cocktail';
import Cocktail from '../components/Cocktail';
import { getUserCocktails } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import CocktailForm from '../components/CocktailForm';
import CategoryType from '../types/category';
import { Row, Col } from 'react-bootstrap';




type CocktailsViewProps = {
    isLoggedIn: boolean,
    flashMessage: (message:string, category: CategoryType) => void
}



export default function CocktailsView({ isLoggedIn, flashMessage }: CocktailsViewProps) {
    const [cocktails, setCocktails] = useState<UserCocktailType[]>([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/')
        }
    }, [isLoggedIn])


    useEffect( () => {
        async function fetchData(){
            const response = await getUserCocktails();
            if (response.data){
                setCocktails(response.data)
            }
        };

        fetchData()
    }, [formSubmitted])

    return (
        <>
        <Row>
            <Col className='col-12 d-flex justify-content-center mt-5'><h2> User Cocktails</h2></Col>
            
            {cocktails.map((cocktail) => (
                <Cocktail key={cocktail.id} cocktail={cocktail} />
            ))}
            { isLoggedIn && <Col className='createCocktailBtnCol'><Button className='createCocktailBtn' variant='success' onClick={() => setDisplayForm(!displayForm)}>
                    {displayForm ? 'Hide Form' : 'Create New Cocktail'}
                </Button> </Col>}
                {displayForm && <CocktailForm flashMessage={flashMessage} setDisplay={setDisplayForm} setForm={setFormSubmitted} toggle={formSubmitted} />}
        </Row>
        </>
    )
}