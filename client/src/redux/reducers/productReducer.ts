import { AnyAction } from 'redux';
import { Types } from '../actions/types';
import { IProduct } from '../../interfaces';

// Initial State of store
const initialState: IProduct.StateToProps = {
  error: false,
  loading: false,
  totalProducts: -1,
  products: [],
  pageNumber: 0,
  categories: [],
  priceCategories: [],
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
        pageNumber: state.pageNumber + 1,
        totalProducts: action.payload.totalProducts,
        products: state.products.concat(action.payload.products),
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

  // For fetching categories
  case Types.FETCH_CATEGORIES:
    return {
      ...state,
      totalProducts: -1,
      products: [],
      pageNumber: 0,
      error: false,
      loading: true,
    };
  case Types.FETCH_CATEGORIES_SUCCESS:
    return {
      ...state,
      categories: action.payload.categories,
      price: action.payload.price,
      error: false,
      loading: false,
    };
  case Types.FETCH_CATEGORIES_FAILED:
    return {
      ...state,
      categories: [],
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
