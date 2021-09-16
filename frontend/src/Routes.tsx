import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import { Home, Login, SignUp, Protected, PrivateRoute, Header, EditPolicy } from './views';
import { Admin } from './admin';
import { logout } from './utils/auth';

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

  return (
    <Box  className={classes.app} >
    <Header/>
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
            {/* <PrivateRoute path="/protected" component={Protected} /> */}
            {/* <PrivateRoute path="/" component={Home} /> */}
            {/* <PrivateRoute path="/policy/edit" component={EditPolicy} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/policy/edit" component={EditPolicy} />
      </Switch>
    </Box>
  );
};
