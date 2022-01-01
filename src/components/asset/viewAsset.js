import React, {useEffect, useRef, Fragment, useState} from 'react';
import {useSelector} from "react-redux";
import FlipCard from "../helperComponents/flipCard";
import FrontCard from "./frontCard";
import BackCard from "./backCard";
import {getMediaUrl} from "../../utils/nftCardFunctions";
import {Box, makeStyles} from "@material-ui/core";
import Button from "../helperComponents/customButton";
import viewAssetStyles from "../../styles/asset/viewAsset";

const ViewAsset = () => {

  const selectedNft = useSelector(state => state.nft.selectedNft);
  const { balance, max_supply, description, issuer, symbol } = selectedNft;
  const descriptionObject = JSON.parse(description);
  const { title, market, description: descContent, nft_object } = descriptionObject;
  const { attestation, genre, tags, type, thumbnail, secondary_content_hash } = nft_object;
  const useStyles = makeStyles(viewAssetStyles);
  const classes = useStyles();
  const primaryUrl = getMediaUrl(type) + thumbnail;
  const secondaryUrl = getMediaUrl(type) + (type === 'music' ? thumbnail : secondary_content_hash);
  const secondaryAssetUrl = getMediaUrl(type) + secondary_content_hash;
  const flipCardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const mouseTracker = e => {
    const { x, y, width, height } = flipCardRef.current.getBoundingClientRect()
    const centerPoint = { x: x + width / 2, y: y + height / 2 }
    const degreeX = (e.clientY - centerPoint.y) * 0.008
    const degreeY = (e.clientX - centerPoint.x) * -0.008
    flipCardRef.current.style.transform = `perspective(600px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseTracker);
    return () => {
      window.removeEventListener("mousemove", mouseTracker);
    };
  });

  return (
    <Fragment>
      <div ref={flipCardRef}>
        <FlipCard
          front={<FrontCard type={type} imgUrl={primaryUrl} />}
          back={<BackCard type={type} imgUrl={secondaryUrl} secondaryAssetUrl={secondaryAssetUrl}/>}
          flipped={flipped}
          setFlipped={setFlipped}
        />
      </div>
      <Button
        variant="outlined"
        classes={{ root: classes.showButton }}
        onClick={() => setFlipped(!flipped)}
      >
        {`Show ${flipped ? 'Thumbnail' : 'Content'}`}
      </Button>
    </Fragment>
  );
};

export default ViewAsset;