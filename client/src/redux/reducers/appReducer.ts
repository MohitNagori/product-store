import { AnyAction } from 'redux';
import { Types } from '../actions/types';
import { IApp } from '../../interfaces';

// Initial State of store
const initialState: IApp.StateToProps = {
  appData: undefined,
  isDrawerOpen: false
};

// function to create reducer for app
export default function appReducer (
  state: IApp.StateToProps = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case Types.TOGGLE_DRAWER:
      // here return will update the state
      return {
        ...state,         
        isDrawerOpen: !state.isDrawerOpen
      };

    default:
      return state;
    }
}