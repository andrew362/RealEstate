import React, { useState, useEffect } from 'react';
import EmptyState from '../../layout/EmptyState/EmptyState';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import useFetchApi from '../../actions/useFetchApi';
import Alert from '../../Components/Alerts/Alert';

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
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
});

const EditContent = ({
  classes,
  isSignedIn,
  location,
  onSignInClick,
  onSignUpClick,
  theme
}) => {
  const {
    getAllConfigurations,
    saveConfiguration,
    overwriteConfiguration,
    removeConfiguration,
    message,
    allConfigurations,
  } = useFetchApi();

  const [id, setId] = useState(null);
  const [values, setValues] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false);

  useEffect(() => {
    getAllConfigurations();
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      const ID = location.search.split('id=')[1];
      setId(ID);
      if (allConfigurations) {
        const temp = allConfigurations.filter(el => el.id === id);
        setValues({ ...temp[0] });
      }
    }
    return () => (isSubscribed = false);
  }, [allConfigurations]);

  useEffect(() => {
    if (message.split('/')[0] === 'update') {
      setAlertMessage('Succesfull Updated!');
      setOpen(true);
    }
    if (message.split('/')[0] === 'error') {
      setAlertMessage('Coś poszło nie tak!');
      setOpen(true);
    }
    if (message.split('/')[0] === 'create') {
      setAlertMessage('Succesfull Created!');
      setOpen(true);
    }
    if (message.split('/')[0] === 'delete') {
      setUpdateBtnDisabled(true);
      setAlertMessage('Succesfull Deleted!');
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value || '' });
  };

  const submitHandler = () => {
    overwriteConfiguration(values);
  };

  const deleteHandler = () => {
    removeConfiguration(values);
  };

  const createHandler = (e) => {
    const val = { ...values };
    delete val.id;
    saveConfiguration(val);
    e.preventDefault();
  };

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
          <Alert message={alertMessage} handleClose={handleClose} open={open} />
          <form style={{backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa', padding: '20px'}} onSubmit={createHandler} className={classes.container} autoComplete="off">
            <TextField
              id="outlined-name"
              disabled={true}
              label="Id"
              className={classes.textField}
              value={values.id || ''}
              onChange={handleChange('id')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="City"
              className={classes.textField}
              value={values.city || ''}
              onChange={handleChange('city')}
              margin="normal"
              required={true}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Street"
              className={classes.textField}
              value={values.street || ''}
              onChange={handleChange('street')}
              margin="normal"
              required={true}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Apartment"
              className={classes.textField}
              value={values.apartment || ''}
              onChange={handleChange('apartment')}
              margin="normal"
              required={true}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Property"
              className={classes.textField}
              value={values.property || ''}
              onChange={handleChange('property')}
              margin="normal"
              required={true}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Price"
              className={classes.textField}
              value={values.price || ''}
              type="number"
              onChange={handleChange('price')}
              margin="normal"
              required={true}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Type"
              className={classes.textField}
              value={values.type || ''}
              type="number"
              onChange={handleChange('type')}
              margin="normal"
              required={true}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Description"
              className={classes.textField}
              value={values.description || ''}
              onChange={handleChange('description')}
              margin="normal"
              variant="outlined"
              required={true}
            />
            {location.search ? (
              <>
                <Button
                  color="primary"
                  disabled={updateBtnDisabled}
                  onClick={submitHandler}
                  variant="contained"
                  className={classes.button}
                >
                  Update
                </Button>
                <Button
                  color="secondary"
                  onClick={deleteHandler}
                  variant="contained"
                  className={classes.button}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                type='submit'
              >
                Create
              </Button>
            )}
          </form>
        </>
      )}
    </>
  );
};

export default withRouter(withStyles(styles)(EditContent));
