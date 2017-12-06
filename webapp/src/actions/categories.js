import * as Types from '../actions/types';

export const receive_categories = ( categories ) => {
  return {
    type: Types.RECIEVE_CATEGORIES,
    categories
  };
};

export const select_category = ( category ) => {
  return {
    type: Types.SELECT_CATEGORY,
    category
  };
}
