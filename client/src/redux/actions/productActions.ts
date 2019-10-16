import { Types } from './types';
import { IProduct } from '../../interfaces';
import { fetchProducts } from '../../services';

// Actions related to posts, categories and tags
const IPostAction: IProduct.DispatchFromProps = {
  fetchProducts: (filterQuery: string | undefined) => {
    return async function (dispatch: any) {
      // dispatch to update store when actions starts 
      dispatch({
        type: Types.FETCH_PRODUCTS,
      });
      try {
        const response: any = await fetchProducts(filterQuery);
        // dispatch to update store when actions complted successfully 
        dispatch({
          type: Types.FETCH_PRODUCTS_SUCCESS,
          payload: {totalProducts: response.data.total, products: response.data.products},
        });
        return ;
      } catch(e) {
        // dispatch to update store when actions completed with a failed or errror status 
        dispatch({
          type: Types.FETCH_PRODUCTS_FAILED,
          payload: e,
        });
        return [];
      }
    };
  },
  saveSelectedFilter: (filter: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.SAVE_FILTER,
        payload: { filter: filter },
      });
    };
  },
};

export { IPostAction as productActions }
