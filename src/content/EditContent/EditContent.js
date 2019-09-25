import React, { useState, useEffect } from 'react';
import EmptyState from '../../layout/EmptyState/EmptyState';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import useFetchApi from '../../actions/useFetchApi';

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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  }
});

const EditContent = ({
  classes,
  isSignedIn,
  location,
  onSignInClick,
  onSignUpClick
}) => {
  const {
    saveConfiguration,
    overwriteConfiguration,
    removeConfiguration,
    successMessage,
    errorMessage,
    overwriteSuccessMessage,
    overwriteErrorMessage,
    removeSuccessMessage,
    allConfigurations,
    chosenConfiguration,
    setConfiguration
  } = useFetchApi();

  const [id, setId] = useState(null);
  const [values, setValues] = React.useState(null);

  useEffect(() => {
    const ID = location.search.split('id=')[1];
    setId(ID);
    if (allConfigurations) {
      const temp = allConfigurations.filter(el => el.id === id);

      setValues({...temp[0]});
    }
  }, [allConfigurations]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitHandler = () => {
    console.log(values);
    overwriteConfiguration(values);
  }

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
      {isSignedIn && values && (
        <>
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
            id="outlined-name"
            disabled={true}
            label="Id"
            className={classes.textField}
            value={values.id}
            onChange={handleChange('id')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="City"
            className={classes.textField}
            value={values.city}
            onChange={handleChange('city')}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-name"
            label="Street"
            className={classes.textField}
            value={values.street}
            onChange={handleChange('street')}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-name"
            label="Apartment"
            className={classes.textField}
            value={values.apartment}
            onChange={handleChange('apartment')}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-name"
            label="Property"
            className={classes.textField}
            value={values.property}
            onChange={handleChange('property')}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-name"
            label="Type"
            className={classes.textField}
            value={values.type}
            onChange={handleChange('type')}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-name"
            label="Description"
            className={classes.textField}
            value={values.description}
            onChange={handleChange('description')}
            margin="normal"
            variant="outlined"
          />
          <Button color="primary" onClick={submitHandler} variant="contained" className={classes.button}>
            Update
          </Button>
        </form>
        
        </>
      )}
    </>
  );
};

export default withRouter(withStyles(styles)(EditContent));
