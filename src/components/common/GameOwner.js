import { useParams, Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from "../../contexts/AuthContext";
import { useGameContext } from "../../contexts/GameContext";

export const GameOwner = ({
    children
}) => {

    const { gameId } = useParams();
    const { userId } = useAuthContext();
    const { getGameById } = useGameContext();
    
    const currentGame = getGameById(gameId);

    if(currentGame && currentGame._ownerId !== userId){
        return <Navigate to={`/catalogue/${gameId}`} />
    }

    return children ? children : <Outlet />
};
