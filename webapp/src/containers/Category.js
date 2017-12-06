import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import {
  get_cat_posts,
  delete_post,
  upvote,
  downvote, } from '../actions/posts';
import { Link } from 'react-router-dom';

import Vote from '../components/Vote';

class Category extends Component {
  componentDidMount() {
    const { match, get_cat_posts } = this.props;
    get_cat_posts(match.params.category)
  }

  render() {
    const { match, posts, order, get_cat_posts, upvote, downvote, delete_post } = this.props;
    const orderedPosts = posts.sort((a,b) => { return ((a[order] > b[order]) ? -1 : 1) });

    return (
      <div>
        { orderedPosts.map((post) => {
            return (
              <Row key={post.id}>
                <Col span={2}>
                  <Vote
                    increment={() => { upvote(post.id).then(() => get_cat_posts(match.params.category)) }}
                    decrement={() => { downvote(post.id).then(() => get_cat_posts(match.params.category)) }}/>
                  {post.voteScore}
                </Col>
                <Col span={20}>
                  <div><Link to={'/' + match.params.category + '/' + post.id}> {post.title}</Link></div>
                  <div>
                    <span> { post.timestamp} </span>
                    <span> By: { post.author }</span>
                    <span> Category: { post.category }</span>
                    <span> Comments: { post.commentCount }</span>
                  </div>
                </Col>
                <Col span={2}>
                  <Link style={{ fontSize: '12px' }} to={"/edit_post/" + post.category + '/' + post.id}>Edit</Link>
                  <Button type="danger" onClick={() => { delete_post(post.id).then(() => get_cat_posts(match.params.category)) }}>Delete</Button>
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
  },
  upvote: (id) => {
    return dispatch(upvote(id));
  },
  downvote: (id) => {
    return dispatch(downvote(id));
  },
  delete_post: (id) => {
    return dispatch(delete_post(id));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Category);
