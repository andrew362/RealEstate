import React from 'react';
import EmptyState from '../../layout/EmptyState/EmptyState';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';

import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

const styles = theme => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});

const EditContent = ({
  classes,
  isSignedIn,
  title,
  onSignInClick,
  onSignUpClick
}) => {
  return (
    <>
      {!isSignedIn && (
        <>
          <EmptyState
            icon={
              <HomeIcon className={classes.emptyStateIcon} color="action" />
            }
            title="Edit"
            description="Please SIGN IN"
            button={
              <>
                <Fab
                  className={classes.button}
                  color="secondary"
                  onClick={onSignInClick}
                  variant="extended"
                >
                  Sign In
                </Fab>
                <Fab
                  className={classes.button}
                  color="secondary"
                  onClick={onSignUpClick}
                  variant="extended"
                >
                  Sign Up
                </Fab>
              </>
            }
          />
        </>
      )}

      {isSignedIn && (
        <>Edit</>
      )}
    </>
  );
};

export default withStyles(styles)(EditContent);
