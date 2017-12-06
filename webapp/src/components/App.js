import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import MainWrapper from '../containers/MainWrapper';
import Detail from '../containers/Detail';
import EditComment from '../containers/EditComment';
import AddComment from '../containers/AddComment';
import AddPost from '../containers/AddPost';
import EditPost from '../containers/EditPost';

const history = createBrowserHistory();

const App = (props) => {
  return (
    <Provider store={props.store}>
      <Router history={history}>
        <Switch>
          <Route path="/edit_comment/:category/:postId/:id" exact component={EditComment} />
          <Route path="/add_comment/:category/:parentId" exact component={AddComment} />
          <Route path="/add_post" exact component={AddPost} />
          <Route path="/edit_post/:category/:id" exact component={EditPost} />
          <Route path="/:category/:id" exact component={Detail} />
          <Route component={MainWrapper} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
