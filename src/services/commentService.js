import { requestFactory } from '../services/requester';


const baseUrl = 'http://localhost:3030/data/comments';


export const getAll = async (gameId) => {

    const request = requestFactory();

    const searchQuery = encodeURIComponent(`gameId="${gameId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`)

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);

    const comments = Object.values(result);

    return comments;
};

export const addComment = async (gameId, comment) => {
    const request = requestFactory();
    
    const result = await request.post(baseUrl, { gameId, comment });

    return result;
};




