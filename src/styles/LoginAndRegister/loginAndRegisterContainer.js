const loginAndRegisterContainerStyles = (theme) => ({
  logo: {
    maxWidth: 300,
    display: 'block',
    margin: 'auto',
    padding: '24px 0px',
  },
  card: {
    maxWidth: '450px',
    display: "table",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.common.darkBlack,
    borderRadius: '20px',
    boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
    border: '1px solid #23262F',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '30px',
    paddingBottom: '30px',
    height: '100vh',
    alignItems: 'center',
  },
});

export default loginAndRegisterContainerStyles;