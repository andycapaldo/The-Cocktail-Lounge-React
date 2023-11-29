import UserType from "../types/auth"
import CommentType from "../types/comment"
import { useNavigate } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import { deleteComment } from "../lib/apiWrapper"
import { Link } from 'react-router-dom';



type CommentProps = {
    comments: CommentType[] | null,
    currentUser: UserType | null
}



export default function Comment({ comments, currentUser }: CommentProps) {

    const navigate = useNavigate();

    if (!comments || comments.length === 0){
        return <div>No Comments</div>
    }

    const handleDeleteComment = async (commentId: string | number) => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteComment(token, commentId.toString());

        if (!response.error){
            navigate('/cocktails')
        } else {
            console.warn('Error deleting comment:', response.error);
        }
    }   
  return (
    <>
    {comments.map((comment) => (
    <Card key={comment.id} className='mt-5'>
        <Card.Body>
            <Card.Text>{comment.text}</Card.Text>
            <Card.Subtitle>{comment.dateCreated}</Card.Subtitle>
            <Card.Subtitle>By <Link to={`/profile/${comment.author.id}`}>{comment.author.username}</Link></Card.Subtitle>
            {(currentUser?.id === comment.author.id || currentUser?.id === comment.cocktail.author.id) && (
                <Button variant='danger' onClick={() => handleDeleteComment(comment.id)}>Delete Comment</Button>
            )}
        </Card.Body>
    </Card>
    ))}

    </>
  )
}