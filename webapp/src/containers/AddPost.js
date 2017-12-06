import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from '../components/PostForm';
import {
  withRouter
} from 'react-router-dom';
import {
  get_categories,
  create_post,
} from '../actions/Api';

class AddPost extends Component {

  componentDidMount() {
    const { get_categories } = this.props;
    get_categories();
  }

  render() {
    const { handleSubmit, categories, history } = this.props;

    return (
      <div className="padding">
        <PostForm handleSubmit={(title, author, category, body) => { handleSubmit(title, author, category, body).then(() => { history.push('/') }) }} categories={categories} />
      </div>      
    )
  }
};


const mapStateToProps = (state, ownProps) => ({
  categories: state.categories.list
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: (title, author, category, body) => {
    return dispatch(create_post(title, author, category, body));
  },
  get_categories: () => {
    dispatch(get_categories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPost));

