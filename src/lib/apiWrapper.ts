import axios from 'axios';
import APIResponse from '../types/api';
import UserType from '../types/auth';
import UserCockTailType from '../types/user_cocktail';
import CommentType from '../types/comment';


const base: string = 'https://the-cocktail-lounge.onrender.com/api'
const cocktailEndpoint: string = '/cocktails'
const userEndpoint: string = '/users'
const tokenEndpoint: string = '/token'
const commentEndpoint: string = '/comments'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: base
    }
)


const apiClientBasicAuth = (username: string, password: string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Basic ' + btoa(`${username}:${password}`)
        }
    }
)

const apiClientTokenAuth = (token:string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
)

async function getUserCocktails(): Promise<APIResponse<UserCockTailType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(cocktailEndpoint);
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

async function getUserCocktail(drink_id: string): Promise<APIResponse<UserCockTailType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(cocktailEndpoint + '/' + drink_id)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function createNewUser(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function login(username:string, password:string): Promise<APIResponse<{token:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function createCocktail(token:string, formData: Partial<UserCockTailType>): Promise<APIResponse<UserCockTailType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(cocktailEndpoint, formData);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function editCocktail(token:string, cocktailId:string, editedCocktailData:UserCockTailType): Promise<APIResponse<UserCockTailType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(cocktailEndpoint + '/' + cocktailId, editedCocktailData);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function deleteCocktail(token:string, cocktailId:string): Promise<APIResponse<{success:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(cocktailEndpoint + '/' + cocktailId);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function getCommentsOnCocktail(cocktailId:string): Promise<APIResponse<CommentType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(commentEndpoint + '/' + cocktailId);
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
    getUserCocktails,
    getUserCocktail,
    createNewUser,
    login,
    getMe,
    createCocktail,
    editCocktail,
    deleteCocktail,
    getCommentsOnCocktail
}