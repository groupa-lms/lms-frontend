import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  newsCard: {
    display: 'flex',

  },
  newsCardDetails: {
    flex: 1,
  },
  newsCardMedia: {
    width: 160,
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    width: 200,
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const cards = [1, 2, 3, 4];

function MainPage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Typography
          component="h1"
          variant="h4"
          align="left"
          color="textPrimary"
          style={{ marginTop: 64 }}
          gutterBottom>
          Welcome -XXXX
            </Typography>

        <Typography variant="subtitle1" align="left" color="textSecondary" paragraph>
          Date: XXXX/XX/XX
            </Typography>
        <Grid container spacing={16} className={classes.cardGrid} >

          <Grid item key="event" xs={12} md={6}>
            <Card className={classes.newsCard}>
              <div className={classes.newsCardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Events Coming
                      </Typography>
                  <Typography variant="subtitle1" color="textSecondary" >
                    2018/XX/XX
                      </Typography>
                  <Typography variant="subtitle1" paragraph>
                    This is a wider card with supporting text below as a natural lead-in to additional content.
                      </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue reading...
                      </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.newsCardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
              </Hidden>
            </Card>
          </Grid>
          <Grid item key="news" xs={12} md={6}>
            <Card className={classes.newsCard}>
              <div className={classes.newsCardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Latest News
                      </Typography>
                  <Typography variant="subtitle1" color="textSecondary" >
                    2018/XX/XX
                      </Typography>
                  <Typography variant="subtitle1" paragraph>
                    This is a wider card with supporting text below as a natural lead-in to additional content.
                      </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue reading...
                      </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia
                  className={classes.newsCardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
              </Hidden>
            </Card>
          </Grid>

        </Grid>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={16} justify="left">
            <Grid item>
              <Typography 
              component="h1" 
              variant="h5" 
              align="left" 
              color="textPrimary" 
              gutterBottom>
                Course
            </Typography>
            </Grid>
            <Grid item>
              <Typography 
              variant="subtitle1" 
              align="left" 
              color="textSecondary" 
              style={{ paddingTop: 4 }}>
                2018 Semester 1
            </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      {/* <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography> */}
                      <Typography>
                        This is a media card. You can use this section to describe the content.
                    </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Assignment
                    </Button>
                    <Button size="small" color="primary">
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <Typography component="h1" 
        variant="h5" 
        align="left" 
        color="textPrimary" 
        gutterBottom 
        style={{ paddingTop: 14 }}>
          Recent Performance
        </Typography>
        <Grid container spacing={24}>

          <Grid item key="assignDone" sm={4} md={4} lg={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.cardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
              </CardActionArea>
              <CardActions>
                <Button size="large" color="primary">
                  Assignment Done
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item key="courseProgression" sm={4} md={4} lg={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.cardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
              </CardActionArea>
              <CardActions>
                <Button size="large" color="primary">
                  Course Progression
                    </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item key="LoginTime" sm={4} md={4} lg={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.cardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
              </CardActionArea>

              <CardActions>
                <Button size="large" color="primary">
                  Total Login Time
                    </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </main>

    </React.Fragment>
  );
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);
