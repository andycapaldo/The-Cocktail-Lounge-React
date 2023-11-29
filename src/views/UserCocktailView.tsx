// View for viewing a specific user-created cocktail. Uses the UserCocktail.tsx component for all of the information to be displayed.
// Includes comment section and allows logged-in users to make comments. Uses user authentication methods to determine if the current
// logged-in user is the author of the cocktail post. If this initializes to true, user will see links to edit or delete their cocktails,
// as well as any comments on the post.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserCocktail } from '../lib/apiWrapper';
import UserCocktailType from "../types/user_cocktail";
import CategoryType from '../types/category';
import UserCocktail from '../components/UserCocktail'
import UserType from '../types/auth';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deleteCocktail } from '../lib/apiWrapper';
import { Modal } from 'react-bootstrap';


type UserCocktailProps = {
    currentUser: UserType | null,
    flashMessage: (message:string, category:CategoryType) => void
}



export default function UserCocktailView({ currentUser, flashMessage }: UserCocktailProps) {
    const { cocktailId } = useParams();
    const navigate = useNavigate();
    const [cocktailToView, setCocktailToView] = useState<UserCocktailType|null>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect( () => {
        async function getCocktailToView(){
            const response = await getUserCocktail(cocktailId!);
            if (response.error){
                console.warn(response.error)
            } else {
                setCocktailToView(response.data!);
            }
        }

        getCocktailToView();
    }, [cocktailId])


    const handleDeleteCocktail = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteCocktail(token, cocktailId!);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(response.data?.success!, 'primary');
            navigate('/cocktails')
        }
    }

    
    return (
        <>
            <UserCocktail cocktail={cocktailToView} />
            {currentUser?.id === cocktailToView?.author.id && (
                <div>
                    <Link to={`/editcocktail/${cocktailToView?.id}`}>
                            <Button variant='light' className='mt-3 w-50'>Edit Cocktail</Button>
                    </Link>
                    <div>
                    <Button onClick={handleShow} variant='danger' className='mt-3 w-50'>Delete Cocktail</Button>
                    </div>
                </div>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {cocktailToView?.drinkName}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {cocktailToView?.drinkName}? This action cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCocktail}>
                        Delete Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
