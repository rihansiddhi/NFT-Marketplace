import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { linkTwitter, updateTwitterUser, getTwitterUser, getTweets } from '../../apis/twitterBtcnft';
import { Grid } from '@material-ui/core';
import InputField from "../helperComponents/inputField";
import StaticSelect from "../helperComponents/staticSelect";
import DateFnsUtils from '@date-io/date-fns';
import CustomButton from "../helperComponents/customButton";
import TwitterTable from "../TwitterTags/TwitterTable";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import withNavbarHOC from "../Navbar/withNavbarHOC";
import { useDispatch, useSelector } from 'react-redux';
import {snackbar} from "../helperComponents/snackbar";
import {setLoader} from "../../redux/actions/flagActions";
import { setTwitter } from '../../redux/actions/userActions';
import cn from 'classnames';
import moment from 'moment';
import { parseTweetResp, runLoopTransfer } from '../../utils/twitterFunctions';
import useStyles from "../TwitterTags/twitterTagsStyles";
import CustomDialog from '../helperComponents/customDialog';
import { getMyNfts } from '../../redux/actions/nftActions';

const TwitterTags = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState({ hashtag: "", asset: "", errors: null, tableData: null, from: null, to: null, distribute: false, selectedAsset: null, airdropDisable: true, tableErrors: false});
    const user = useSelector(state => state.user);
    const assets = useSelector(state => state.nft.myNfts);
    const privateKeys = useSelector(state => state.cred.privateKeys);
    const assetSelectOptions = assets.map(item => ({ name: item.symbol, value: item.symbol, extraLabel: item.balance }));
    const isAssetExists = assets.find((item => item.symbol == state.asset));
    useEffect(() => {
        if(!isAssetExists){
            setState(prevState => ({
                ...prevState,
                tableData: isAssetExists ? prevState.tableData : null,
                tableErrors: false,
                airdropDisable: true,
                distribute: false,
                asset: ""
            }))
        } else{
            setState(prevState => ({
                ...prevState,
                selectedAsset: isAssetExists
            }))
        }
    }, [isAssetExists])
    const updateUserTwitter = async () =>  {
        try {
                let result = await linkTwitter();
                var credential = result.credential;
                var token = credential['accessToken'];
                var secret = credential['secret']
                dispatch(setLoader(true));
                const response = await updateTwitterUser({
                      twitter: {
                          username: result.additionalUserInfo.username,
                          token,
                          secret
                      }
                }, user.id);
                if (response && response.data) {
                    dispatch(setTwitter({
                            username: result.additionalUserInfo.username,
                            token,
                            secret
                    }));
                }
        } catch (error) {
        } finally{
            dispatch(setLoader(false));
        }
      }
    
    const formValuesChangeHandler = (input, type) => {
        if(typeof input.getMonth === 'function'){
            setState(prevState => ({
                ...prevState,
                [type]: input,
                tableData: null,
                airdropDisable: true
            }))
        } else{
            setState(prevState => ({
                ...prevState,
                [input.target.name]: input.target.value,
                tableData: null,
                airdropDisable: true
            }))
        }
    }

    const validateForm = () => {
        setState(prevState => ({
            ...prevState,
            errors: null
        }))
        let flag = 1;
        if( state.from && state.to ){
            let from = moment(state.from);
            let to = moment(state.to);
            let monthsDiff = to.diff(from, "months", true);
            if( monthsDiff > 2.01 ){
                flag = -1;
                setState(prevState => ({
                    ...prevState,
                    errors:{ ...prevState.errors, date: "Dates should not be greater than the span of two months"}
                }))
            }
        }
        else{
            flag = -1;
            setState(prevState => ({
                ...prevState,
                errors:{ ...prevState.errors, date: "Required Field" }
            }))
        }
        if(!state.asset){
            flag = -1;
            setState(prevState => ({
                ...prevState,
                errors:{ ...prevState.errors, asset: "Required Field" }
            }))
        }
        if(!state.hashtag || !state.hashtag.trim()){
            flag = -1;
            setState(prevState => ({
                ...prevState,
                errors:{ ...prevState.errors, hashtag: "Required Field" }
            }))
        } else{
            if( state.hashtag[0] != "#" ){
                flag = -1;
                setState(prevState => ({
                    ...prevState,
                    errors:{ ...prevState.errors, hashtag: "Tag name should start with '#'" }
                }))
            }
        }
        if(flag < 1){
            return false;
        }
        setState(prevState => ({
            ...prevState,
            errors: null
        }))
        return true;
    }

    const getTwitterReport = async () => {
        if(validateForm()){
            try{
                dispatch(setLoader(true));
                const asset = assets.find((item) => item.symbol == state.asset);
                const response = await getTweets({
                    from: state.from.toISOString(),
                    to: state.to.toISOString(),
                    hashtag: state.hashtag.trim().toUpperCase()
                })
                if (response && response.data) {
                    const sortedResponse = parseTweetResp(response.data).sort((a, b) => (a.noOfTweets < b.noOfTweets) ? 1 : -1);
                    setState(prevState => ({
                        ...prevState,
                        tableData: sortedResponse,
                        selectedAsset: asset
                    }))
                }
            } catch(error){
            }
            finally{
                dispatch(setLoader(false));
            }
        }
    }

    const handleChangeChecked = (event) => {
        const { selectedAsset } = state;
        let tableItems = [];
        tableItems = [...state.tableData];
        tableItems.forEach(item => {
            item.amount = 0;
        })
        if(event.target.checked){
            for(var i = 0; i < selectedAsset.balance; i++){
                if(!tableItems[i])
                    break;
                tableItems[i].amount = 1;
            }
        } 
        setState(prevState => ({
            ...prevState,
            distribute: event.target.checked,
            tableData: tableItems,
            airdropDisable: !event.target.checked
        }))
    };

    const airDrop = async () => {
        const { selectedAsset } = state;
        let usersToReward = [];
        if( state.distribute ){
            usersToReward = state.tableData.slice(0, selectedAsset.balance);
            usersToReward = usersToReward.map(user => {
                user.amount = 1
                return user
              })
        } else{
            usersToReward = state.tableData.filter(tweet => (tweet.amount && tweet.amount > 0));
        }
        try{
            dispatch(setLoader(true));
            const res = await runLoopTransfer(usersToReward, user.username, privateKeys, selectedAsset.asset_type);
            dispatch(getMyNfts());
            setState(prevState => ({
                ...prevState,
                tableErrors: false,
                airdropDisable: true,
                distribute: false
            }));
            snackbar.success("Assets rewarded successfully", 5000, "right", "bottom");
        } catch(error){
            snackbar.error("Assets transfer failed", 3000,"right", "bottom" );
        } finally{
            dispatch(setLoader(false));
            
            let tableItems = [...state.tableData];
            tableItems.forEach(item => {
                item.amount = 0;
            })
            setState(prevState => ({
                ...prevState,
                tableData: tableItems
            }))
        }
    }

    const tableInputValidation = (records, asset) => {
        let totalAmount = records.reduce((acc,item) => acc + Number(item.amount), 0);  
        if(totalAmount != 0 &&  totalAmount <= asset.balance){
            setState(prevState => ({
                ...prevState,
                airdropDisable: false,
                tableErrors: false
            }))
        } else{
            setState(prevState => ({
                ...prevState,
                airdropDisable: true,
                tableErrors: totalAmount != 0 
            }))
        }
    }
    const inputHandler = (e, index) => {
        const re = /^[0-9\b]+$/;
        const { selectedAsset } = state;
        let tableItems = [...state.tableData];
        const tableRow = tableItems[index];
        let item = { ...tableRow }
        if(e.target.value === '' || re.test(e.target.value)){
            item.amount = e.target.value;
        }
        tableItems[index] = item;
        tableInputValidation(tableItems, selectedAsset);
        setState(prevState => ({
            ...prevState,
            tableData: tableItems
        }))
    }
    return (
        <div className={classes.TwitterTags_root}>
            {/*{*/}
            {/*    !user.twitter_id ?*/}
            {/*    <div>*/}
            {/*    <Typography variant="h4">Connect your Twitter account</Typography>*/}
            {/*        <div className={classes.TwitterTags_connectTwitter} onClick={updateUserTwitter}>*/}
            {/*            <div className={classes.TwitterTags_textWrapper}>*/}
            {/*            <div className={classes.TwitterTags_twitterRound}>*/}
            {/*                <TwitterIcon className={classes.TwitterTags_twitterIcon}/>*/}
            {/*            </div>*/}
            {/*            <Typography className={classes.TwitterTags_twitterText} display="block" variant="h5">Connect Twitter</Typography>*/}
            {/*            </div>*/}
            {/*            <ArrowRightAltIcon />*/}
            {/*        </div>*/}
            {/*    </div> : */}
                <div>
                    <Typography variant="h4">Monitor #tags</Typography>
                    <Grid container spacing={3} className={classes.TwitterTags_formGrid}>
                        <Grid item md={6} xs={12} className={classes.TwitterTags_grid1}>
                            <div className={classes.responsiveMargin}>
                                <Typography className={classes.TwitterTags_formLabel} display="block" variant="caption">TAG NAME</Typography>
                                <InputField className={classes.TwitterTags_formInput} onChange={formValuesChangeHandler} value={state.hashtag} name="hashtag" error={ state.errors?.hashtag } helperText={state.errors?.hashtag ? state.errors.hashtag : null } placeholder={'#xHashtag'}/>
                            </div>
                            <div className={classes.responsiveMargin}>
                                <Typography className={classes.TwitterTags_formLabel} display="block" variant="caption">Which asset do you want to airdrop?</Typography>
                                <StaticSelect className={classes.TwitterTags_formInput} onChange={formValuesChangeHandler} name="asset" placeholder={'Choose Asset'} data={assetSelectOptions} value={state.asset} error={state.errors?.asset} helperText={state.errors?.asset ? state.errors.asset : null }  />
                            </div>
                            <div className={classes.TwitterTags_dateWrap}>
                                <div className={classes.TwitterTags_datesGridContainer}>
                                    <div className={classes.TwitterTags_datesGridChild}>
                                        <Typography className={classes.TwitterTags_formLabel} display="block" variant="caption">Start Date</Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker autoOk={true} value={state.from} className={classes.TwitterTags_datePicker} disableFuture inputVariant="outlined"  variant="inline" onChange={(date) => formValuesChangeHandler(date, "from")} emptyLabel={"dd-mm-yyyy"} format={"dd-MM-yyyy"}/>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className={classes.TwitterTags_datesGridChild}>
                                        <Typography className={cn(classes.TwitterTags_formLabel, classes.TwitterTags_marginResponsive)} display="block" variant="caption">End Date</Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker autoOk={true} value={state.to} className={classes.TwitterTags_datePicker} disableFuture inputVariant="outlined" variant="inline" onChange={(date) => formValuesChangeHandler(date, "to")} emptyLabel={"dd-mm-yyyy"} format={"dd-MM-yyyy"}/>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                                {state.errors?.date ? <Box  mt={1} fontSize={12} fontWeight={"bold"} style={{ color: "#E52828"}}>{state.errors?.date}</Box> : null }
                            </div>
                            <div className={classes.TwitterTags_buttonWrap}>
                                <CustomButton className={classes.TwitterTags_formButton} onClick={getTwitterReport}>Get Report</CustomButton>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12} className={classes.TwitterTags_grid2}>
                            <div className={classes.TwitterTags_secondCol}>
                                <Paper elevation={1} className={classes.TwitterTags_paperInfo}>
                                    <Typography variant="h6">Connected Twitter Account</Typography>
                                    <Typography className={classes.TwitterTags_name}>{user.twitter?.username}</Typography>
                                </Paper>
                            </div>
                        </Grid>
                        { state.tableData && 
                        <Grid item md={12} className={classes.TwitterTags_grid3}>
                            <TwitterTable 
                                tableData={ state.tableData } 
                                checkboxData={ state.distribute } 
                                checkBoxChange={handleChangeChecked} 
                                airDrop={airDrop} 
                                airdropDisable={state.airdropDisable} 
                                inputHandler={inputHandler} 
                                selectedAsset={state.selectedAsset}
                                tableErrors={state.tableErrors}
                            />
                        </Grid>
                        }
                    </Grid>
                </div>
            {/*}*/}
        </div>
    )
}

TwitterTags.propTypes = {

}

export default TwitterTags;
