import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {Presentacion} from './Components/Presentacion';
import {Home} from './Components/Home';
import {Detail} from './Components/Detail';
import {GameCreate} from './Components/GameCreate';

function App() {
  return (
      <BrowserRouter>
    <div>
      <Switch>
      <Route exact path={'/'} component={Presentacion} />
      <Route  path={'/home'} component={Home} />
      <Route  path={'/game/:id'} component={Detail} />
      <Route  path={'/GameCreate'} component={GameCreate} />
      </Switch>
    </div>
      </BrowserRouter>
  );
}

export default App;
