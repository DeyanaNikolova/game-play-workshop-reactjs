import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameServiceFactory } from '../services/gameService';

export const GameContext = createContext();

export const GameProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const gameService = gameServiceFactory();

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            })
    },  [gameService]);

    const onCreateGameSubmit = async (data) => {

        const newGame = await gameService.create(data);

        setGames(state => [...state, newGame]);
        navigate('/catalogue');
    };

    const onEditGameSubmit = async (values) => {
        const editGame = await gameService.edit(values._id, values);

        setGames(state => state.map(x => x._id === values._id ? editGame : x));

        navigate(`/catalogue/${values._id}`);
    };

    const contextValues = {
        games,
        onCreateGameSubmit,
        onEditGameSubmit
    }

    return (
        <>
        <GameContext.Provider value ={contextValues}>
            {children}
        </GameContext.Provider>
        </>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);

    return context;
}
