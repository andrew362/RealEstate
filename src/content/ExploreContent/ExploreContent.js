import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CardComponent from '../../Components/Card/CardComponent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useFetchApi from '../../actions/useFetchApi';
import Alert from '../../Components/Alerts/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  panel: {
    float: 'right',
    margin: '10px'
  }
}));

const ExploreContent = ({ isSignedIn, location, history }) => {
  const {
    message,
    getAllConfigurations,
    allConfigurations,
    removeAllConfiguration
  } = useFetchApi();
  const [alertMessage, setAlertMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getAllConfigurations();
  }, []);

  useEffect(() => {
    if (message.split('/')[0] === 'error') {
      setAlertMessage('Coś poszło nie tak!');
      setOpen(true);
    }
    if (message.split('/')[0] === 'delete') {
      setAlertMessage('Succesfull Deleted!');
      setOpen(true);
      setTimeout(() => history.push('/'), 1000);
    }
  }, [message]);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const deleteAllHandler = () => {
    removeAllConfiguration();
  };

  return (
    <div className={classes.root}>
      <Alert message={alertMessage} handleClose={handleClose} open={open} />
      {isSignedIn && location.hash === '#edit' && (
        <div className={classes.panel}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            component={Link}
            to="edit"
          >
            Create New
          </Button>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={deleteAllHandler}
          >
            Delete All
          </Button>
        </div>
      )}

      <Grid container>
        {allConfigurations &&
          allConfigurations.map(el => (
            <Grid key={el.id} item xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                edit={location.hash === '#edit'}
                data={el}
                isSignedIn={isSignedIn}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default withRouter(ExploreContent);
