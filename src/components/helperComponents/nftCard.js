import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import nftCardStyles from "../../styles/helperComponents/nftCard";
import { makeStyles } from "@material-ui/core/styles";

const NftCard = () => {
  const useStyles = makeStyles(nftCardStyles);
  const classes = useStyles(nftCardStyles);
  return (
    <Card
      classes={{
        root: classes.card,
      }}
      raised
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='https://i.redd.it/snu37ngqh7921.jpg'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            NFT Digital Art
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            It is used as secondary coin.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NftCard;