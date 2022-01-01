import React, { Fragment } from "react";
import {useSelector} from "react-redux";
import {
  Avatar,
  Box, Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip, Divider,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import assetInfoStyles from "../../styles/asset/assetInfo";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {getRarity} from "../../utils/nftCardFunctions";

const AssetInfo = () => {
  const selectedNft = useSelector(state => state.nft.selectedNft);
  const { balance, max_supply, description, issuer, symbol } = selectedNft;
  const descriptionObject = JSON.parse(description);
  const { title, market, description: descContent, nft_object } = descriptionObject;
  const { attestation, genre, tags, } = nft_object;
  const rarity = getRarity(max_supply);
  const useStyles = makeStyles(assetInfoStyles);
  const classes = useStyles();
  return (
    <Fragment>
      <Typography classes={{ root: classes.title }}>{title}</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Chip
            label={rarity}
            classes={{
              root: classes[rarity],
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label={'Balance: ' + balance}
            classes={{
              root: classes.chip,
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label={'Total runs: ' + max_supply}
            classes={{
              root: classes.total_runs,
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label={genre.toUpperCase()}
            classes={{
              root: classes.genre,
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            avatar={false ? <Avatar alt="issuer" src={""} /> : <AccountCircleIcon />}
            label={'By ' + issuer}
            classes={{
              root: classes.issuer,
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="body1" color="textSecondary" component="p" classes={{ root: classes.description }}>
        {descContent}
      </Typography>
      <Card
        classes={{
          root: classes.card,
        }}
        raised
      >
        <CardContent>
          <Box pb={2} pl={2}>
            <Typography variant="body2" color="textSecondary">
              {"Market"} &nbsp;
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {market}
            </Typography>
          </Box>
          <Divider classes={{ root: classes.divider }}/>
          <Box pt={2} pl={2}>
            <Typography variant="body2" color="textSecondary">
              {"SYMBOL"} &nbsp;
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {"#" + symbol}
            </Typography>
          </Box>
          {/*<Typography variant="body2" color="textSecondary" component="p">*/}
          {/*  It is used as secondary coin.*/}
          {/*</Typography>*/}
        </CardContent>
      </Card>
      <Box classes={{ root: classes.attestation }}>
        <Typography variant="body1" color="textPrimary" component="p">
          {"Attestation:"}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {attestation}
        </Typography>
      </Box>
      <br />
      <Grid container spacing={1} alignItems={"center"}>
        <Typography variant="body1" color="textPrimary" component="p">
          {"Tags: "}
        </Typography>
        {tags.map(tag =>
          <Grid item>
            <Chip
              label={tag}
              classes={{
                root: classes.tags,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );

};

export default AssetInfo;