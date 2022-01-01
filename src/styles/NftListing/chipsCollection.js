const chipsCollectionStyles = {
  selected: {
    backgroundColor: '#E6E8EC',
    color: '#23262F',
    fontFamily: 'Poppins',
    fontSize: '14px',
    marginLeft: '12px',
    fontWeight: 'bold',
    '&:focus-within, &:hover:not($disabled)': {
      backgroundColor: '#E6E8EC',
      color: '#23262F',
    },
  },
  default: {
    color: '#777E90',
    background: 'none',
    marginLeft: '20px',
    fontWeight: 'bold',
    '&:focus-within, &:hover:not($disabled)': {
      backgroundColor: '#23262F',
      color: '#FCFCFD',
    },
  },
};

export default chipsCollectionStyles;