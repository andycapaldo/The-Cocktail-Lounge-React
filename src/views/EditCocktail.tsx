import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserCocktailType from '../types/user_cocktail';
import { getUserCocktail, editCocktail } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';
import CategoryType from '../types/category';


type EditCocktailProps = {
    currentUser: UserType|null,
    flashMessage: (message:string, category:CategoryType) => void
}



export default function EditCocktail({ currentUser, flashMessage }: EditCocktailProps) {
    const { cocktailId } = useParams();
    const navigate = useNavigate();


    const [cocktailToEdit, setCocktailToEdit] = useState<UserCocktailType|null>(null);

    useEffect( () => {
        async function getCocktailToEdit(){
            let response = await getUserCocktail(cocktailId!);
            if (response.error){
                console.warn(response.error)
            } else {
                setCocktailToEdit(response.data!);
            }
        }

        getCocktailToEdit();
    }, []);

    useEffect( () => {
        if (cocktailToEdit && currentUser){
            if (cocktailToEdit.author.id !== currentUser.id){
                flashMessage('You do not have permission to edit this cocktail.', 'warning');
                navigate('/cocktails')
            }
        }
    }, [cocktailToEdit, currentUser])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCocktailToEdit({...cocktailToEdit!, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editCocktail(token, cocktailId!, cocktailToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.drinkName} has been edited`, 'success');
            navigate('/cocktails')
        }
    }

  return (
    <>
    <h1 className="text-center">Edit {cocktailToEdit?.drinkName}</h1>
    {cocktailToEdit && (
        <Card>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Edit Drink Name</Form.Label>
                    <Form.Control onChange={handleInputChange} name='drinkName' value={cocktailToEdit.drinkName} />
                    <Form.Label>Edit Glass Type</Form.Label>
                    <Form.Control onChange={handleInputChange} name='glassType' value={cocktailToEdit.glassType} />

                    <Form.Label htmlFor='ingredient1'>Ingredient #1</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient1' placeholder='Enter Ingredient #1' value={cocktailToEdit.ingredient1} />
                    <Form.Label htmlFor='measure1'>Measure #1</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure1' value={cocktailToEdit.measure1} />

                    <Form.Label htmlFor='ingredient2'>Ingredient #2</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient2' value={cocktailToEdit.ingredient2} />
                    <Form.Label htmlFor='measure2'>Measure #2</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure2' value={cocktailToEdit.measure2} />

                    <Form.Label htmlFor='ingredient3'>Ingredient #3</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient3' value={cocktailToEdit.ingredient3} />
                    <Form.Label htmlFor='measure3'>Measure #3</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure3' value={cocktailToEdit.measure3} />

                    <Form.Label htmlFor='ingredient4'>Ingredient #4</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient4' value={cocktailToEdit.ingredient4} />
                    <Form.Label htmlFor='measure4'>Measure #4</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure4' value={cocktailToEdit.measure4} />

                    <Form.Label htmlFor='ingredient5'>Ingredient #5</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient5' value={cocktailToEdit.ingredient5} />
                    <Form.Label htmlFor='measure5'>Measure #5</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure5' value={cocktailToEdit.measure5} />

                    <Form.Label htmlFor='ingredient6'>Ingredient #6</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient6' value={cocktailToEdit.ingredient6} />
                    <Form.Label htmlFor='measure6'>Measure #6</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure6' value={cocktailToEdit.measure6} />

                    <Form.Label htmlFor='ingredient7'>Ingredient #7</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient7' value={cocktailToEdit.ingredient7} />
                    <Form.Label htmlFor='measure7'>Measure #7</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure7' value={cocktailToEdit.measure7} />

                    <Form.Label htmlFor='ingredient8'>Ingredient #8</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient8' value={cocktailToEdit.ingredient8} />
                    <Form.Label htmlFor='measure8'>Measure #8</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure8' value={cocktailToEdit.measure8} />

                    <Form.Label htmlFor='ingredient9'>Ingredient #9</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient9' value={cocktailToEdit.ingredient9} />
                    <Form.Label htmlFor='measure9'>Measure #9</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure9' value={cocktailToEdit.measure9} />

                    <Form.Label htmlFor='ingredient10'>Ingredient #10</Form.Label>
                    <Form.Control onChange={handleInputChange} name='ingredient10' value={cocktailToEdit.ingredient10} />
                    <Form.Label htmlFor='measure10'>Measure #10</Form.Label>
                    <Form.Control onChange={handleInputChange} name='measure10' value={cocktailToEdit.measure10} />

                    <Form.Label htmlFor='instructions'>Recipe Instructions</Form.Label>
                    <Form.Control onChange={handleInputChange} name='instructions' value={cocktailToEdit.instructions} />
                    <Form.Label htmlFor='imageUrl'>Image URL</Form.Label>
                    <Form.Control onChange={handleInputChange} name='imageUrl' value={cocktailToEdit.imageUrl} />
                    <Form.Label htmlFor='drinkType'>Drink Type</Form.Label>
                    <Form.Check onChange={handleInputChange} type="checkbox" inline label="Alcoholic?" name='drinkType' id='inline-checkbox-1'></Form.Check>

                    <Button variant='success' className='mt-3 w-50' type='submit'>Edit Cocktail</Button>
                </Form>
            </Card.Body>
        </Card>
    )}
</>
  )
}