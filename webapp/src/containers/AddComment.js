import { connect } from 'react-redux';
import AddCommentForm from '../components/AddCommentForm';
import {
  withRouter
} from 'react-router-dom';
import {
  add_comment,
} from '../actions/comments';


const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.parentId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (id, author, body) => {
    dispatch(add_comment(id, author, body)).then((response) => { ownProps.history.push('/' + ownProps.match.params.category + '/' + ownProps.match.params.parentId);  });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCommentForm));
