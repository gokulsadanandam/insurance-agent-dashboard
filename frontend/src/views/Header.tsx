import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { isAuthenticated } from '../utils/auth';
import { useHistory } from 'react-router';
import { useStoreContext } from '../+state/context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useStoreContext();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={() => {
            dispatch({ type: 'update/header', payload: 'User Agent Login' })
            history.push('/')
          }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {state.header.text}
          </Typography>
          {isAuthenticated() && <Button color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
