import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Typography, IconButton, Toolbar, AppBar }  from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { colors } from '../styles';
import { MenuIcon } from '../utils/icons'
import { CONSTANTS } from '../utils/constants';
import { IApp } from '../interfaces';
import { appActions as actions } from '../redux/actions';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
  classes?: any;
}
type IProps = IOwnProps &
  IApp.StateToProps & 
  IApp.DispatchFromProps;

// Defining Own State to avoid unwanted props
interface IState {
  
}

// Mapping Store data with props 
const mapStateToProps = function(state: any){
  return {
    isDrawerOpen: state.app.isDrawerOpen,
  }
};

// Header Component
class AppHeader extends React.Component<IProps, IState> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  
  // Function to render UI
  render() {
    const { classes } = this.props;
    return (
        <AppBar
        position="fixed"
        className={clsx({
          [classes.appBarShift]: this.props.isDrawerOpen,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.props.toggleDrawer}
            edge="start"
            className={clsx(this.props.isDrawerOpen && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Product Blog  
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
// High Order Component to connect with store and action mapping
const AppHeaderWrapper = connect(mapStateToProps, actions)(AppHeader);

// styles
const styles = {
  appBarShift: {
    width: `calc(100% - ${CONSTANTS.DRAWER_WIDTH}px)`,
  },
  hide: {
    display: 'none',
  },
  siteLink: {
    marginLeft: 'auto',
    order: 2,
    textDecoration: 'inherit',
    color: colors.WHITE,
  }
}

/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const AppHeaderWithStyles = withStyles(styles)(AppHeaderWrapper)

export { AppHeaderWithStyles as AppHeader }
