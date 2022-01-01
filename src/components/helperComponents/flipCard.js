import React from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({
                    front,
                    back,
                    flipped,
                    setFlipped
                  }) => {
  return(
    <ReactCardFlip
      isFlipped={flipped}
      flipSpeedFrontToBack={1.0}
      flipSpeedBackToFront={1.0}
      flipDirection="horizontal"
      containerStyle={{ display: 'table', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <span key="front" onClick={() => setFlipped(!flipped)}>
        {front}
      </span>
      <span key="back" onClick={() => setFlipped(!flipped)}>
        {back}
      </span>
</ReactCardFlip>
  );
};

export default FlipCard;