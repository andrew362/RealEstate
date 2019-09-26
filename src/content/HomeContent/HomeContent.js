import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import HomeIcon from '@material-ui/icons/Home';

import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LanguageIcon from '@material-ui/icons/Language';
import EditIcon from '@material-ui/icons/Edit';
import backgroundImg from '../../assets/bg.jpg';

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
  },

  container: {
    color: 'fff'
  }
});

class HomeContent extends Component {

  

  componentWillUnmount() {

    const bg = document.getElementById('mainContainer');
    bg.style.backgroundImage = ``;
  }

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isSignedIn, title, theme } = this.props;

    const { location } = this.props;

    if(location.pathname === '/'){
      const bg = document.getElementById('mainContainer');
      bg.style.backgroundImage = `url(${backgroundImg})`;
      bg.style.backgroundSize = 'cover';
    }

    if (isSignedIn) {
      return (
        <EmptyState
          theme={theme}
          className={classes.container}
          icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
          title="Welcome to Admin Panel"
          description="Add, edit, modify your properties"
          button={
            <>
              <Fab
                className={classes.button}
                color="secondary"
                component={Link}
                to="/explore#edit"
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
        theme={theme}
        icon={
          <HomeWorkIcon className={classes.emptyStateIcon} color="action" />
        }
        title={`Welcome in ${title}`}
        description="Explore our properties!"
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

export default withRouter(withStyles(styles)(HomeContent));
