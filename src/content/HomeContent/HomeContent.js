import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import HomeIcon from '@material-ui/icons/Home';

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LanguageIcon from '@material-ui/icons/Language';
import EditIcon from '@material-ui/icons/Edit';

import EmptyState from '../../layout/EmptyState/EmptyState';

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

class HomeContent extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isSignedIn, title } = this.props;

    if (isSignedIn) {
      return (
        <EmptyState
          icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
          title="Welcome to Admin Panel"
          description="Add, edit, modify your properties"
          button={
            <>
              <Fab
                className={classes.button}
                color="secondary"
                component={Link}
                to="/edit"
                variant="extended"
              >
                <EditIcon className={classes.buttonIcon} />
                Edit properties
              </Fab>
              <br />
              <Fab
                className={classes.button}
                color="secondary"
                href="/explore"
                target="_self"
                variant="extended"
              >
                <LanguageIcon className={classes.buttonIcon} />
                Explore
              </Fab>
            </>
          }
        />
      );
    }

    return (
      <EmptyState
        icon={
          <HomeWorkIcon className={classes.emptyStateIcon} color="action" />
        }
        title={`Welcome in ${title}`}
        description="Explore out properties!"
        button={
          <Fab
            className={classes.button}
            color="secondary"
            href="/explore"
            target="_self"
            variant="extended"
          >
            <LanguageIcon className={classes.buttonIcon} />
            Explore
          </Fab>
        }
      />
    );
  }
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired,

  isSignedIn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(HomeContent);
