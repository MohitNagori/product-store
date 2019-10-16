import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core';
import { ProductItem }  from './components/ProductItem';
import { productActions as actions } from '../../redux/actions';
import { IProduct } from '../../interfaces/productInterface';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
    classes?: any;
    isDrawerOpen: any;
}
type IProps = IOwnProps &
    IProduct.StateToProps &
    IProduct.DispatchFromProps;

// Defining Own State to avoid unwanted props
interface IState {
    canLoadMore: any;
    gridCellConfig: number;
}

// Mapping Store data with props 
const mapStateToProps = function(state: any){
    return {
        isDrawerOpen: state.app.isDrawerOpen,
        products: state.product.products,
        categories: state.product.categories,
        priceCategories: state.product.priceCategories,
        filterQuery: state.product.filterQuery,
    }
  };
  
// List Post Page
class ListProductPage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            canLoadMore: false,
            gridCellConfig: window.innerWidth < 540 ? 1 : (window.innerWidth > 992 ? 3 : 2),
        }
    }

    componentDidMount() {
        this.fetchPosts();
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
        let gridCellConfig = window.innerWidth < 540 ? 1 : (window.innerWidth > 992 ? 3 : 2);
        if (this.state.gridCellConfig !== gridCellConfig) {
            this.setState({
                gridCellConfig: gridCellConfig
            });    
        }
    }
    
    fetchPosts = async () => {
        await this.props.fetchProducts(this.props.filterQuery);
    }

    getPostItems() {
        return this.props.products.map((product: IProduct.IProductData, index) => {
            return  <GridListTile key={product.product_id.toString()} cols={1}>
                        <ProductItem product={product}/>    
                    </GridListTile>
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.main}>
                <GridList cellHeight='auto' className={classes.gridList} 
                    cols={this.props.isDrawerOpen && this.state.gridCellConfig === 2 ? 1 : this.state.gridCellConfig}>
                    { this.getPostItems() }
                </GridList>
            </div>
        );    
    }
}
// High Order Component to connect with store and action mapping
const ListProductWrapper = connect(mapStateToProps, actions) (ListProductPage);

const styles = {
    main: {
        display: 'flex',
        'flex-direction': 'column'
    },
    button: {
        marginLeft: 'auto'
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
}

// Defining proptery to Higher Order Component
ListProductWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
}

/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const ListProductWithStyles = withStyles(styles)(ListProductWrapper)

export { ListProductWithStyles as ListProduct } 