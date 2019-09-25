import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 350,
    width: 300
  },
  media: {
    height: 0,
    paddingTop: '75%', // 4:3
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

 const CardComponent = ({isSignedIn, data}) => {
  const classes = useStyles();

  return (
    <Card style={{margin: '20px auto'}} className={classes.card}>
      <CardHeader
        action={
          isSignedIn && (<IconButton component={Link} to={'/edit?id=' + data.id} aria-label="settings">
            <EditIcon className={classes.buttonIcon} />
          </IconButton>)
        }
        title={data.city}
        subheader={data.street}
      />
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/600x400/?architecture"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Apartment:</b> {data.apartment} <br />
          <b>Property:</b> {data.property} <br />
          <b>Type:</b> {data.type} <br />
          <b>Description:</b> {data.description} <br />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CardComponent;
