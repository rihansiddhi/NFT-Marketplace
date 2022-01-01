import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
      minWidth: 650,
    },
    TwitterTable_inputRoot:{
      width: "50%",
      border:"none",
      borderRadius: 0,
      borderBottom: "2px solid #aaa",
      "&:hover":{
        borderRadius: 0
      }
    },
    TwitterTable_TableContainer:{
      background: "#141416",
      border: "2px solid #353945",
      marginTop: 10,
      [theme.breakpoints.down('sm')]:{
        overflowX: "auto",
        width:"80vw"
      }
    },
    TwitterTable_TableCell:{
      borderBottom: "2px solid #1a1a1a",
      [theme.breakpoints.down('sm')]:{
        paddingTop: 5,
        paddingBottom: 5
      }
    },
    TwitterTable_TableHeadCell:{
      borderBottom: "2px solid #333",
    },
    TwitterTable_formControl:{
      display: "block",
      paddingBottom: 0
    },
    TwitterTags_formButton:{
      color: "white",
      padding:"16px 24px",
      borderRadius: 90,
      width:"20%",
      [theme.breakpoints.down('sm')]:{
        display: "none"
      }
  },
  TwitterTags_buttonWrap:{
    display:"flex",
    justifyContent: "space-between",
    alignItems:"flex-end"
  },
  TwitterTable_infoText:{
  
  },
  TwitterTable_noResults:{
    textAlign: "center",
    padding:"50px 0"
  },
  TwitterTable_label:{
    fontWeight:"300"
  },
    TwitterTable_balance:{
      color: theme.palette.primary.main
    },
    TwitterTable_buttonResponsive:{
      display:"none",
      [theme.breakpoints.down('sm')]:{
        display: "block",
        width: "100%",
        marginTop:50
      }
    },
    TwitterTable_formInput:{
      height: 38
    }
  }));

  export default useStyles;