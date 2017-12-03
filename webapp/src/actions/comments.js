import axios from 'axios'
import { URL } from '../lib/Env'

const uuidv1 = require('uuid/v1');

export const GET_COMMENTS = 'GET_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_SINGLE_COMMENT = 'RECEIVE_SINGLE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const edited_comment = () => {
  return {
    type: EDIT_COMMENT
  };
};

const receive_comments = ( comments ) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

const receive_single_comment = ( comment ) => {
  return {
    type: RECEIVE_SINGLE_COMMENT,
    comment
  };
};

export const update_comment = ( name, value ) => {
  return {
    type: UPDATE_COMMENT,
    name,
    value,
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
