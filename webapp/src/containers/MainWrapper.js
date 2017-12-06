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
  select_category,
} from '../actions/categories';
import {
  change_order,
  get_cat_posts,
} from '../actions/posts';

const dropdown = {
  'voteScore': 'Vote Scored',
  'timestamp': 'Timestamp',
};

class MainWrapper extends Component {
  componentDidMount() {
    const { get_categories, selected, select_category } = this.props;
    get_categories();

    // Set the correct state in case of reload
    const loc = this.props.location.pathname.substr(1);
    if (loc !== "/" && selected !== loc) {
      select_category(loc);
    }
  }

  render() {
    const { selected, categories, order, change_order, select_category } = this.props;
    const menu = (
      <Menu onClick={(e) => { change_order(e.key) }}>
        <Menu.Item key="voteScore">Vote Scored</Menu.Item>
        <Menu.Item key="timestamp">Timestamp</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Menu
          selectedKeys={[ selected === '' ? 'home' : selected ]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/" onClick={() => select_category('')}>
              Home
            </Link>
          </Menu.Item>
          { categories.map((cat) => {
              return (
                <Menu.Item key={cat.path}>
                  <Link key={cat.path} to={ "/" + cat.path } onClick={() => select_category(cat.path)}>
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
  selected: state.categories.selected,
  categories: state.categories.list,
  order: state.posts.order,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get_categories: () => {
    dispatch(get_categories());
  },
  change_order: (order) => {
    dispatch(change_order(order));
  },
  select_category: (category) => {
    dispatch(select_category(category));
    dispatch(get_cat_posts(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);
