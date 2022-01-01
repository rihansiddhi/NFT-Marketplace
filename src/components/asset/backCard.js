import React from "react";
import {Card, CardActionArea, CardMedia, makeStyles} from "@material-ui/core";
import backCardStyles from "../../styles/asset/backCard";

const BackCard = ({
                     type,
                     imgUrl,
                    secondaryAssetUrl,
                   }) => {
  const useStyles = makeStyles(backCardStyles);
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
          className={type === 'video' ? classes.video : classes.media}
          // image={"https://cdn.havecamerawilltravel.com/photographer/files/2015/09/aspect-ratio-4to51-678x848.png"}
          image={imgUrl}
          autoPlay
          loop
          controls
          disablePictureInPicture
          controlsList="nodownload"
        />
        {type === 'music'
        && (<audio style={{ width: '100%', bottom: 0, position: 'absolute' }} controls src={secondaryAssetUrl} />)}
      </CardActionArea>
    </Card>
  );
};

export default BackCard;