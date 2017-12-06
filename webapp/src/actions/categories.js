import axios from 'axios'

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

const receive_categories = ( categories ) => {
  return {
    type: RECIEVE_CATEGORIES,
    categories
  };
};

export const select_category = ( category ) => {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export const get_categories = () => {
    const url = 'http://localhost:3001/categories';
    console.log('fetching from url', url);
    return function (dispatch) {
      return axios.get(url, { headers: { 'Authorization': 'myapp' } })
                .then(function(resp) { dispatch(receive_categories(resp.data)) } );
    };
}
