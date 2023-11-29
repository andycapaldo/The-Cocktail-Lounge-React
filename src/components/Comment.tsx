import UserType from "../types/auth"
import CommentType from "../types/comment"
import { Button, Card } from "react-bootstrap"



type CommentProps = {
    comments: CommentType[] | null,
    currentUser: UserType | null
}



export default function Comment({ comments, currentUser }: CommentProps) {
    if (!comments || comments.length === 0){
        return <div>No Comments</div>
    }
  return (
    <>
    {comments.map((comment) => (
    <Card key={comment.id} className='mt-5'>
        <Card.Body>
            <Card.Text>{comment.text}</Card.Text>
            <Card.Subtitle>{comment.dateCreated}</Card.Subtitle>
            <Card.Subtitle>By {comment.author.username}</Card.Subtitle>
            {(currentUser?.id === comment.author.id || currentUser?.id === comment.cocktail.author.id) && (
                <Button variant='danger'>Delete Comment</Button>
            )}
        </Card.Body>
    </Card>
    ))}

    </>
  )
}