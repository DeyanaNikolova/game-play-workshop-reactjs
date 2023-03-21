import * as gameService from './services/gameService';

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

  
  return (
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
  );
}

export default App;
