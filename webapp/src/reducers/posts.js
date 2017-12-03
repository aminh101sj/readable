import * as Types from '../actions/posts';

export const posts = (state={ lists: [], content: {}, order: 'voteScore' }, action) => {
  console.log("got action: ", action)
  switch(action.type) {
    case Types.RECEIVE_POSTS:
      return { ...state,
        lists: action.posts
      };
    case Types.RECEIVE_SINGLE_POST:
    case Types.CHANGE_POST:
      return {
        ...state,
        content: {
          ...action.post
        }
      };
    case Types.CHANGE_ORDER:
      return {
        ...state,
        order: action.order
      };
    default:
      return state;
  }
}
