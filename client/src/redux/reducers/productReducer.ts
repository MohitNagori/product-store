import { AnyAction } from 'redux';
import { Types } from '../actions/types';
import { IProduct } from '../../interfaces';

// Initial State of store
const initialState: IProduct.StateToProps = {
  error: false,
  loading: false,
  products: [],
  filterQuery: '',
};

// function to create reducer for app
export default function productReducer (
  state: IProduct.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    // For fetching posts
    case Types.FETCH_PRODUCTS:
      // here return will update the state
      return {
        ...state,
        error: false,
        loading: true
      };
    case Types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        filterQuery: '',
        error: false,
        loading: false,
      };
    case Types.FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        products: [],
        filterQuery: '',
        error: action.payload.message || true,
        loading: false,
      };

  // For saving selected category
  case Types.SAVE_FILTER:
    return {
      ...state,
      filterQuery: action.payload.filter,
      error: false,
      loading: true,
    };

  default:
      return state;
    }
}
