import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import CardDetail from './components/CardDetail/CardDetail';
import Activities from './pages/AddActivities/Activities';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/countries" component={Home} />
      <Route exact path="/countries/:id" component={CardDetail} />
      <Route exact path="/activities" component={Activities} />
    </div>



  );
}

export default App;
