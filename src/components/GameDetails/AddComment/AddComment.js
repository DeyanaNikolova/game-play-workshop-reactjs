import { useForm } from '../../../hooks/useForm';

export const AddComment = ({
    onCommentSubmit
}) => {

    const { values, onSubmit, changeHandler } = useForm({
        comment: ''
    }, onCommentSubmit);
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={onSubmit}>
                {/* <input
                    type="text"
                    name="author"
                    placeholder="Author.."
                    value={values.author}
                    onChange={changeHandler}
                /> */}
                <textarea
                    name="comment"
                    placeholder="Comment..."
                    value={values.comment}
                    onChange={changeHandler} >
                </textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    );
};