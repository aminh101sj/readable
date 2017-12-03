import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPostForm from '../components/EditPostForm';
import {
  withRouter
} from 'react-router-dom';
import {
  edit_post,
  change_post,
  get_single_post,
} from '../actions/posts';

class EditPost extends Component {
  componentDidMount() {
    const { getSinglePost, match } = this.props;
    getSinglePost(match.params.id);
  }

  render() {
    const { handleSubmit, history, match, post, changePost } = this.props;

    return (
      <div className="padding">
        <EditPostForm handleSubmit={(title, body) => { handleSubmit(match.params.id, title, body).then(() => { history.push('/' + match.params.category + '/' + match.params.id) }) }} changePost={changePost} post={post}/>
      </div>      
    )
  }
};


const mapStateToProps = (state, ownProps) => ({
  post: state.posts.content 
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSinglePost: (id) => {
    dispatch(get_single_post(id));
  },
  handleSubmit: (id, title, body) => {
    return dispatch(edit_post(id, title, body));
  },
  changePost: (post) => {
    dispatch(change_post(post));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));

