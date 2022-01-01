import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CreateNft from './CreateNft';
import Preview from './Preview';
import withNavbarHOC from "../Navbar/withNavbarHOC";

const useStyles = makeStyles((theme) => ({
    Wrapper_root:{
        marginTop: 100
    }
}));

const Wrapper = props => {
    // const [ state, setState ]  = useState({});
    const classes = useStyles();
    return (
        <div className={classes.Wrapper_root}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <CreateNft />
            </Grid>
            <Grid item xs={12} md={4}>
                <Preview />
            </Grid>
        </Grid>
        </div>
    )
}

Wrapper.propTypes = {

}

export default withNavbarHOC(Wrapper);
