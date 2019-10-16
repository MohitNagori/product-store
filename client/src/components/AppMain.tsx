import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import { AppLoading } from './AppLoading';
import { ListProduct, Categories } from '../pages';
import { appActions as actions } from '../redux/actions';
import { CONSTANTS } from '../utils/constants';
import { IApp } from '../interfaces';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
  classes?: any;
}
type IProps = IOwnProps &
  IApp.StateToProps & 
  IApp.DispatchFromProps;

// Defining Own State to avoid unwanted props  
interface IState {}

// Mapping Store data with props 
const mapStateToProps = function(state: any){
  return {
    isDrawerOpen: state.app.isDrawerOpen,
  }
};

// Main Component
class AppMain extends React.Component<IProps, IState> {
 
  // Function to render UI
  render() {
    const { classes } = this.props;
    return (
        <Box className={clsx(classes.content, {
            [classes.contentShift]: this.props.isDrawerOpen,
            })} position={'relative'}>
            <div className={classes.drawerHeader} />
            <AppLoading />
            <Route exact={true} path="/" component={ListProduct}/>
            <Route path="/categories" component={Categories}/>
        </Box>
    );
  }
}
// High Order Component to connect with store and action mapping
const AppMainWrapper = connect(mapStateToProps, actions)(AppMain);

// styles
const styles = {
  content: {
    flexGrow: 1,
    marginLeft: -CONSTANTS.DRAWER_WIDTH,
    paddingTop: 80,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25, 
  },
  contentShift: {
    marginLeft: 0,
  }
}

// Defining proptery to Higher Order Component
AppMainWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
}

/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const AppMainWithStyles = withStyles(styles)(AppMainWrapper)

export { AppMainWithStyles as AppMain }