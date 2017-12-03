import * as Types from '../actions/categories';

export const categories = (state=[], action) => {
  console.log("got action: ", action)
  switch(action.type) {
    case Types.RECIEVE_CATEGORIES:
      return action.categories.categories;
    default:
      return state;
  }
}
