import axios from 'axios';
import APIResponse from '../types/api';
import CocktailDBArray from '../types/cocktaildb';

const base: string = 'https://thecocktaildb.com/api/json/v2/9973533'
const allCocktailsEndpoint: string = '/search.php?s='
const singleCocktailEndpoint: string = '/lookup.php?i='



const apiClientNoAuth = () => axios.create(
    {
        baseURL: base
    }
)


async function getCocktails(): Promise<APIResponse<CocktailDBArray>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(allCocktailsEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function getSingleCocktail(idDrink: string): Promise<APIResponse<CocktailDBArray>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(singleCocktailEndpoint + idDrink);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


export {
    getCocktails,
    getSingleCocktail
}