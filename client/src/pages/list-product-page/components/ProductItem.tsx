import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, Avatar, CardHeader, CardContent }  from '@material-ui/core';
import { red, blue } from '@material-ui/core/colors';
import { IProduct } from '../../../interfaces';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
    classes?: any;
    product: IProduct.IProductData;
}
type IProps = IOwnProps;

// Defining Own State to avoid unwanted props
interface IState {

}

// Product Item Page
class ProductItem extends React.Component<IProps, IState> {

    render() {
        const { product, classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                    {product.title[0].toUpperCase()}
                    </Avatar>}
                    title={product.title.split(' ')[0]}
                    subheader={product.subcategory}/>
                <CardContent>
                    <p>Model: {product.title}</p>
                    <p>Price: {product.price}</p>
                    <p>Popularity: {product.popularity}</p>
                </CardContent>
            </Card> 
        );    
    }
}
// High Order Component to connect with store and action mapping
const ProductItemWrapper = connect(null, null) (ProductItem);

const styles = {
    card: {
        maxWidth: '100%',
        margin: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    link: {
        marginLeft: 'auto',
        order: 2,
        color: blue[500],
        padding: 5
    },
    avatar: {
        backgroundColor: red[500],
    },
}

// Defining proptery to Higher Order Component
ProductItemWrapper.propTypes = {
classes: PropTypes.object.isRequired,
}

/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const ProductItemWithStyles = withStyles(styles)(ProductItemWrapper)

export { ProductItemWithStyles as ProductItem } 