import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { CreateGame } from './components/CreateGame/CreateGame';
import { Catalogue } from './components/Catalogue/Catalogue';
import { GameDetails } from './components/GameDetails/GameDetails';
import { EditGame } from './components/EditGame/EditGame';
import { RouteGuard } from './components/common/RouteGuard';
import { GameOwner } from './components/common/GameOwner';

function App() {

    return (
        <AuthProvider>
            <GameProvider>
                <div id="box">
                    <Header />

                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/catalogue' element={<Catalogue />} />
                            <Route path='/catalogue/:gameId' element={<GameDetails />} />

                            <Route element={<RouteGuard />}>
                                <Route path='/catalogue/:gameId/edit' element={
                                    <GameOwner>
                                        <EditGame />
                                    </GameOwner>
                                } />
                                <Route path='/create-game' element={<CreateGame />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>

                            {/* <Route path='/create-game' element={
                            <RouteGuard>
                                <CreateGame onCreateGameSubmit={onCreateGameSubmit} />
                            </RouteGuard>
                        } /> */}
                        </Routes>
                    </main>
                    
                    <Footer />
                </div>
            </GameProvider>
        </AuthProvider>
    );
}

export default App;
