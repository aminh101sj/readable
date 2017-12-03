import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { get_cat_posts } from '../actions/posts';
import { Link } from 'react-router-dom';

class Category extends Component {
  state = {
    cat: ''
  }

  render() {
    const { match, posts, order, get_cat_posts } = this.props;
    if (this.state.cat !== match.params.category) {
      get_cat_posts(match.params.category);
      this.setState({ cat: match.params.category });
    }

    const orderedPosts = posts.sort((a,b) => { return ((a[order] > b[order]) ? -1 : 1) });

    return (
      <div>
        { orderedPosts.map((post) => {
            return (
              <Row>
                <Col span={2}>
                  {post.voteScore} 
                </Col>
                <Col span={22}>
                  <div><Link to={'/' + match.params.category + '/' + post.id}> {post.title}</Link></div>
                  <div>
                    <span> { post.timestamp} </span>
                    <span> By: { post.author }</span>
                    <span> Category: { post.category }</span>
                  </div>
                </Col>
              </Row>
            );
          }) }
      </div>      
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts.lists,
  order: state.posts.order,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get_cat_posts: (cat) => {
    dispatch(get_cat_posts(cat));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Category);
