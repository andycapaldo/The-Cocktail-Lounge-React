import UserType from "../types/auth"
import CategoryType from "../types/category";
import UserCocktailType from "../types/user_cocktail";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { getUserCocktails, getUser, editProfile, deleteProfile } from "../lib/apiWrapper";
import Cocktail from "../components/Cocktail";
import { Row, Col } from "react-bootstrap";
import ProfileEdit from "../components/ProfileEdit";
import { Modal } from 'react-bootstrap';



type ProfileProps = {
    loggedInUser: Partial<UserType> | null,
    flashMessage: (message:string, category:CategoryType) => void
}




export default function Profile({ loggedInUser, flashMessage}: ProfileProps) {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [cocktails, setCocktails] = useState<UserCocktailType[]>([]);
    const [userProfile, setUserProfile] = useState<UserType|null>(null);

    const [formData, setFormData] = useState<Partial<UserType>>({});
    const [displayForm, setDisplayForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!loggedInUser){
            navigate('/')
        }
    }, [loggedInUser])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await editProfile(token, userProfile!.id.toString(), formData);
        if (response.data) {
            flashMessage(`${response.data?.username}'s email has been edited`, 'success');
            setDisplayForm(false);
            setFormSubmitted(!formSubmitted);
            navigate(`/profile/${userProfile!.id}`)
        } else {
            flashMessage('A user with that email already exists', 'danger');
        }
    }


    useEffect( () => {
        async function fetchUser(){
            const response = await getUser(userId as string)
            if (response.data){
                setUserProfile(response.data)
            }else {
                console.warn(response.error)
            }
        };

        fetchUser()
    }, [userProfile])

    useEffect( () => {
        async function fetchData(){
            const response = await getUserCocktails();
            if (response.data){
                setCocktails(response.data)
            }
        };

        fetchData()
    }, [loggedInUser])

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteProfile(token, userId as string);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data?.success!, 'primary')
            navigate('/')
        }
    }

    const userCocktails = (cocktails.filter((cocktail) => cocktail.author.id === userProfile?.id))

  return (
    <>
        {userProfile && <h1>{userProfile.firstName}'s Profile</h1>}
            <Card>
            <Card.Body>
                <Card.Text>First Name: {userProfile?.firstName}</Card.Text>
                <Card.Text>Last Name: {userProfile?.lastName}</Card.Text>
                <Card.Text>Email: {userProfile?.email}</Card.Text>
                <Card.Text>Cocktails: {userCocktails.length}</Card.Text>
            </Card.Body>
        </Card>
        <Row>
            {loggedInUser && loggedInUser?.id === userProfile?.id && (
            <>
            <Col className="d-flex justify-content-center mt-5">
                <Button onClick={() => setDisplayForm(!displayForm)} className='w-50' variant='success' >
                    {displayForm ? 'Hide Form' : 'Edit Profile'}
                </Button>
            </Col>
            <Col className="d-flex justify-content-center mt-5">
                <Button onClick={handleShow} className='w-50' variant='danger'>
                    Delete Profile
                </Button>
            </Col>
            <Col className='col-12'>
            {displayForm && <ProfileEdit formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />}
            </Col>
            </>
            )}
        </Row>
            {userCocktails.map((cocktail) => (
                <Cocktail key={cocktail.id} cocktail={cocktail} />
            ))}
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {userProfile?.username}'s Profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {userProfile?.username}? This action cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Delete Cocktail
                    </Button>
                </Modal.Footer>
            </Modal>
    </>
  )
}