const backCardStyles = (theme) => ({
  card: {
    maxWidth: '600px',
  },
  media: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    // height: '600px',
    maxHeight: '600px',
    background: theme.palette.common.black,
    borderRadius: '12px',
    objectFit: 'contain',
    display: 'block',
    margin: 'auto',
  },
  video: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '600px',
    background: theme.palette.common.black,
    borderRadius: '12px',
    objectFit: 'contain',
    display: 'block',
    margin: 'auto',
  },
});
// [theme.breakpoints.down("sm")]: {
//   backgroundColor: theme.palette.secondary.main,
// },
// [theme.breakpoints.up("md")]: {
//   backgroundColor: theme.palette.primary.main,
// },
// [theme.breakpoints.up("lg")]: {
//   backgroundColor: "green",
// },
export default backCardStyles;