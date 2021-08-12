import './App.css';
import Create from './components/create'
import List from './components/list'
import Update from './components/update';
import { Switch, Route, Link } from 'react-router-dom'
import logo from './images/analytics2go-logo.png'

function App() {
  return (
    <div>
      <nav className='navbar'>
        <div>
          <Link to={'/list'} >
            <img src={logo} alt='Analytics2Go Logo' className='img-logo'/>
          </Link>
        </div>
        <div className='navbar-nav'>
          <li className='navbar-item'>
            <Link to={'/list'} className='navbar-link'>
              Lista
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to={'/create'} className='navbar-link'>
              Cadastro
            </Link>
          </li>
        </div>
      </nav>

      <div className="main-body">
        <Switch>
          <Route exact path={['/','/list']} component={List} />
          <Route exact path='/create' component={Create} />
          <Route path='/update' component={Update} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
