import React from "react";
import {makeStyles, Typography} from "@material-ui/core";

const GradientText = ({
  text,
  size = 16,
                      }) => {
  const useStyles = makeStyles((theme) => ({
    gradientText: {
      backgroundImage: '-webkit-linear-gradient(-60deg, #B562E6, #B562E6, #72BEF0, #e73c7e, #ee7752)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: '$hue 7s ease-in-out infinite',
      backgroundSize: '300%',
      fontSize: size,
    },
    "@keyframes hue": {
      "0%": {
        backgroundPosition: '0 50%',
        // WebkitFilter: 'hue-rotate(0deg)',
      },
      "50%": {
        backgroundPosition: '100% 50%',
      },
      "100%": {
        // WebkitFilter: 'hue-rotate(-360deg)',
        backgroundPosition: '0% 50%',
      }
    }
  }));

  const classes = useStyles();

  return (
    <Typography classes={{root: classes.gradientText}}>
      {text}
    </Typography>
  );

};

export default GradientText;