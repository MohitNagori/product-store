import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles, useTheme, Theme, createStyles, CssBaseline, }  from '@material-ui/core';
import { AppDrawer } from './AppDrawer';
import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';

// styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
);

// App Component
export default function App() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppHeader/>
        <AppDrawer theme={theme}/>
        <AppMain/>  
      </div>
    </Router>
  );
}