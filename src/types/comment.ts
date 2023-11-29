import UserType from "./auth";
import UserCockTailType from "./user_cocktail";

type CommentType = {
    id: number,
    text: string,
    author: UserType,
    cocktail: UserCockTailType
}

export default CommentType