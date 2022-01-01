import React from 'react'
import PropTypes from 'prop-types';
import NftCard from "../helperComponents/nftCard";
import { Container, makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    Preview_root:{
        display: "flex", 
        justifyContent: "flex-end",
        [theme.breakpoints.down('sm')]:{
            justifyContent: "center"
        }
    },
    Preview_text:{
        [theme.breakpoints.down('sm')]:{
            textAlign: "center",
            marginTop: 20
        }
    }
}));
const Preview = props => {
    const classes = useStyles();
    return (
        <div className={classes.Preview_root}>
            <div>
                <Typography variant="h4" className={classes.Preview_text} style={{ marginBottom: 30 }}>Preview</Typography>
                <NftCard />
            </div>           
        </div>
    )
}

Preview.propTypes = {

}

export default Preview;
