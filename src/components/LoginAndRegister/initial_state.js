const login_initial_state = () => ({
  platform: '',
  username: '',
  password: '',
  errors: {},
  // rememberMe: true,
});

const register_initial_state = () => ({
  twitter: {
    username: '',
    twitter_secret: '',
    twitter_token: '',
  },
  // username: '',
  // email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  // name: '',
  errors: {},
});

export { login_initial_state, register_initial_state };