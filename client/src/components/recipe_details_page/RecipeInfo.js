import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardMedia, Container, Divider, Button, Icon } from '@material-ui/core';
import * as emailjs from 'emailjs-com';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex" ,
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center", 
    fontSize: "2.5 rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      margin: "auto"
    },    
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    margin: "15%",
    [theme.breakpoints.down("sm")]: {
      margin: "4%",
      width: "45%"
    }, 
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10%"
  },
  typography: {
    fontSize: "2.1rem",
  },
  likeButton: {
    margin: "3%"
  },
  info_like: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  font: {
    fontSize: "1.3rem"
  },
  style: { width: "100%", margin: "3%", borderRadius: "20px" },
  buttonRoot: {
      background: "#fdd770;",
      borderRadius: 5,
      border: 0,
      height: 40,
      padding: '0 18px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
    },
    label: {
      textTransform: 'capitalized',
    }
  })
);


export default function RecipeInfo(props) {
  const { recipe, sessionUser } = props;
  const classes = useStyles();
  
  const handleShare = () => { 
    let receiverEmail = JSON.parse(localStorage.getItem("sessionUser")).email;
    let first_name = JSON.parse(localStorage.getItem("sessionUser")).first_name;
    let link = recipe.src_url; 
    let recipeLabel = recipe.label;
    let message = `Link for recipe "${recipeLabel}": ${link}`;
    const senderEmail = "yumeek@test.com";
    let templateParams = {
      to_name: first_name,
      form_name: "Yumeek",
      message_html: message,
      recieverEmail: receiverEmail,
      senderEmail: senderEmail
    }
      emailjs.send(
        'gmail',
        process.env.REACT_APP_TEMPELATE_ID_EMAILJS,
        templateParams,
        process.env.REACT_APP_USER_ID_EMAILJS
      )
      .then((res) => {
        console.log("Response text: ", res.text);
      })
      .catch((err) => console.log("Error:", err))
  }

  return (
    <>
      <Container className={classes.root} >
        <CardMedia component="img" src={recipe.img_url} alt={recipe.label} className={classes.style}/>
        <Container className={classes.info_like}>
        <Typography variant="h3" align="left" width={1}>{recipe.label}</Typography>
          <div className={classes.container}>
            <div className={classes.info}>
              <span className={classes.typography}>{recipe.ingredients.length}</span>
              <span className={classes.font}>Ingredients</span>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.info}>
              <span className={classes.typography}>{recipe.energies}</span>
              <span className={classes.font}>Calories</span>
            </div>
          </div>
          {sessionUser ? (
            <div className={classes.likeButton}>
              <Button 
              classes={{
                root: classes.buttonRoot,
                label: classes.label, 
              }}
                endIcon={<Icon>send</Icon>}
                onClick={() => handleShare()}
              >
                Share The Link
              </Button>
            </div>
          ) : (
            <span></span>
          )}
        </Container>
      </Container>
    </>
  );
}