import { requestFactory } from './requester';


const baseUrl = 'http://localHost:3030/data/comments';
const request = requestFactory();


    export const getAll = async (gameId) => {
        const query = encodeURIComponent(`gameId="${gameId}"`);
    
        const result = await request.get(`${baseUrl}?where=${query}`);
    
        const comments = Object.values(result);
    
        return comments;
    };

   export const addComment = async (gameId, comment) => {

        const result = await request.post(baseUrl, { gameId, comment });

        return result;
    };




