import axios from 'axios'
import { URL } from '../lib/Env'

const uuidv1 = require('uuid/v1');

export const GET_POSTS = 'GET_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const CHANGE_POST = 'CHANGE_POST';
export const CHANGE_ORDER = 'CHANGE_ORDER';

const created_post = () => {
  return {
    type: CREATE_POST,
  };
};

const edited_post = () => {
  return {
    type: EDIT_POST,
  };
};

const receive_posts = ( posts ) => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

const receive_single_post = ( post ) => {
  return {
    type: RECEIVE_SINGLE_POST,
    post
  };
};

export const change_order = (order) => {
  return {
    type: CHANGE_ORDER,
    order
  };
}

export const change_post = (post) => {
  return {
    type: CHANGE_POST,
    post
  };
};

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
