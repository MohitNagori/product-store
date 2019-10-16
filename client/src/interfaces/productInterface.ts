// Post Data Wrapper
export namespace IProduct {

    // Post Data Interface
    export interface IProductData {
        product_id: number;
        title: string;
        subcategory?: string;
        price?: number;
        popularity?: number;
    }

    // State Interface which is used in store.
    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        products: IProductData[];
        filterQuery?: string;
    }
    
    // Props Interface which is used to create actions.
    export interface DispatchFromProps {
        /* action to fetch posts 
            @param - pageNumber, category, tag
        */
        fetchProducts(filterQuery: string | undefined): Function;
        
        // action to save selected category to store
        saveSelectedFilter(filterQuery?: string): Function;
    }
}
  