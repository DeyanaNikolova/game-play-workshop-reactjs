import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as gameService from './services/gameService';
import { AuthContext } from './contexts/AuthContext';
import * as authService from './services/authService';


import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { CreateGame } from './components/CreateGame/CreateGame';
import { Catalogue } from './components/Catalogue/Catalogue';
import { GameDetails } from './components/GameDetails/GameDetails';

function App() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [auth, setAuth] = useState({});


  useEffect(() => {
    gameService.getAll()
      .then(result => {
        setGames(result);
      })
  }, []);

  const onCreateGameSubmit = async (data) => {

    const newGame = await gameService.create(data);

    setGames(state => [...state, newGame]);
    navigate('/catalogue');
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);
      setAuth(result);
      navigate('/catalogue');

    } catch (error) {
      console.log('There is a problem');
    }
  };

  const onRegisterSubmit = async (values) => {
    const {confirmPassword, ...registerData} = values;

    if(confirmPassword !== registerData.password){
      return;
    }
    try {
      const result = await authService.register(registerData);
      setAuth(result);
      navigate('/catalogue');

    } catch (error) {
      console.log('There is a problem');
    }
  };

  const context = {
    onLoginSubmit,
    onRegisterSubmit,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken
  }

  return (
    <AuthContext.Provider value={context}>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
            <Route path='/catalogue' element={<Catalogue games={games} />} />
            <Route path='/catalogue/:gameId' element={<GameDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
