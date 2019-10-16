import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { CONSTANTS } from '../utils/constants';
import { IApp } from '../interfaces';

// Defining Own Props to avoid unwanted props
interface IOwnProps {
    classes?: any;
    loading?: boolean;
}
type IProps = IOwnProps & 
    IApp.StateToProps;

// Defining Own State to avoid unwanted props
interface IState {}

// Mapping Store data with props 
const mapStateToProps = function(state: any){
    return {
      isDrawerOpen: state.app.isDrawerOpen,
    }
};  

// Loading Component
class AppLoading extends React.Component<IProps, IState> {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    // Function to render UI
    render() {
        const { classes } = this.props;
        return (
            <div> 
                { this.props.loading ? 
                    <Box className={clsx(classes.loaderContainer, {
                        [classes.contentShift]: this.props.isDrawerOpen,
                        })} position={'fixed'}>
                        <CircularProgress /> 
                    </Box> : null }
            </div>
        );    
    }
}
// High Order Component to connect with store and action mapping
const AppLoadingWrapper = connect(mapStateToProps, null) (AppLoading);

// styles
const styles = {
    loaderContainer: {
        width: '100%',
        height: 'calc(100vh - 60px)',
        margin: '-20px -25px',
        'background-color': 'rgba(0,0,0,0.4)',
        'z-index': 1,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
    },
    contentShift: {
        width: `calc(100% - ${CONSTANTS.DRAWER_WIDTH}px)`,
    }
}

/* High Order Component to apply styles as styles can either be applied in HOOK (not in React Component) 
  or with Higher Order Component. We used higher order component as we have used material components.
*/
const AppLoadingWithStyles = withStyles(styles)(AppLoadingWrapper)


export { AppLoadingWithStyles as AppLoading }