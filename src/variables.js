const theme = {
  orange: '#ff9f1c',
  lightOrange: '#ffbf69',
  lighterOrange: '#FFD599',
  lightBlue: '#cbf3f0',
  blue: '#2ec4b6',
  darkbrown: '#412403',
};

const headerConfig = {
  mobile_height: '50px',
  computer_height: '50px',
};

const footerConfig = {
  mobile_height: '40px',
  computer_height: '50px',
};

const mainContentConfig = {
  mobile_height: `calc( 100vh - ${headerConfig.mobile_height} - ${footerConfig.mobile_height})`,
  computer_height: `calc( 100vh - ${headerConfig.computer_height} )`,
};

export { theme, headerConfig, footerConfig, mainContentConfig };
