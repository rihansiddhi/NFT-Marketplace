const customDialogStyles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 450,
    background: theme.palette.common.darkBlack,
    borderRadius: '20px',
    boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
    border: '1px solid #23262F',
  },
  actions: {
    padding: '25px 0px 15px 0px',
  }
});

export default customDialogStyles;