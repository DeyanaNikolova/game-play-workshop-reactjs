import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { gameServiceFactory } from '../../services/gameService';
import { commentServiceFactory } from '../../services/commentService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../contexts/AuthContext';


export const GameDetails = () => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
    const navigate = useNavigate();
    const gameService = useService(gameServiceFactory);
    const commentService = useService(commentServiceFactory);

    useEffect(() => {

        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
                return commentService.getAll(gameId);
            })
            .then(result => {
                setComments(result);
            })

    }, [gameId]);


    const onCommentSubmit = async (e) => {
        e.preventDefault();

    //   const result = await commentService.addComment(gameId, {
    //         username,
    //         comment
    //     });
    //     setGame(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));
    //     setUsername('');
    //     setComment('');
    };
    const isOwner = game._ownerId === userId;

    const onDeleteClick = async () => {
       await gameService.deleteGame(game._id);
       // TODO: delete from state
       navigate('/catalogue');
    };
 
    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>


                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(x =>
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li>
                        )}

                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    {comments.length === 0 &&
                        <p className="no-comment">No comments.</p>
                    }

                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalogue/${game._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}

            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type="text" name="username" placeholder="Pesho" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};