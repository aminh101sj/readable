import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {
  get_posts,
  upvote,
  downvote,
} from '../actions/posts';
import Vote from '../components/Vote';

class Default extends Component {
  componentDidMount() {
    const { get_posts } = this.props;
    get_posts();
  }

  render() {
    const { posts, order, upvote, downvote } = this.props;
    console.log(posts);
    const orderedPosts = posts.sort((a,b) => { return ((a[order] > b[order]) ? -1 : 1) }); 
    return (
      <div>
        { orderedPosts.map((post, i) => {
            return (
              <Row key={i}>
                <Col span={2}>
                  <Vote increment={() => { upvote(post.id) }} decrement={() => { downvote(post.id) }}/>
                  {post.voteScore} 
                </Col>
                <Col span={22}>
                  <div><Link to={'/' + post.category + '/' + post.id}> {post.title}</Link></div>
                  <div>
                    <span> { Date(post.timestamp) } </span>
                    <span> By: { post.author }</span>
                    <span> Category: { post.category }</span>
                    <span> Comments: { post.commentCount }</span>
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
  order: state.posts.order
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get_posts: () => {
    dispatch(get_posts());
  },
  upvote: (id) => {
    dispatch(upvote(id)).then(() => { dispatch(get_posts()); });
  },
  downvote: (id) => {
    dispatch(downvote(id)).then(() => { dispatch(get_posts()); });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Default);
