const myNftCardStyles = (theme) => ({
  header: {
    padding: '16px 16px 0px',
  },
  media: {
    maxHeight: '254px',
    width: 'auto',
    display: 'block',
    margin: 'auto',
    background: theme.palette.common.black,
    borderRadius: '25px',
    objectFit: 'contain',
    padding: 12,
  },
  title: {
    fontSize: 14,
  },
  card: {
    background: theme.palette.common.black,
    maxWidth: '260px',
    display: 'block',
    margin: 'auto',
    // transition: 'transform .5s ease',
    boxShadow: 'none',
    // '&:hover:not($disabled)': {
    //   transform: 'scale(1.1)',
    //   boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    // },
  },
  chip: {
    border: `2px solid ${theme.palette.common.success}`,
    color: theme.palette.common.success,
    borderRadius: '4px',
    fontSize: '12px',
    background: 'inherit',
    fontWeight: 'bold',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
  issuer: {
    color: '#F4F5F6',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'inherit',
    fontWeight: 'bold',
    paddingBottom: '15px',
    marginLeft: '-7px',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
  transfer: {
    color: theme.palette.common.text,
    borderRadius: '16px',
    fontSize: '12px',
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:focus-within, &:active, &:hover:not($disabled)': {
      backgroundColor: theme.palette.primary.light,
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      borderRadius: '16px',
    }
  },
  total_runs: {
    border: `2px solid #E6E8EC`,
    color: '#E6E8EC',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'inherit',
    fontWeight: 'bold',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
  Legendary: {
    border: 'none',
    color: '#FF8C00',
    borderRadius: '4px',
    fontSize: '14px',
    background: 'inherit',
    fontWeight: 'bold',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
  Epic: {
    border: 'none',
    color: '#CF9FFF',
    borderRadius: '4px',
    fontSize: '14px',
    background: 'inherit',
    fontWeight: 'bold',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
  Rare: {
    border: 'none',
    color: '#00FF00',
    borderRadius: '4px',
    fontSize: '14px',
    background: 'inherit',
    fontWeight: 'bold',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
  Common: {
    border: 'none',
    color: '#FFFFFF',
    borderRadius: '4px',
    fontSize: '14px',
    background: 'inherit',
    fontWeight: 'bold',
    '&:hover:not($disabled)': {
      background: 'inherit',
    }
  },
});

export default myNftCardStyles;