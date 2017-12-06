import * as Types from '../actions/categories';

export const categories = (state={ list: [], selected: '' }, action) => {
  console.log("got action: ", action)
  switch(action.type) {
    case Types.RECIEVE_CATEGORIES:
      return {
        ...state,
        list: action.categories.categories
      };
    case Types.SELECT_CATEGORY:
      return {
        ...state,
        selected: action.category
      };
    default:
      return state;
  }
}
