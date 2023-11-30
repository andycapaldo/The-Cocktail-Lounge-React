import { useState } from "react"
import UserCocktailType from "../types/user_cocktail"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { createCocktail } from "../lib/apiWrapper";
import CategoryType from "../types/category";


type CocktailFormProps = {
    flashMessage: (message:string, category: CategoryType) => void,
    setDisplay: (display:boolean) => void,
    setForm: (form:boolean) => void,
    toggle: boolean
}



export default function CocktailForm({ flashMessage, setDisplay, setForm, toggle }: CocktailFormProps) {
    const [formData, setFormData] = useState<Partial<UserCocktailType>>({
        drinkName: '',
        glassType: '',
        instructions: '',
        imageUrl: '',
        drinkType: true||false,
        ingredient1: '',
        measure1: '',
        ingredient2: '',
        measure2: '',
        ingredient3: '',
        measure3: '',
        ingredient4: '',
        measure4: '',
        ingredient5: '',
        measure5: '',
        ingredient6: '',
        measure6: '',
        ingredient7: '',
        measure7: '',
        ingredient8: '',
        measure8: '',
        ingredient9: '',
        measure9: '',
        ingredient10: '',
        measure10: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox'){
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        const requiredFields = [
            'drinkName',
            'glassType',
            'instructions',
            'imageUrl',
            'ingredient1',
            'measure1',
            'ingredient2',
            'measure2',
        ];
        const emptyFields = requiredFields.filter(field => !formData[field as keyof UserCocktailType]);
        if (emptyFields.length > 0) {
            const emptyFieldsMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
            flashMessage(emptyFieldsMessage, 'danger');
            } else {
                const token = localStorage.getItem('token') || ''
                const response = await createCocktail(token, formData);
                if (response.error) {
                    flashMessage(response.error, 'danger');
                } else {
                    flashMessage(`${response.data?.drinkName} has been created`, 'info')
                    setDisplay(false);
                    setForm(!toggle)
            }
        } 
    }

return (
    <Card>
    <Card.Body>
        <Form onSubmit={handleFormSubmit}>
            <Form.Label htmlFor='drinkName'>Drink Name</Form.Label>
            <Form.Control name='drinkName' placeholder='Enter Drink Name' onChange={handleInputChange} value={formData.drinkName} />
            <Form.Label htmlFor='glassType'>Glass Type</Form.Label>
            <Form.Control name='glassType' placeholder='Enter Glass Type' onChange={handleInputChange} value={formData.glassType} />

            <Form.Label htmlFor='ingredient1'>Ingredient #1</Form.Label>
            <Form.Control name='ingredient1' placeholder='Enter Ingredient #1' onChange={handleInputChange} value={formData.ingredient1} />
            <Form.Label htmlFor='measure1'>Measure #1</Form.Label>
            <Form.Control name='measure1' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure1} />

            <Form.Label htmlFor='ingredient2'>Ingredient #2</Form.Label>
            <Form.Control name='ingredient2' placeholder='Enter Ingredient #2' onChange={handleInputChange} value={formData.ingredient2} />
            <Form.Label htmlFor='measure2'>Measure #2</Form.Label>
            <Form.Control name='measure2' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure2} />

            <Form.Label htmlFor='ingredient3'>Ingredient #3</Form.Label>
            <Form.Control name='ingredient3' placeholder='Enter Ingredient #3' onChange={handleInputChange} value={formData.ingredient3} />
            <Form.Label htmlFor='measure3'>Measure #3</Form.Label>
            <Form.Control name='measure3' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure3} />

            <Form.Label htmlFor='ingredient4'>Ingredient #4</Form.Label>
            <Form.Control name='ingredient4' placeholder='Enter Ingredient #4' onChange={handleInputChange} value={formData.ingredient4} />
            <Form.Label htmlFor='measure4'>Measure #4</Form.Label>
            <Form.Control name='measure4' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure4} />

            <Form.Label htmlFor='ingredient5'>Ingredient #5</Form.Label>
            <Form.Control name='ingredient5' placeholder='Enter Ingredient #5' onChange={handleInputChange} value={formData.ingredient5} />
            <Form.Label htmlFor='measure5'>Measure #5</Form.Label>
            <Form.Control name='measure5' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure5} />

            <Form.Label htmlFor='ingredient6'>Ingredient #6</Form.Label>
            <Form.Control name='ingredient6' placeholder='Enter Ingredient #6' onChange={handleInputChange} value={formData.ingredient6} />
            <Form.Label htmlFor='measure6'>Measure #6</Form.Label>
            <Form.Control name='measure6' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure6} />

            <Form.Label htmlFor='ingredient7'>Ingredient #7</Form.Label>
            <Form.Control name='ingredient7' placeholder='Enter Ingredient #7' onChange={handleInputChange} value={formData.ingredient7} />
            <Form.Label htmlFor='measure7'>Measure #7</Form.Label>
            <Form.Control name='measure7' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure7} />

            <Form.Label htmlFor='ingredient8'>Ingredient #8</Form.Label>
            <Form.Control name='ingredient8' placeholder='Enter Ingredient #8' onChange={handleInputChange} value={formData.ingredient8} />
            <Form.Label htmlFor='measure8'>Measure #8</Form.Label>
            <Form.Control name='measure8' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure8} />

            <Form.Label htmlFor='ingredient9'>Ingredient #9</Form.Label>
            <Form.Control name='ingredient9' placeholder='Enter Ingredient #9' onChange={handleInputChange} value={formData.ingredient9} />
            <Form.Label htmlFor='measure9'>Measure #9</Form.Label>
            <Form.Control name='measure9' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure9} />

            <Form.Label htmlFor='ingredient10'>Ingredient #10</Form.Label>
            <Form.Control name='ingredient10' placeholder='Enter Ingredient #10' onChange={handleInputChange} value={formData.ingredient10} />
            <Form.Label htmlFor='measure10'>Measure #10</Form.Label>
            <Form.Control name='measure10' placeholder='Enter Measure' onChange={handleInputChange} value={formData.measure10} />

            <Form.Label htmlFor='instructions'>Recipe Instructions</Form.Label>
            <Form.Control name='instructions' placeholder='Enter Instructions' onChange={handleInputChange} value={formData.instructions} />
            <Form.Label htmlFor='imageUrl'>Image URL</Form.Label>
            <Form.Control name='imageUrl' placeholder='Enter Image URL' onChange={handleInputChange} value={formData.imageUrl} />
            <Form.Label htmlFor='drinkType'>Drink Type</Form.Label>
            <Form.Check type="checkbox" inline label="Alcoholic?" name='drinkType' id='inline-checkbox-1' checked={formData.drinkType as boolean} onChange={handleInputChange}></Form.Check>

            <Button variant='primary' className='w-100 mt-3' type='submit'>Create Cocktail</Button>
        </Form>
    </Card.Body>
</Card>
  )
}