import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button }  from '@material-ui/core';
import { productActions as actions } from '../redux/actions';
import { IProduct } from '../interfaces/productInterface';
import clsx from 'clsx';
import { colors } from 'styles';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
    classes?: any,
    history?: any;
};
type IProps = IOwnProps &
    IProduct.DispatchFromProps;

// Defining Own State to avoid unwanted props
interface IState {
    categories: any[],
    prices: any[]
}

// Categories Page
class Categories extends React.Component<IProps, IState> {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    
    filter = '';

    constructor(props: IProps) {
        super(props);
        this.state = {
            categories: [
                {   
                    name: 'Samsung',
                    checked: false,
                    subCategories: [
                        {
                            name: 'ipad',
                            checked: false
                        }, {
                            name: 'Galaxy',
                            checked: false
                        }, {
                            name: 'canvas',
                            checked: false
                        } 
                    ] 
                }, {   
                    name: 'Apple',
                    checked: false,
                    subCategories: [
                        {
                            name: 'ipad',
                            checked: false
                        }, {
                            name: 'Galaxy',
                            checked: false
                        }, {
                            name: 'canvas',
                            checked: false
                        } 
                    ] 
                }, {   
                    name: 'Micromax',
                    checked: false,
                    subCategories: [
                        {
                            name: 'ipad',
                            checked: false
                        }, {
                            name: 'Galaxy',
                            checked: false
                        }, {
                            name: 'canvas',
                            checked: false
                        } 
                    ] 
                }            
            ],
            prices: [
                {
                    value: 5000,
                    below: false,
                    above: false
                }, {
                    value: 10000,
                    below: false,
                    above: false
                }, {
                    value: 20000,
                    below: false,
                    above: false
                }, {
                    value: 25000,
                    below: false,
                    above: false
                }, {
                    value: 40000,
                    below: false,
                    above: false
                }
            ] 
        }
    }    

    saveFilter = async (filter?: string) => {
        await this.props.saveSelectedFilter(filter);
        this.props.history.push('/');
    }

    alterCategory = (categoryName: any) => {
        const categories = this.state.categories;
        categories.forEach((category) => {
            if (category.name === categoryName) {
                category.checked = !category.checked;
            }
        });
        this.setState({
            categories: categories
        })
    }

    alterSubCategory = (categoryName: any, subcategoryName: any) => {
        const categories = this.state.categories;
        categories.forEach((category) => {
            if (category.name === categoryName) {
                category.subCategories.forEach((subcategory: any) => {
                    if (subcategory.name === subcategoryName) {
                        subcategory.checked = !subcategory.checked;
                    }
                })
            }
        });
        this.setState({
            categories: categories
        })
    }

    alterPrice = (priceValue: any, forAbove: boolean) => {
        const prices = this.state.prices;
        prices.forEach((price) => {
            if (forAbove) {
                if (price.value === priceValue) {
                    price.above = !price.above;
                } else {
                    price.above = false;
                }    
            } else {
                if (price.value === priceValue) {
                    price.below = !price.below;
                } else {
                    price.below = false;
                }    
            }
        });
        this.setState({
            prices: prices
        });
    }

    makeFilter() {
        this.state.categories.forEach((category, index) => {
            if (category.checked) {
                if (this.filter !== '') this.filter += ' OR ';
                let subCategoryFilter = '';
                category.subCategories.forEach((subCategory: any) => {
                    if (subCategory.checked) {
                        subCategoryFilter += ' AND ' + subCategory.name;
                    }
                })
                this.filter += category.name + subCategoryFilter;    
            }
        })

        this.state.prices.forEach((price, index) => {
            if (price.above) {
                this.filter += ' ABOVE ' + price.value;
            }
            if (price.below) {
                this.filter += ' BELOW ' + price.value;
            }
        })

        this.saveFilter(this.filter);
    }

    getCategoriesView = (classes: any) => {
        return <div>
            <p>Categories</p>           
            { this.state.categories.map((category: any) => {
                    return <div key={category.name}>
                        <Button key={category.name} color='primary' variant="outlined" 
                            onClick={() => this.alterCategory(category.name)} 
                            className={clsx({
                                [classes.selectedButton]: category.checked,
                                }, classes.button)}>{ category.name }</Button>                 
                        {   category.subCategories.map((subcategory: any) => {
                                return <Button key={subcategory.name} color='primary' variant="outlined" 
                                    onClick={() => this.alterSubCategory(category.name, subcategory.name)} 
                                    className={clsx({
                                        [classes.selectedButton]: subcategory.checked,
                                    }, classes.button)}>{ subcategory.name }</Button>
                            })
                        }
                    </div>
                })
            }
        </div>
    }

    getPricesView = (classes: any) => {
        return <div>
            <p>Price Less Than</p>                    
            {   this.state.prices.map((price: any) => {
                    return <Button key={price.value.toString()} color='primary' variant="outlined" 
                        onClick={() => this.alterPrice(price.value, false)} 
                        className={clsx({
                            [classes.selectedButton]: price.below,
                          }, classes.button)}>{ price.value }</Button>
                })
            }
            <p>Price More Than</p>                    
            {   this.state.prices.map((price: any) => {
                    return <Button key={price.value.toString()} color='primary' variant="outlined" 
                        onClick={() => this.alterPrice(price.value, true)} 
                        className={clsx({
                            [classes.selectedButton]: price.above,
                          }, classes.button)}>{ price.value }</Button>
                })
            }
        </div>
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button key='Apply Filter' color='secondary' variant="outlined" onClick={() => this.makeFilter()} 
                    className={classes.button}>Save Filter</Button>    
                { this.getCategoriesView(classes) }
                { this.getPricesView(classes) }
            </div>
        );    
    }
}
// High Order Component to connect with store and action mapping
const CategoriesWrapper = connect(null, actions) (Categories);
 
const styles = {
    button: {
        margin: 5,
    },
    selectedButton: {
        backgroundColor: colors.BLUE,
        color: colors.WHITE
    }
}


/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const CategoriesWithStyles = withStyles(styles)(CategoriesWrapper)

export { CategoriesWithStyles as Categories }