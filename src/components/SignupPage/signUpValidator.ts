import axios from "axios";

const emailOnChange = (value: any, context: any) => {
  var emailErrMsg, emailGood;
  emailGood = false;
  if (value.length < 1) {
    emailErrMsg = "Eail can't ba empty";
    emailGood = false;
  } else if (!value.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)) {
    // value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    emailErrMsg = "Incorrect Email format (aaaa@aaa.aaa)";
    emailGood = false;
  } else {
    checkEmailRegisterationStatus(context, value);
  }
  context.setState({
    email: value,
    emailErrMsg: emailErrMsg,
    emailGood: emailGood,
  });
};

function checkEmailRegisterationStatus(context: any, email: string) {
  context.setState({
    emailErrMsg: "loading",
    emailGood: false,
  });
  axios
    .get(
      process.env.REACT_APP_SERVER_ENDPOINT_HOST +
        "/user/isUserRegistered/email/" +
        email,
      {}
    )
    .then((response) => {
      if (response.data.registered) {
        context.setState({
          emailErrMsg: response.data.message,
          emailGood: false,
        });
        return;
      } else {
        context.setState({
          emailErrMsg: undefined,
          emailGood: true,
        });
      }
    });
}
const passwordOnChange = (value: any, context: any) => {
  var passwordErrMsg, passwordGood;
  passwordGood = false;
  var CPasswordErrMsg, CPasswordisGood;
  CPasswordErrMsg = context.state.cPasswordErrMsg;
  CPasswordisGood = context.state.CPasswordisGood;
  var newState: Object;
  if (value.length < 10) {
    passwordErrMsg = "Error: must be > 10 characters";
    passwordGood = false;
  } else {
    passwordGood = true;
  }
  if (value === context.state.cPassword) {
    CPasswordisGood = true;
  } else {
    CPasswordErrMsg = "Error: passwords dont match";
    CPasswordisGood = false;
  }
  newState = {
    password: value,
    passwordErrMsg: passwordErrMsg,
    passwordGood: passwordGood,
    cPasswordErrMsg: CPasswordErrMsg,
    cPasswordGood: CPasswordisGood,
  };
  context.setState(newState);
};
const confirmPasswordOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value !== context.state.password) {
    ErrMsg = "Error: passwords dont match";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    cPassword: value,
    cPasswordErrMsg: ErrMsg,
    cPasswordGood: isGood,
  });
};
const firstNameOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    firstName: value,
    firstNameErrMsg: ErrMsg,
    firstNameGood: isGood,
  });
};
const lastNameOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    lastName: value,
    lastNameErrMsg: ErrMsg,
    lastNameGood: isGood,
  });
};
const dobOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;
console.log('====================================');
console.log(value);
console.log('====================================');
  if (!value) {
    context.setState({
      dobErrMsg: "Error: can't be empty",
      dobGood: isGood,
    });
    return;
  }
  const dateArray: any = value.split("-");
  var year = dateArray[0] ? dateArray[0] : "";
  var month = dateArray[1] ? dateArray[1] : "";
  var day = dateArray[2] ? dateArray[2] : "";
  var currentDate = new Date();

  var maxYear = currentDate.getFullYear() - 18 + "";
  var maxMonth = (currentDate.getMonth() + 1) + "";
  if (maxMonth.length === 1) {
    maxMonth = "0" + maxMonth;
  }
  var maxDay = (currentDate.getDate()) + "";
  if (maxDay.length === 1) {
    maxDay = "0" + maxDay;
  }
  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  }
  if (year < maxYear) {
    isGood = true;
  } else if (maxYear === year) {
    if (month < maxMonth) {
      isGood = true;
    } else if (month === maxMonth) {
      if (day <= maxDay) {
        isGood = true;
      } else {
        ErrMsg = "Error: must be older than 18";
        isGood = false;
      }
    } else {
      ErrMsg = "Error: must be older than 18";
      isGood = false;
    }
  } else {
    ErrMsg = "Error: must be older than 18";
    isGood = false;
  }

  context.setState({
    year: year,
    month: month,
    day: day,
    dob: value,
    dobErrMsg: ErrMsg,
    dobGood: isGood,
  });
};
const phoneCodeOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    phoneCode: value,
    phoneCodeErrMsg: ErrMsg,
    phoneCodeGood: isGood,
  });
};
const phoneOnChange = (value: any, context: any) => {
  const valueNum = +value;
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else if (isNaN(valueNum)) {
    ErrMsg = "Error: must be a number";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    phone: value,
    phoneErrMsg: ErrMsg,
    phoneGood: isGood,
  });
};
const addressOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    address: value,
    addressErrMsg: ErrMsg,
    addressGood: isGood,
  });
};
const address2OnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = true;

  context.setState({
    address2: value,
    address2ErrMsg: ErrMsg,
    address2Good: isGood,
  });
};
const zipCodeOnChange = (value: any, context: any) => {
  const valueNum = +value;
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else if (isNaN(valueNum)) {
    ErrMsg = "Error: must be a number";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    zipCode: value,
    zipCodeErrMsg: ErrMsg,
    zipCodeGood: isGood,
  });
};
const countryOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    country: value,
    countryErrMsg: ErrMsg,
    countryGood: isGood,
  });
};
const stateOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    state: value,
    stateErrMsg: ErrMsg,
    stateGood: isGood,
  });
};
const cityOnChange = (value: any, context: any) => {
  var ErrMsg, isGood;
  isGood = false;

  if (value.length < 1) {
    ErrMsg = "Error: can't be empty";
    isGood = false;
  } else {
    isGood = true;
  }
  context.setState({
    city: value,
    cityErrMsg: ErrMsg,
    cityGood: isGood,
  });
};

export {
  emailOnChange,
  passwordOnChange,
  confirmPasswordOnChange,
  firstNameOnChange,
  lastNameOnChange,
  dobOnChange,
  phoneCodeOnChange,
  phoneOnChange,
  addressOnChange,
  address2OnChange,
  zipCodeOnChange,
  countryOnChange,
  stateOnChange,
  cityOnChange,
};
