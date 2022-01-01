const nftCardStyles = (theme) => ({
  media: {
    height: '303px',
    width: 'auto',
    background: '#CDB4DB',
    borderRadius: '16px',
    margin: 12,
    backgroundSize: 'contain',
  },
  card: {
    background: theme.palette.common.black,
    maxWidth: '260px',
    display: 'block',
    margin: 'auto',
    transition: 'transform .5s ease',
    '&:hover:not($disabled)': {
      transform: 'scale(1.1)',
    },
  },
});

export default nftCardStyles;