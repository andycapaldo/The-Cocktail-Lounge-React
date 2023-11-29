// View for viewing a specific user-created cocktail. Uses the UserCocktail.tsx component for all of the information to be displayed.
// Includes comment section and allows logged-in users to make comments. Uses user authentication methods to determine if the current
// logged-in user is the author of the cocktail post. If this initializes to true, user will see links to edit or delete their cocktails,
// as well as any comments on the post.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserCocktail, getCommentsOnCocktail, createComment } from '../lib/apiWrapper';
import UserCocktailType from "../types/user_cocktail";
import CategoryType from '../types/category';
import CommentType from '../types/comment';
import UserCocktail from '../components/UserCocktail'
import UserType from '../types/auth';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deleteCocktail } from '../lib/apiWrapper';
import { Modal } from 'react-bootstrap';
import Comment from '../components/Comment';
import { Row, Col } from 'react-bootstrap';


type UserCocktailProps = {
    currentUser: UserType | null,
    flashMessage: (message:string, category:CategoryType) => void
}



export default function UserCocktailView({ currentUser, flashMessage }: UserCocktailProps) {
    const { cocktailId } = useParams();
    const navigate = useNavigate();
    const [cocktailToView, setCocktailToView] = useState<UserCocktailType|null>(null);
    const [commentsToView, setCommentsToView] = useState<CommentType[]|null>(null);
    const [newComment, setNewComment] = useState<Partial<CommentType>>({text: ""});

    const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment({...newComment, text: e.target.value});
    };
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitComment = async (e:React.MouseEvent) => {
        e.preventDefault();
        if (newComment.text!.trim().length === 0){
            flashMessage('You cannot submit an empty comment!', 'warning')
        } else {
        const token = localStorage.getItem('token') || ''
        const response = await createComment(token, cocktailId!, newComment);

        if (response.error){
            console.warn(response.error);
        } else {
            flashMessage('Comment has been added!', 'success')
            setNewComment({text: ""})
            navigate(`/usercocktail/${cocktailId}`)
            }
        }
    };

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

    useEffect( () => {
        async function getComments(){
            const response = await getCommentsOnCocktail(cocktailId!);
            if (response.error){
                console.warn(response.error)
            } else {
                setCommentsToView(response.data!);
            }
        }

        getComments();
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
            <Comment currentUser={currentUser} comments={commentsToView}></Comment>
            {currentUser && (
                <>
                    <div className='comment-flexbox addACommentInput'>
                        <h3 className='comment-text mt-5'>Leave a Comment</h3>
                        <textarea value={newComment.text} onChange={onChangeHandler} className='input-box'></textarea>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Button onClick={handleSubmitComment}>Submit</Button>
                    </div>
                </>
            )}
            {currentUser?.id === cocktailToView?.author.id && (
                <>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                        <Link to={`/editcocktail/${cocktailToView?.id}`}>
                            <Button variant='light' className='mt-3 w-100'>Edit Cocktail</Button>
                        </Link>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Button onClick={handleShow} variant='danger' className='mt-3 w-50'>Delete Cocktail</Button>
                        </Col>
                    </Row>
                </>
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
