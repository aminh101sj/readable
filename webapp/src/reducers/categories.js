import * as Types from '../actions/types';

export const categories = (state={ list: [], selected: '' }, action) => {
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
