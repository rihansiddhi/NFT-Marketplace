import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, makeStyles} from "@material-ui/core";
import frontCardStyles from "../../styles/asset/frontCard";

const FrontCard = ({
  type,
  imgUrl,
                   }) => {
  const useStyles = makeStyles(frontCardStyles);
  const classes = useStyles();
  return(
    <Card
      classes={{
        root: classes.card,
      }}
    >
      <CardActionArea>
        <CardMedia
          component={type === 'video' ? 'video' : 'img'}
          className={classes.media}
          // image={"https://st.depositphotos.com/1748739/3042/i/950/depositphotos_30428645-stock-photo-number-1.jpg"}
          image={imgUrl}
          autoPlay
          loop
        />
      </CardActionArea>
    </Card>
);
};

export default FrontCard;