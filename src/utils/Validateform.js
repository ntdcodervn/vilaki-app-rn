export const validateForm = (value, rules) => {
  let valid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired (value);
        break;
      case 'isEmail':
        valid = valid && validateEmail (value);
        break;
      case 'isLengthMobile':
        valid = valid && validateLength (value, 10);
        break;
      case 'isLengthId':
        valid = valid && validateLength (value, 9);
        break;
      default:
        valid = true;
        break;
    }
  }
  return valid;
};

const validateRequired = value => {
  if (value !== '') {
    return true;
  }
  return false;
};
const validateLength = (value, max) => {
  if (value.length <= max) {
    return true;
  }
  return false;
};

const validateEmail = email => {
  var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test (String (email).toLocaleLowerCase ());
};
