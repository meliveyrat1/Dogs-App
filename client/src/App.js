import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Form from './components/Form';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
        <Route exact path = '/' component={LandingPage}/>
        <Route path = '/home' component={Home}/>
        <Route path = '/dogs' component={Form}/>
        <Route path = '/detail/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}
//el switch envuelve cada ruta y va a ir ruta por ruta,un link qyue no existe,toma el ultimo link que matcheo, 
export default App;
