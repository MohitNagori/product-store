import { Types } from './types';
import { IApp } from '../../interfaces';

// Actions for application 
const IAppAction: IApp.DispatchFromProps = {
  toggleDrawer: () => {
    return async function (dispatch: any) {

      // dispatch to update store when actions starts (start and complete is together in it as it is not an async action really) 
      dispatch({
        type: Types.TOGGLE_DRAWER,
      });
    };
  }
};

export { IAppAction as appActions }
