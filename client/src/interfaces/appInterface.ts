// App Data Wrapper
export namespace IApp {

    // App Data Interface
    export interface IAppData {
       
    }

    // State Interface which is used in store.
    export interface StateToProps {
        appData?: IAppData | undefined;
        isDrawerOpen?: boolean;
    }
    
    // Props Interface which is used to create actions.
    export interface DispatchFromProps {
        // action which will toggle the side drawer
        toggleDrawer(): Function;
    }
}
  