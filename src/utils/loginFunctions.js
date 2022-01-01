import * as cryptojs from 'crypto-js';
import * as sdac from "museblockchain-js";
export const userOnFetch = (user) => {
  const { email = '', b_username: username = '', roles = null, twitter = null  } = user;
  const isAuthenticated = Boolean(username);
  return { email, username, roles, twitter, isAuthenticated };
};

export const validateEmail = (email) => {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(email);
};

export const validatePassword = (password) => {
  const pattern = new RegExp("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).*$");
  return pattern.test(password);
};

export const loginValidation = (loginState) => {
  const fieldsToValidate = ['platform', 'username', 'password'];
  const errors = {};
  let flag = true;
  fieldsToValidate.map(field => {
    if (!loginState[field]) {
      errors[field] = 'Required';
      flag = false;
    }
  });
  return { errors, flag }
};

export const registerValidation = (registerState) => {
  const fieldsToValidate = ['password', 'confirmPassword', 'acceptTerms'];
  const errors = {};
  let flag = true;
  fieldsToValidate.map(field => {
    if (!registerState[field]) {
      errors[field] = field === 'acceptTerms' ? 'Required' : 'Please agree to the terms and conditions before proceeding';
      flag = false;
    } else {
     switch(field) {
       case 'email':
         if (!validateEmail(registerState[field])) {
           errors.email = 'Please enter valid email address.';
           flag = false;
         }
         break;
       case 'password':
         if (!validatePassword(registerState[field])) {
           errors[field] = 'Password must contain at least one special character and one uppercase and lowercase letter, and at least 8 or more characters';
           flag = false;
         }
       case 'confirmPassword':
         if (registerState.password !== registerState.confirmPassword) {
           errors.confirmPassword = 'Password and Confirm Password does not match';
           flag = false;
         }
         break;
     }
    }
  });
  return { errors, flag }
};

function generateKey() {
    function S4() {
        return Math.floor((1 + Math.random()) * 0x1000)
                   .toString(16)
                   .substring(1);
    }
    return S4() + S4() + S4() + S4() + S4();
}

export const encryptPassword = (password) =>  {

  // Encryption
  const key = generateKey();
  const pass = cryptojs.AES.encrypt(password, key);

  
  return { key, pass };
}

export const decryptPassword = (encryptedPassword, key) => {
  return cryptojs.AES.decrypt(encryptedPassword, key).toString(cryptojs.enc.Utf8);
}

export const getPrivateKeys = (username, password) => {

  // Get Keys
  return new Promise(function (resolve, reject) {

    const keys = sdac.auth.getPrivateKeys(username, password, ['owner', 'active', 'basic', 'memo']);
    if (!keys) {
      reject('Failed to load keys.');
    }

    resolve(keys);

  }).catch((err) => {
    // this.alert.showErrorMessage('getPrivateKeys(): ' + err);
  });

}