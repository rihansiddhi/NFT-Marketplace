const assetInfoStyles = (theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
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
  description: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  tags: {
    backgroundColor: '#E6E8EC',
    color: '#23262F',
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginLeft: '10px',
    fontWeight: 'bold',
    '&:focus-within, &:hover:not($disabled)': {
      backgroundColor: '#E6E8EC',
      color: '#23262F',
    },
  },
  genre: {
    backgroundColor: '#E6E8EC',
    color: '#23262F',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '4px',
    '&:focus-within, &:hover:not($disabled)': {
      backgroundColor: '#E6E8EC',
      color: '#23262F',
    },
  },
  attestation: {
    border: `2px solid #777E91`,
    borderRadius: '10px',
    padding: 10,
    marginTop: 25,
  },
  card: {
    display: 'block',
    margin: 'auto',
    background: "#141416",
    border: "1px solid #353945",
    boxShadow: "0px 64px 64px -48px rgba(31, 47, 70, 0.12)",
    borderRadius: 16,
    transition: 'transform .5s ease',
    cursor: 'default',
    '&:hover:not($disabled)': {
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
  },
  divider: {
    backgroundColor: '#353945',
    height: '1px',
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

export default assetInfoStyles;