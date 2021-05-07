import GlobalStyles from './styles/GlobalStyles';

import {   
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home'
import Product from './pages/Product';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>

          <Route path='/products/:id'>
            <Product/>
          </Route>

          <Route path="*" component={Home} />
        </Switch>
      </Router>
      <GlobalStyles/>
    </>
  );
}

export default App;
