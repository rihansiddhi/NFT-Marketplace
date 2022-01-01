import React, {useState, Fragment} from "react";
import {Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import myNftCardStyles from "../../styles/MyNfts/myNftCardStyles";
import {getMediaUrl, getRarity} from "../../utils/nftCardFunctions";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {useDispatch} from "react-redux";
import {selectNft} from "../../redux/actions/nftActions";
import CustomDialog from "../helperComponents/customDialog";
import LoginAndRegisterActions from "../LoginAndRegister/loginAndRegisterActions";
import TransferDialog from "./transferDialog";
import cn from "classnames";
import "../../styles/MyNfts/gradientBorder.css";

const MyNftCard = ({
  nft
                   }) => {
  const useStyles = makeStyles(myNftCardStyles);
  const classes = useStyles();
  const { description, balance, symbol, issuer, image, asset_type, max_supply } = nft;
  const descriptionObject = JSON.parse(description);
  const {
    nft_object: {
      type,
      thumbnail,
    }
  } = descriptionObject;
  const mediaUrl = getMediaUrl(type) + thumbnail;
  const dispatch = useDispatch();
  const [transferDialog, setTransferDialog] = useState(false);

  const handleClick = () => {
    dispatch(selectNft(nft));
  };

  const handleTransfer = (e) => {
    e.stopPropagation();
    setTransferDialog(true);
  };

  const rarity = getRarity(max_supply);

  return (
    <Box className={rarity+"-border"}>
      <Card
        classes={{
          root: classes.card,
        }}
        onClick={handleClick}
      >
        <CardActionArea>
          <Grid container justify="space-between" classes={{ root: classes.header }}>
            <Grid item>
              <Chip
                label={rarity}
                clickable
                classes={{
                  root: classes[rarity],
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
          </Grid>
          <CardMedia
            component={type === 'video' ? 'video' : 'img'}
            className={classes.media}
            image={mediaUrl}
            autoPlay
            loop
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" classes={{ root: classes.title }}>
              {'#'+symbol}
            </Typography>
            <Chip
              avatar={image ? <Avatar alt="issuer" src={image} /> : <AccountCircleIcon />}
              label={'By ' + issuer}
              classes={{
                root: classes.issuer,
              }}
            />
            <Grid container justify="space-between">
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
                  label={'Transfer'}
                  clickable
                  classes={{
                    root: classes.transfer,
                  }}
                  onClick={handleTransfer}
                />
              </Grid>
            </Grid>
            {/*<Typography variant="body2" color="textSecondary" component="p">*/}
            {/*  It is used as secondary coin.*/}
            {/*</Typography>*/}
          </CardContent>
        </CardActionArea>
      </Card>
      {transferDialog &&
      <TransferDialog
        open={transferDialog}
        onClose={() => setTransferDialog(false)}
        balance={balance}
        assetType={asset_type}
      />}
    </Box>
  );
};

export default MyNftCard;