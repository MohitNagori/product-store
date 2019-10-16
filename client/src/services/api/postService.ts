import HTTP from '../http';
import { IProduct } from '../../interfaces';

/* service to fetch posts 
    @param - pageNumber, category, tag
*/
export const fetchProducts = (filterQuery: string | undefined) => {
  let query = `/api/products`;
  if (filterQuery) 
    query += `?filter=${filterQuery}`;
  return HTTP.get<IProduct.IProductData[]>(query);
};

// service to fetch categories
// export const fetchCategories = () => {
//   return HTTP.get<IPost.IPostCategoryOrTag>(`categories`);
// };
