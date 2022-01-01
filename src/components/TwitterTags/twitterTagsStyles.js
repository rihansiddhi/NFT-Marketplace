import { makeStyles } from '@material-ui/core';

const twitterTagsStyles = makeStyles((theme) => ({
    TwitterTags_root:{
        marginTop: 50,
        [theme.breakpoints.down('sm')]:{
            marginTop: 28
        }
    },
    TwitterTags_connectTwitter:{
        display: "flex",
        width: 544,
        height: 128,
        justifyContent:"space-around",
        alignItems: "center",
        border: "2px solid #353945",
        borderRadius: 16,
        marginTop: 80,
        cursor: "pointer",
        "&:hover":{
            background: "#393c44"
        },
        [theme.breakpoints.down('sm')]:{
            marginTop: 28
        }
    },
    TwitterTags_twitterRound:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        background: "#1DA1F2",
        width: 64,
        height: 64,
    },
    TwitterTags_twitterText:{
        marginLeft: 32
    },
    TwitterTags_textWrapper:{
        display: 'flex',
        alignItems: "center"
    },
    TwitterTags_formLabel:{
        width:"80%",
        fontWeight: "bold",
        color: "#B1B5C3",
        marginBottom: 12,
        textTransform: "uppercase"
    },
    TwitterTags_formInput:{
        width: "80%",
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    TwitterTags_formGrid:{

    },
    TwitterTags_dateWrap:{
        marginTop: 28,
        [theme.breakpoints.down('sm')]:{
            marginTop: 10,
        }
    },
    TwitterTags_buttonWrap:{
        marginTop: 50
    },
    TwitterTags_formButton:{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.text,
        padding:"16px 24px",
        borderRadius: 90,
        border:`1px solid ${theme.palette.primary.main}`,
        "&:hover":{
            border:`1px solid ${theme.palette.primary.light}`,
            backgroundColor: theme.palette.primary.light,
        }
    },
    TwitterTags_datePicker:{
        width: "auto",
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    TwitterTags_datesGridContainer:{
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]:{
            width: "100%",
            display:"block"
        }
    },
    TwitterTags_paperInfo:{
        width: "60%",
        background:"#23262F",
        boxShadow: "0px 64px 64px -48px rgba(31, 47, 70, 0.12)",
        borderRadius: 16,
        padding: "20px",
        marginTop: 25,
        [theme.breakpoints.down('sm')]:{
            width: "100%"
        }
    },
    TwitterTags_secondCol:{
        display: "flex",
        justifyContent: "flex-end"
    },
    TwitterTags_name:{
        color: theme.palette.primary.main
    },
    TwitterTags_marginResponsive:{
        [theme.breakpoints.down('sm')]:{
            marginTop: 28
        }
    },
    TwitterTags_grid1:{
        order: 1,
        [theme.breakpoints.down('sm')]:{
            order: 2,
        }
    },
    TwitterTags_grid2:{
        order: 2,
        [theme.breakpoints.down('sm')]:{
            order: 1,
        }
    },
    TwitterTags_grid3:{
        order: 3,
        [theme.breakpoints.down('sm')]:{
            order: 3,
        }
    },
    responsiveMargin:{ 
        marginTop: 28,
        [theme.breakpoints.down('sm')]:{
            marginTop: 10,
        }
    },
    TwitterTags_datesGridChild:{
        width: 210,
        [theme.breakpoints.down('sm')]:{
            width: "100%",
        }
    }
}));

export default twitterTagsStyles;