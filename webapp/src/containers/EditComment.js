import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCommentForm from '../components/EditCommentForm';
import {
  withRouter
} from 'react-router-dom';
import {
  update_comment,
} from '../actions/comments';
import {
  edit_comment,
  get_single_comment,
} from '../actions/Api';

const mapStateToPropsComment = (state, ownProps) => ({
  body: state.comments.content.body,
})

const mapDispatchToPropsComment = (dispatch, ownProps) => ({
  handleInputChange: (name,value) => {
    dispatch(update_comment(name,value));
  },
});

const EditCommentWrapper = connect(mapStateToPropsComment, mapDispatchToPropsComment)(withRouter(EditCommentForm));

class EditComment extends Component {
  componentDidMount() {
    const { getComment, match } = this.props;
    getComment(match.params.id);
  }

  render() {
    const { handleSubmit, match } = this.props;

    return (
      <div className="padding">
        <EditCommentWrapper id={match.params.id} handleSubmit={handleSubmit}/>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getComment: ( id ) => {
    dispatch(get_single_comment(id));
  },
  handleSubmit: (id, body) => {
    dispatch(edit_comment(id, body)).then((response) => { ownProps.history.push('/'+ ownProps.match.params.category +'/' + ownProps.match.params.postId);  });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditComment));
