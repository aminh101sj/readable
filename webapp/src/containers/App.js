import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import MainWrapper from './MainWrapper';
import Detail from './Detail';
import EditComment from './EditComment';
import AddComment from './AddComment';
import AddPost from './AddPost';
import EditPost from './EditPost';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
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
}

export default App;
