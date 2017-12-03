import React, { Component } from 'react';
import {
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Default from './Default';
import Category from './Category';
import { Menu, Row, Col, Dropdown, Icon, Button } from 'antd';
import {
  get_categories,
} from '../actions/categories';
import {
  change_order,
} from '../actions/posts';

const dropdown = {
  'voteScore': 'Vote Scored',
  'timestamp': 'Timestamp',
};

class MainWrapper extends Component {
  state = {
    current: 'home',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  componentDidMount() {
    const { get_categories } = this.props;
    get_categories();
  }

  render() {
    const { categories, order, change_order } = this.props;
    const menu = (
      <Menu onClick={(e) => { change_order(e.key) }}>
        <Menu.Item key="voteScore">Vote Scored</Menu.Item>
        <Menu.Item key="timestamp">Timestamp</Menu.Item>
      </Menu>
    );

    const loc = this.props.location.pathname;
    if (loc !== "/" && '/' + this.state.current !== loc) {
      for (let i = 0; i < categories.length; i++) {
        if (loc === '/' + categories[i].path) {
          this.setState({ current: categories[i].path});
          break;
        }
      }
    }

    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/">
              Home
            </Link>
          </Menu.Item>
          { categories.map((cat) => {
              return (
                <Menu.Item key={cat.path}>
                  <Link to={ "/" + cat.path }>
                    { cat.name }
                  </Link>
                </Menu.Item>
              );
            }) }
        </Menu>
        <Row className="margin">
          <Col span={4}>
            <Dropdown overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                { dropdown[order] } <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col span={16}></Col>
          <Col span={4}>
            <Link style={{ marginLeft: 8 }} to="/add_post">
              Add Post
            </Link>
          </Col>
        </Row>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Default}/>
            <Route path="/:category" exact component={Category}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  order: state.posts.order,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get_categories: () => {
    dispatch(get_categories());
  },
  change_order: (order) => {
    dispatch(change_order(order));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);
