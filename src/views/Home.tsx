import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CocktailDBArray from "../types/cocktaildb";
import { getCocktails } from "../lib/thirdPartyApi";
import CocktailList from "../components/CocktailDBList";
import { Link } from "react-router-dom";





export default function Home() {
  const [cocktails, setCocktails] = useState<CocktailDBArray | null>(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    async function fetchData() {
        try {
            const response = await getCocktails();
            if (response.data) {
                setCocktails(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    fetchData();
}, []);

  const cocktailArray = cocktails?.drinks || [];
  
  cocktailArray.sort((a, b) => {
    const nameA = a.strDrink.toUpperCase();
    const nameB = b.strDrink.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
});

  return (
  <div>
    <Row>
      <Col className='col-12'>
        <h1 className='d-flex justify-content-center mt-5'>Welcome to The Cocktail Lounge</h1>
      </Col>
      <Col className='col-12'>
        <h5 className='d-flex justify-content-center mt-3'>Below is an alphabetically sorted list of cocktails sourced from&nbsp;<a href='https://www.thecocktaildb.com/'>TheCocktailDb.com</a></h5>
      </Col>
    <Col className='col-12'>
    <h5 className='d-flex justify-content-center mt-3'>The database currently holds {cocktailArray.length} Cocktails</h5>
    <p className='d-flex justify-content-center mt-3'>Feel free to browse through the list, or visit&nbsp; <Link to='/cocktails'>User Creations</Link>&nbsp;to see what our Forum Users have created!</p>
    </Col>
  </Row>
    {loading ? ( 
        <p>Loading...</p>
    ) : cocktails ? ( 
        <CocktailList cocktailArray={cocktails.drinks} />
    ) : (
        <p>No cocktails available</p>
    )}
</div>
);
}