export const getMediaUrl = (type) => {
  switch(type) {
    case 'art':
      return process.env.REACT_APP_IMAGE_URL;
    case 'music':
      return process.env.REACT_APP_AUDIO_URL;
    case 'video':
      return process.env.REACT_APP_VIDEO_URL;
    default:
      return '';
  }
}

export const filterAssets = (assets) => {
  return assets.filter(asset => asset.balance > 0);
};

export const getRarity = (value) => {
  switch(true) {
    case (value >=0 && value <=10):
      return 'Legendary';
    case (value > 10 && value <= 50):
      return 'Epic';
    case (value > 50 && value <= 100):
      return 'Rare';
    default:
      return 'Common';
  }
};