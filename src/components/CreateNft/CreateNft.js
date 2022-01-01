import React, { useState } from "react";
import { Typography, makeStyles, RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core'
import InputField from "../helperComponents/inputField";
import StaticSelect from "../helperComponents/staticSelect";
import CustomButton from "../helperComponents/customButton";
// import RadioGroup from "../helperComponents/customRadioButtonGroup";
import imageUploadIcon from "../../assets/img/imageUpload.svg";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import TagsSelect from "./CreatableSelect";
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    CreateNft_uploadText:{
        marginTop: 30,
        fontWeight: 500
    },
    CreateNft_uploadSubtext:{
        color: "#777E91",
        marginTop: 5
    },
    CreateNft_formLabel:{
        fontWeight: "bold",
        color: "#B1B5C3",
        marginBottom: 12,
        textTransform: "uppercase"
    },
    CreateNft_formInput:{
        width: "80%",
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    CreateNft_inputGroup:{
        marginTop: 15,
        display: 'flex',
        justifyContent: "space-between",
        width: "80%",
        [theme.breakpoints.down('sm')]:{
            width: "100%",
            flexDirection:"column"
        }
    },
    CreateNft_formSelect:{
        width: "100%"
    },
    CreateNft_select:{
        width: "25%",
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    CreateNft_imageBlock:{
        height: 150,
        background: "#23262F",
        width: "90%",
        marginTop: 10,
        borderRadius: 16,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
        "&:hover":{
            background: "#393c44"
        },
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    CreateNft_img:{
        display:"block"
    },
    CreateNft_inputItem:{
        '&:first-child':{
            width:"75%",
            [theme.breakpoints.down('sm')]:{
                width: "100%"
            }
        },
        '&:last-child':{
            width:"25%",
            [theme.breakpoints.down('sm')]:{
                width: "100%"
            }
        }
    },
    CreateNft_buttonWrap:{
        marginTop: 24
    },
    CreateNft_formButton:{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.black,
        padding:"16px 24px",
        borderRadius: 90,
        border:`1px solid ${theme.palette.primary.main}`,
        "&:hover":{
            border:`1px solid ${theme.palette.primary.light}`,
            backgroundColor: theme.palette.primary.light,
        }
    },
    CreateNft_formRadio:{
        color: "#B1B5C3",
    },
      CreateNft_formRadioChecked:{
          color: theme.palette.primary.main,
    },
    CreateNft_formRadioGroup:{
        display: "flex",
        width: "80%",
        height: 65,
        [theme.breakpoints.down('sm')]:{
            width: "100%",
            flexDirection: "column",
            height: "auto"
        }
    },
    CreateNft_formRadioInput:{
        width: "78%",
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    CreateNft_uploadGrid:{
        width: "87%",
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    }
}));

const CreateNft = props => {
    const [value, setValue] = useState('0');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const classes = useStyles();
    const typeSelectData = [{ name: "Music", value:"Music", disabled: false }, { name: "Video", value:"Video", disabled: false },{ name: "Art", value:"Art", disabled: false } ];
    const marketSelectData = [{ name: "BTCNFT", value:"BTCNFT", disabled: false }];
    const rightsSelectData = [{name: "Reserved", value:"Reserved"}, {name: "Disowned", value:"Disowned"}];
    const genreSelectData = [{ name: "Pop", value:"Pop", disabled: false }, { name: "Hip", value:"Hip", disabled: false },{ name: "Video", value:"Video", disabled: false }];
    const copiesRadioData = [{value: "Single"}, {value: "Multiple"}];
    return (
        <div>
            <Typography variant="h4">Create a new NFT</Typography>
            <Grid container className={classes.CreateNft_uploadGrid} spacing={3}>
                <Grid item xs={6}>  
                    <div>
                        <Typography className={classes.CreateNft_uploadText} display="block" >Content</Typography>
                        <Typography className={classes.CreateNft_uploadSubtext} variant="caption">Drag or choose your file to upload</Typography>
                        <div className={classes.CreateNft_imageBlock}>
                            <img className={classes.CreateNft_img} src={imageUploadIcon} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>  
                    <div>
                        <Typography className={classes.CreateNft_uploadText} display="block" >Thumbnail</Typography>
                        <Typography className={classes.CreateNft_uploadSubtext} variant="caption">Drag or choose your file to upload</Typography>
                        <div className={classes.CreateNft_imageBlock}>
                            <img className={classes.CreateNft_img} src={imageUploadIcon} />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Typography className={classes.CreateNft_uploadText} display="block">Item Details</Typography>
            <div style={{ marginTop: 28 }}>
                <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">NFT NAME</Typography>
                <InputField className={classes.CreateNft_formInput} placeholder={'e. g. "Redeemable Bitcoin Card with logo"'}/>
            </div>
            <div style={{ marginTop: 15 }}>
                <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Title</Typography>
                <InputField className={classes.CreateNft_formInput} placeholder={'e. g. "Redeemable Bitcoin Card with logo"'}/>
            </div>
            <div style={{ marginTop: 15 }}>
                <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">DESCRIPTION</Typography>
                <InputField className={classes.CreateNft_formInput} placeholder={'e. g. “After purchasing you will able to recived the logo...”'}/>
            </div>
            <div style={{ marginTop: 15 }}>
                <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Copies</Typography>
                <div className={classes.CreateNft_formRadioGroup}>
                    <FormControl component="fieldset" style={{marginTop: 4}}>
                        <RadioGroup aria-label="gender" row  name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="0" control={<Radio color="default" classes={{root: classes.CreateNft_formRadio, checked: classes.CreateNft_formRadioChecked}} />} label="Single" />
                            <FormControlLabel value="1" control={<Radio color="default" classes={{root: classes.CreateNft_formRadio, checked: classes.CreateNft_formRadioChecked}}/>} label="Multiple" />
                        </RadioGroup>
                    </FormControl>
                { value == "1" ? 
                <div style={{marginLeft: "6%"}}>
                    <InputField placeholder={"No. of copies"} className={classes.CreateNft_formRadioInput}/>
                </div>
                : null}
                </div>
            </div>
            <div className={classes.CreateNft_inputGroup}>
                <div className={classes.CreateNft_select}>
                    <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Market</Typography>
                    <StaticSelect  placeholder={"Market"} data={marketSelectData} className={classes.CreateNft_formSelect}/>
                </div>
                <div className={classes.CreateNft_select}>
                    <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Type</Typography>
                    <StaticSelect  placeholder={"Type"} data={typeSelectData} className={classes.CreateNft_formSelect} />
                </div>
                <div className={classes.CreateNft_select}>
                    <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Genre</Typography>
                    <StaticSelect  placeholder={"Genre"} data={genreSelectData} className={classes.CreateNft_formSelect} />
                </div>
            </div>
            <div style={{ marginTop: 15 }}>
                <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Tags</Typography>
                <TagsSelect />
            </div>
            <Typography style={{ marginTop: 28 }} className={classes.CreateNft_formLabel} display="block" variant="caption">Input these to attest this content</Typography>
            <div className={classes.CreateNft_inputGroup}>
                <div className={classes.CreateNft_inputItem}>
                    <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Name</Typography>
                    <InputField className={classes.CreateNft_formInput} placeholder={'Attest the name to the content'}/>
                </div>
                <div className={classes.CreateNft_inputItem}>
                    <Typography className={classes.CreateNft_formLabel} display="block" variant="caption">Rights</Typography>
                    <StaticSelect  placeholder={"Rights"} data={rightsSelectData} className={classes.CreateNft_formSelect} />
                </div>
            </div>
            <div className={classes.CreateNft_buttonWrap}>
                <CustomButton className={classes.CreateNft_formButton} endIcon={<ArrowRightAltIcon/>}>Create Item</CustomButton>
            </div>
        </div>
    )
}

CreateNft.propTypes = {

}

export default CreateNft;
