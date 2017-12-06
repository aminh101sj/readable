import * as Types from '../actions/types';

export const comments = (state={list: [], content: {}}, action) => {
  switch(action.type) {
    case Types.RECEIVE_COMMENTS:
      return {
        ...state,
        list: action.comments
      };
    case Types.RECEIVE_SINGLE_COMMENT:
      return {
        ...state,
        content: action.comment
      };
    case Types.UPDATE_COMMENT:
      return {
        ...state,
        content: {
          ...state.content,
          [action.name]: action.value
        },
      };
    default:
      return state;
  }
}
