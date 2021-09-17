import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import { Home, Login, SignUp, Protected, Analytics, Header, EditPolicy, AppMessages, PrivateRoute } from './views';
import { Admin } from './admin';
import { logout } from './utils/auth';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useStoreContext } from './+state/context';

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: '#f2f2f2',
    minHeight: '100vh'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc( 100vh - 64px)',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
}));

export const Routes: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const {state} = useStoreContext();

  return (
    <Box  className={classes.app} >
    <Header/>
    <AppMessages/>
   { state.loader && <LinearProgress color="secondary"  />}
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
            <Route path="/login" component={Login}  />
            <Route path="/signup" component={SignUp} />
            <Route
              path="/logout"
              render={() => {
                logout();
                history.push('/');
                return null;
              }}
            />
            <Route  path="/policy/edit" component={EditPolicy} />
            <Route  path="/analytics" component={Analytics} />
            <Route  path="/" component={Home} />
      </Switch>
    </Box>
  );
};
