import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom'
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  get_single_post,
  delete_post,
  upvote,
  downvote,
} from '../actions/posts';
import {
  get_comments,
  delete_comment,
  upvote_comment,
  downvote_comment,
} from '../actions/comments';
import Vote from '../components/Vote';

class Detail extends Component {
  componentDidMount() {
    const { get_single_post, get_comments, match, history } = this.props;
    get_comments(match.params.id);
    get_single_post(match.params.id);
  }

  render() {
    const {
      history,
      post,
      comments,
      match,
      delete_comment,
      get_comments,
      upvote_comment,
      downvote_comment,
      upvote_post,
      downvote_post,
      get_single_post,
      delete_post } = this.props;

    return (
      <div className="padding">
        <Row>
          <Col span={24}>
            <Link to='/'>Home</Link>
          </Col>
        </Row>
        { post.title === undefined ? (<div> Post has been deleted </div>) :
        (<div>
          <Row>
            <Col span={2}>
              <Vote increment={() => upvote_post(post.id).then(() => get_single_post(match.params.id))}
                decrement={() => downvote_post(post.id).then(() => get_single_post(match.params.id))} />
            </Col>
            <Col span={22}>
              <h1> {post.title}
                <Link style={{ fontSize: '12px' }} to={"/edit_post/" + post.category + '/' + post.id}>Edit</Link>
                <Button type="danger" onClick={() => { delete_post(post.id).then(() => history.push('/')) }}>Delete</Button>
              </h1>
              <span> { Date(post.timestamp) } </span>
              <span> By: { post.author }</span>
              <span> Category: { post.category }</span>
              <span> Vote: {post.voteScore} </span>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
            </Col>
            <Col span={22}>
              {post.body}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h2> Comments ({ post.commentCount })<span> <Link to={"/add_comment/" + match.params.category + '/' + match.params.id}>Add</Link> </span></h2>
            </Col>
          </Row>
            { comments.map((comment) => {
              return (
                <Card style={{ width: 600 }}>
                  <Row>
                    <Col span={4}>
                      <Vote increment={() => { upvote_comment(comment.id).then(() => { get_comments(match.params.id)}); }}
                        decrement={() => { downvote_comment(comment.id).then(() => { get_comments(match.params.id)}); }} />
                    </Col> 
                    <Col span={16}>
                      <p>{ comment.body }</p>
                      <span> { Date(comment.timestamp) } </span>
                      <span> By: { comment.author }</span>
                      <span> Votes: { comment.voteScore }</span>
                    </Col>
                    <Col span={4}>
                      <Link to={"/edit_comment/" + post.category + '/' + post.id + "/" + comment.id}>Edit</Link>
                      <Button type="danger" onClick={() => { delete_comment(comment.id).then((resp) => { get_comments(match.params.id);}) }}>Delete</Button>
                    </Col>
                  </Row>
                </Card>
              );
            })} </div>) }
      </div>      
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  post: state.posts.content,
  comments: state.comments.list,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get_single_post: (id) => {
    return dispatch(get_single_post(id));
  },
  get_comments: (postId) => {
    dispatch(get_comments(postId));
  },
  delete_comment: (id) => {
    return dispatch(delete_comment(id));
  },
  upvote_comment: (id) => {
    return dispatch(upvote_comment(id));
  },
  downvote_comment: (id) => {
    return dispatch(downvote_comment(id));
  },
  upvote_post: (id) => {
    return dispatch(upvote(id));
  },
  downvote_post: (id) => {
    return dispatch(downvote(id));
  },
  delete_post: (id) => {
    return dispatch(delete_post(id));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
