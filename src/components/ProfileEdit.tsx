import UserType from "../types/auth"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


type ProfileEditProps = {
    formData: Partial<UserType>,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleFormSubmit: (e: React.FormEvent) => void,
};


export default function ProfileEdit({ formData, handleInputChange, handleFormSubmit }: ProfileEditProps) {
    return (
        <Card className='w-50 mt-3'>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Edit Email</Form.Label>
                    <Form.Control
                        onChange={handleInputChange}
                        name='email'
                        value={formData.email || ''}
                    />
                    <Button variant='success' className='mt-3 w-50' type='submit'>
                        Edit Profile
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}