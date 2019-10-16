import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { IconButton, ListItemText, List, Drawer, Divider, ListItemIcon, ListItem }  from '@material-ui/core';
import { ChevronLeftIcon, ChevronRightIcon, MarkunreadMailboxIcon, CategoryIcon } from '../utils/icons'
import { CONSTANTS } from '../utils/constants';
import { IApp } from '../interfaces';
import { appActions as actions } from '../redux/actions';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
  classes?: any;
  theme?: any;
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

// Drawer Component
class AppDrawer extends React.Component<IProps, IState> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  // Funtion that return icon based on side menu 
  getMenuListIcon = (icon: any) => {
    switch(icon.toLowerCase()) {
      case CONSTANTS.PRODUCTS: 
        return <ListItemIcon><MarkunreadMailboxIcon /></ListItemIcon>;
      case CONSTANTS.CATEGORIES: 
        return <ListItemIcon><CategoryIcon /></ListItemIcon>;
    }
  }

  // Function to render UI
  render() {
    const { classes, theme } = this.props;
    return (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.isDrawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.props.toggleDrawer}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {CONSTANTS.MENU_ITEM.map((menuItem, index) => (
              <ListItem key={menuItem.text} className={classes.menuItem}>
                <Link to={menuItem.path} className={classes.link}>
                  { this.getMenuListIcon(menuItem.text) }
                  <ListItemText primary={menuItem.text} />  
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>    
    );
  }
}

// High Order Component to connect with store and action mapping
const AppDrawerWrapper = connect(mapStateToProps, actions)(AppDrawer);

// styles
const styles = {
  drawer: {
    width: CONSTANTS.DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: CONSTANTS.DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  menuItem: {
    padding: 0
  },
  link: {
    display: 'flex',
    textDecoration: 'none !important',
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
}

/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const AppDrawerWithStyles = withStyles(styles)(AppDrawerWrapper)

export { AppDrawerWithStyles as AppDrawer }
