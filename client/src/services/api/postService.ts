import HTTP from '../http';
import { IProduct } from '../../interfaces';
import { CONSTANTS } from '../../utils/constants';

/* service to fetch posts 
    @param - pageNumber, category, tag
*/
export const fetchProducts = (pageNumber: number, filterQuery: string | undefined) => {
  let query = `/api/products?size=${CONSTANTS.POSTS_PAGE_LIMIT}&page=${pageNumber}`;
  if (filterQuery) 
    query += `&filter=${filterQuery}`;
  return HTTP.get<IProduct.IProductData[]>(query);
};

// service to fetch categories
// export const fetchCategories = () => {
//   return HTTP.get<IPost.IPostCategoryOrTag>(`categories`);
// };
