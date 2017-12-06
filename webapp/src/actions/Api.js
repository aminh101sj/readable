import axios from 'axios';
import { URL } from '../lib/Env';
import { receive_categories } from './categories';
import {
  receive_comments,
  receive_single_comment,
  edited_comment,
} from './comments';
import {
  edited_post,
  created_post,
  receive_single_post,
  receive_posts,
} from './posts';

const uuidv1 = require('uuid/v1');

export const get_categories = () => {
    const url = URL + '/categories';

    return function (dispatch) {
      return axios.get(url, { headers: { 'Authorization': 'myapp' } })
                .then(function(resp) { dispatch(receive_categories(resp.data)) } );
    };
}

export const upvote_comment = (id) => {
  const url = URL + '/comments/' + id;

  return function (dispatch) {
    return axios({
      method: 'post',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        option: "upVote"
      }
    });
  };
}

export const downvote_comment = (id) => {
  const url = URL + '/comments/' + id;

  return function (dispatch) {
    return axios({
      method: 'post',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        option: "downVote"
      }
    });
  };
}

export const get_comments = ( postId ) => {
  const url = URL + '/posts/' + postId + '/comments';

  return function (dispatch) {
    return axios.get(url, { headers: { 'Authorization': 'myapp' } })
              .then(function(resp) { dispatch(receive_comments(resp.data)) } );
  };
}

export const get_single_comment = ( id ) => {
  const url = URL + '/comments/' + id;

  return function (dispatch) {
    return axios.get(url, { headers: { 'Authorization': 'myapp' } })
              .then(function(resp) { dispatch(receive_single_comment(resp.data)) } );
  };
};

export const add_comment = ( id, author, body ) => {
  const url = URL + '/comments';

  return function (dispatch) {
    return axios({
      method: 'post',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        id: uuidv1(),
        parentId: id,
        author,
        body,
        timestamp: (new Date()).getTime(),
      }
    });
  };
}

export const edit_comment = ( id, body ) => {
  const url = URL + '/comments/' + id;

  return function (dispatch) {
    return axios({
      method: 'put',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        timestamp: (new Date()).getTime(),
        body,
      }
    }).then(function (resp) { dispatch(edited_comment()); });
  };
}

export const delete_comment = ( id ) => {
  const url = URL + '/comments/' + id;

  return function (dispatch) {
    return axios({
      method: 'delete',
      url: url,
      headers: { 'Authorization': 'myapp' },
    });
  };
}


export const upvote = (id) => {
  const url = URL + '/posts/' + id;
  return function (dispatch) {
    return axios({
      method: 'post',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        option: "upVote"
      }
    });
  };
}

export const downvote = (id) => {
  const url = URL + '/posts/' + id;
  return function (dispatch) {
    return axios({
      method: 'post',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        option: "downVote"
      }
    });
  };
}

export const get_posts = () => {
  const url = URL + '/posts';
  return function (dispatch) {
    return axios.get(url, { headers: { 'Authorization': 'myapp' } })
              .then(function(resp) { dispatch(receive_posts(resp.data)) } );
  };
}

export const get_cat_posts = ( cat ) => {
  const url = URL + '/' + cat + '/posts';
  return function (dispatch) {
    return axios.get(url, { headers: { 'Authorization': 'myapp' } })
              .then(function(resp) { dispatch(receive_posts(resp.data)) } );
  };
}

export const get_single_post = ( id ) => {
  const url = URL + '/posts/' + id;
  return function (dispatch) {
    return axios.get(url, { headers: { 'Authorization': 'myapp' } })
              .then(function(resp) { dispatch(receive_single_post(resp.data)) } );
  };
}

export const create_post = (title, author, category, body) => {
  const url = URL + '/posts';
  return function (dispatch) {
    return axios({
      method: 'post',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        id: uuidv1(),
        timestamp: (new Date()).getTime(),
        title,
        author,
        category,
        body
      }
    }).then(function (resp) { dispatch(created_post()); });
  };
};


export const delete_post = (id) => {
  const url = URL + '/posts/' + id;
  return function (dispatch) {
    return axios({
      method: 'delete',
      url: url,
      headers: { 'Authorization': 'myapp' },
    });
  };
};

export const edit_post = (id, title, body) => {
  const url = URL + '/posts/' + id;
  return function (dispatch) {
    return axios({
      method: 'put',
      url: url,
      headers: { 'Authorization': 'myapp' },
      data: {
        title,
        body
      }
    }).then(function (resp) { dispatch(edited_post()); });
  };
};


