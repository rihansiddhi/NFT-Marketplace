const assetContainerStyles = (theme) => ({
  backButton: {
    fontSize: 20,
    marginTop: 20,
    color: theme.palette.primary.main,
  },
  assetView: {
    display: 'block',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
      paddingTop: '25px !important',
      paddingBottom: '10px !important',
    },
  },
  assetInfo: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: '0px !important',
    },
  },
});

export default assetContainerStyles;