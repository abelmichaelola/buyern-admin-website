import styles from './SignupPage.module.scss';
import React, { ChangeEvent, Component } from 'react';
import { BiImageAdd, BiInfoCircle, BiQuestionMark, BiTrashAlt } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { address2OnChange, addressOnChange, cityOnChange, confirmPasswordOnChange, countryOnChange, dobOnChange, emailOnChange, firstNameOnChange, lastNameOnChange, passwordOnChange, phoneCodeOnChange, phoneOnChange, stateOnChange, zipCodeOnChange } from './signUpValidator';
import axios from 'axios';
import OverlayPageView from '../ui/OverlayPageView/OverlayPageView';
import UserContext from '../../Contexts/UserContext';
interface Props {
  history?: any;
  match?: any;
  location?: any;
}
interface State {
  email: string;
  emailErrMsg?: string;
  emailGood?: boolean;

  password: string;
  passwordErrMsg?: string;
  passwordGood?: boolean;

  cPassword: string;
  cPasswordErrMsg?: string;
  cPasswordGood?: boolean;

  firstName: string;
  firstNameErrMsg?: string;
  firstNameGood?: boolean;

  lastName: string;
  lastNameErrMsg?: string;
  lastNameGood?: boolean;


  phoneCode: string;
  phoneCodeErrMsg?: string;
  phoneCodeGood?: boolean;

  phone: string;
  phoneErrMsg?: string;
  phoneGood?: boolean;

  year: string;
  month: string;
  day: string;
  dob: string;
  dobErrMsg?: string;
  dobGood?: boolean;

  address: string;
  addressErrMsg?: string;
  addressGood?: boolean;

  address2: string;
  address2ErrMsg?: string;
  address2Good?: boolean;

  zipCode: string;
  zipCodeGood?: boolean;
  zipCodeErrMsg?: string;

  country: string;
  countryGood?: boolean;
  countryErrMsg?: string;

  state: string;
  stateGood?: boolean;
  stateErrMsg?: string;

  city: string;
  cityGood?: boolean;
  cityErrMsg?: string;


  isImageSelected?: boolean;
  imageName?: string;
  image?: string | Blob;
  imageLocalLink?: any;
  isLoginDisabled?: boolean;
}

class SignupPage extends Component<Props, State> {
  selectImageRef?: any;
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
  constructor(props: Props) {
    super(props);
    var currentDate = new Date();
    var maxYear = currentDate.getFullYear() - 18 + "";
    var maxMonth = (currentDate.getMonth() + 1) + "";
    var maxDay = (currentDate.getDate()) + "";
    if (maxMonth.length === 1) {
      maxMonth = "0" + maxMonth;
    }
    if (maxDay.length === 1) {
      maxDay = "0" + maxDay;
    }
    this.state = {
      phoneCode: "NG",
      country: "NG",
      dob: maxYear + "-" + maxMonth + "-" + maxDay,
      emailErrMsg: "",
      passwordErrMsg: "",
      cPasswordErrMsg: "",
      addressErrMsg: "",
      address2ErrMsg: "",
      zipCodeErrMsg: "",
      countryErrMsg: "",
      stateErrMsg: "",
      cityErrMsg: "",
      firstNameErrMsg: "",
      lastNameErrMsg: "",
      phoneCodeErrMsg: "",
      phoneErrMsg: "",
      dobErrMsg: "",
      emailGood: false,
      firstNameGood: false,
      lastNameGood: false,
      passwordGood: false,
      cPasswordGood: false,
      dobGood: true,
      phoneCodeGood: true,
      phoneGood: false,
      addressGood: false,
      address2Good: true,
      zipCodeGood: false,
      countryGood: true,
      stateGood: false,
      cityGood: false,
      email: "",
      password: "",
      cPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      year: maxYear,
      month: maxMonth,
      day: maxDay,
      address: "",
      address2: "",
      zipCode: "",
      state: "",
      city: "",

      isImageSelected: false,
      isLoginDisabled: true,
    };
  }
  imageOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {

      console.log('====================================');
      console.log(event.target.files[0].type);
      console.log('====================================');
      if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") {
        this.deselectImage();
        return alert("only Images (jpeg, png) are allowed");
      }
      // convert file to string:  URL.createObjectURL(file)
      this.setState({
        image: event.target.files[0],
        imageLocalLink: URL.createObjectURL(event.target.files[0]),
        imageName: event.target.files[0].name,
        isImageSelected: true
      });

    }

  }
  handleImgFocus = (event: any) => {
    if (event.key === " " || event.key === "Enter") {
      this.performImageClick();
    }
  }

  deselectImage = () => {
    this.setState({
      isImageSelected: false,
      imageLocalLink: undefined,
      image: undefined,
      imageName: undefined
    });
  }
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any) {
    if (!nextState.emailGood || !nextState.passwordGood || !nextState.firstNameGood || !nextState.lastNameGood || !nextState.cPasswordGood
      || !nextState.dobGood || !nextState.phoneCodeGood || !nextState.phoneGood || !nextState.addressGood || !nextState.address2Good
      || !nextState.zipCodeGood || !nextState.countryGood || !nextState.stateGood || !nextState.cityGood || !nextState.isImageSelected) {
      if (nextState.isLoginDisabled) {
        return true;
      }
      this.setState({ isLoginDisabled: true });
    } else if (nextState.emailGood && nextState.passwordGood && nextState.firstNameGood && nextState.lastNameGood && nextState.cPasswordGood
      && nextState.dobGood && nextState.phoneCodeGood && nextState.phoneGood && nextState.addressGood && nextState.address2Good
      && nextState.zipCodeGood && nextState.countryGood && nextState.stateGood && nextState.cityGood && nextState.isImageSelected) {
      if (!nextState.isLoginDisabled) {
        return true;
      }
      this.setState({ isLoginDisabled: false });
    }

    return true;
  }
  checkLoginBtn = () => {
    console.log('====================================');
    console.log(this.state);
    console.log('====================================');
    if (this.state.emailGood && this.state.firstNameGood && this.state.lastNameGood && this.state.passwordGood && this.state.cPasswordGood
      && this.state.dobGood && this.state.phoneCodeGood && this.state.phoneGood && this.state.addressGood && this.state.address2Good
      && this.state.zipCodeGood && this.state.countryGood && this.state.stateGood && this.state.cityGood && this.state.isImageSelected) {
      this.setState({ isLoginDisabled: false });
    } else {
      this.setState({ isLoginDisabled: true });
    }
  }

  signUp = (event: any) => {
    event.preventDefault();
    var payload: FormData = new FormData();
    payload.append("email", this.state.email);
    payload.append("firstName", this.state.firstName);
    payload.append("lastName", this.state.lastName);
    payload.append("password", this.state.password);
    payload.append("dob", this.state.dob);
    payload.append("year", this.state.year);
    payload.append("month", this.state.month);
    payload.append("day", this.state.day);
    payload.append("phoneCode", this.state.phoneCode);
    payload.append("phone", this.state.phone);
    payload.append("address", this.state.address);
    payload.append("address2", this.state.address2);
    payload.append("zipCode", this.state.zipCode);
    payload.append("state", this.state.state);
    payload.append("city", this.state.city);
    payload.append("country", this.state.country);
    if (this.state.image) {
      payload.append("image", this.state.image, this.state.imageName);
    } else {
      return;
    }

    axios.post(process.env.REACT_APP_SERVER_ENDPOINT_HOST + "/user/register", payload, { withCredentials: true }).then(response => {
      // console.log(response);
      var data = response.data;
      // (response.status === 200)
      //  {
      //   console.log('====================================');
      //   console.log(data.message);
      //   console.log('====================================');
      // }
      if (!data.status) {
        console.log('====================================');
        console.log(data.message);
        console.log('====================================');
      }
      this.context.setLocalUser(data.response.user.uid, data.response.user, data.response.theme);
      this.props.history.push("/");
    });
  }

  performImageClick() {
    this.selectImageRef.click();
  }
  render() {
    return (
      <OverlayPageView >
        <div className={styles.SignupPage + " " + styles.main + " scrollbarHandle"}>
          <div className={styles.titles}>
            <div>
              <div className={"TitleHolder1"}>BUYERN</div>
              <div className={"TitleHolder1"}>ADMIN REGISTRATION</div>
            </div>
          </div>

          {/* <form action={process.env.SERVER_ENDPOINT_HOST + "/user/register"} method={'POST'} encType={'multipart/form-data'}> */}
          <form>

            <div className={styles.formItem}>
              <div className={"TitleHolder2"}>Personal Details</div>
            </div>
            <div className={styles.formItem}>
              <label><span>*</span> Email: </label>
              <input type={"text"} id={"email"} name={"email"} placeholder={"Email"} required={true} defaultValue={this.state.email} onChange={(event: ChangeEvent<HTMLInputElement>) => { emailOnChange(event.target.value, this) }} />
              <span className={styles.ErrorMsg}>{this.state.emailErrMsg !== undefined ? this.state.emailErrMsg : ""}</span>
            </div>
            <div className={styles.formItemsH}>
              <div className={styles.formItem}>
                <label><span>*</span> FirstName: </label>
                <input type={"text"} id={"firstName"} name={"firstName"} placeholder={"First Name"} onChange={(event: ChangeEvent<HTMLInputElement>) => { firstNameOnChange(event.target.value, this) }} required={true} />
                <span className={styles.ErrorMsg}>{this.state.firstNameErrMsg !== undefined ? this.state.firstNameErrMsg : ""}</span>
              </div>
              <div className={styles.formItem}>
                <label><span>*</span> LastName: </label>
                <input type={"text"} id={"lastName"} name={"lastName"} placeholder={"Last Name"} onChange={(event: ChangeEvent<HTMLInputElement>) => { lastNameOnChange(event.target.value, this) }} required={true} />
                <span className={styles.ErrorMsg}>{this.state.lastNameErrMsg !== undefined ? this.state.lastNameErrMsg : ""}</span>
              </div>
            </div>

            <div className={styles.formItemsH}>
              <div className={styles.formItem}>
                <label><span>*</span> Password: </label>
                <input type={"password"} id={"password"} name={"password"} placeholder={"Password"} required={true} onChange={(event: ChangeEvent<HTMLInputElement>) => { passwordOnChange(event.target.value, this) }} />
                <span className={styles.ErrorMsg}>{this.state.passwordErrMsg !== undefined ? this.state.passwordErrMsg : ""}</span>
              </div>
              <div className={styles.formItem}>
                <label><span>*</span> Confirm Password: </label>
                <input type={"password"} id={"cpassword"} name={"cpassword"} placeholder={"Confirm Password"} required={true} onChange={(event: ChangeEvent<HTMLInputElement>) => { confirmPasswordOnChange(event.target.value, this) }} />
                <span className={styles.ErrorMsg}>{this.state.cPasswordErrMsg !== undefined ? this.state.cPasswordErrMsg : ""}</span>
              </div>
            </div>


            <div className={styles.formItem}>
              <label><span>*</span> Date Of: </label>
              <input type={"date"} id={"dob"} name={"dob"} placeholder={"lastName"} required={true} defaultValue={this.state.dob} onChange={(event: ChangeEvent<HTMLInputElement>) => { dobOnChange(event.target.value, this) }} />
              <span className={styles.ErrorMsg}>{this.state.dobErrMsg !== undefined ? this.state.dobErrMsg : ""}</span>
            </div>


            <div className={styles.formItemsH}>
              <div className={styles.formItem + " " + styles.phoneCode}>
                <label><span>*</span> Phone code: </label>
                <select id="phoneCode" name="phoneCode" onChange={(event: ChangeEvent<HTMLSelectElement>) => { phoneCodeOnChange(event.target.value, this) }} value={this.state.phoneCode}>
                  <option value="AF">Afghanistan (+93)</option>
                  <option value="AL">Albania (+355)</option>
                  <option value="DZ">Algeria (+213)</option>
                  <option value="AS">American Samoa (+1-684)</option>
                  <option value="AD">Andorra (+376)</option>
                  <option value="AO">Angola (+244)</option>
                  <option value="AI">Anguilla (+1-264)</option>
                  <option value="AQ">Antarctica (+672)</option>
                  <option value="AG">Antigua and Barbuda (+1-268)</option>
                  <option value="AR">Argentina (+54)</option>
                  <option value="AM">Armenia (+374)</option>
                  <option value="AW">Aruba (+297)</option>
                  <option value="AU">Australia (+61)</option>
                  <option value="AT">Austria (+43)</option>
                  <option value="AZ">Azerbaijan (+994)</option>
                  <option value="BS">Bahamas (+1-242)</option>
                  <option value="BH">Bahrain (+973)</option>
                  <option value="BD">Bangladesh (+880)</option>
                  <option value="BB">Barbados (+1-246)</option>
                  <option value="BY">Belarus (+375)</option>
                  <option value="BE">Belgium (+32)</option>
                  <option value="BZ">Belize (+501)</option>
                  <option value="BJ">Benin (+229)</option>
                  <option value="BM">Bermuda (+1-441)</option>
                  <option value="BT">Bhutan (+975)</option>
                  <option value="BO">Bolivia (+591)</option>
                  <option value="BA">Bosnia and Herzegovina (+387)</option>
                  <option value="BW">Botswana (+267)</option>
                  <option value="BR">Brazil (+55)</option>
                  <option value="IO">British Indian Ocean Territory (+246)</option>
                  <option value="VG">British Virgin Islands (+1-284)</option>
                  <option value="BN">Brunei (+673)</option>
                  <option value="BG">Bulgaria (+359)</option>
                  <option value="BF">Burkina Faso (+226)</option>
                  <option value="BI">Burundi (+257)</option>
                  <option value="KH">Cambodia (+855)</option>
                  <option value="CM">Cameroon (+237)</option>
                  <option value="CA">Canada (+1)</option>
                  <option value="CV">Cape Verde (+238)</option>
                  <option value="KY">Cayman Islands (+1-345)</option>
                  <option value="CF">Central African Republic (+236)</option>
                  <option value="TD">Chad (+235)</option>
                  <option value="CL">Chile (+56)</option>
                  <option value="CN">China (+86)</option>
                  <option value="CX">Christmas Island (+61)</option>
                  <option value="CC">Cocos Islands (+61)</option>
                  <option value="CO">Colombia (+57)</option>
                  <option value="KM">Comoros (+269)</option>
                  <option value="CK">Cook Islands (+682)</option>
                  <option value="CR">Costa Rica (+506)</option>
                  <option value="HR">Croatia (+385)</option>
                  <option value="CU">Cuba (+53)</option>
                  <option value="CW">Curacao (+599)</option>
                  <option value="CY">Cyprus (+357)</option>
                  <option value="CZ">Czech Republic (+420)</option>
                  <option value="CD">Democratic Republic of the Congo (+243)</option>
                  <option value="DK">Denmark (+45)</option>
                  <option value="DJ">Djibouti (+253)</option>
                  <option value="DM">Dominica (+1-767)</option>
                  <option value="DO">Dominican Republic (+"1-809 (+ 1-829 (+ 1-849")</option>
                  <option value="TL">East Timor (+670)</option>
                  <option value="EC">Ecuador (+593)</option>
                  <option value="EG">Egypt (+20)</option>
                  <option value="SV">El Salvador (+503)</option>
                  <option value="GQ">Equatorial Guinea (+240)</option>
                  <option value="ER">Eritrea (+291)</option>
                  <option value="EE">Estonia (+372)</option>
                  <option value="ET">Ethiopia (+251)</option>
                  <option value="FK">Falkland Islands (+500)</option>
                  <option value="FO">Faroe Islands (+298)</option>
                  <option value="FJ">Fiji (+679)</option>
                  <option value="FI">Finland (+358)</option>
                  <option value="FR">France (+33)</option>
                  <option value="PF">French Polynesia (+689)</option>
                  <option value="GA">Gabon (+241)</option>
                  <option value="GM">Gambia (+220)</option>
                  <option value="GE">Georgia (+995)</option>
                  <option value="DE">Germany (+49)</option>
                  <option value="GH">Ghana (+233)</option>
                  <option value="GI">Gibraltar (+350)</option>
                  <option value="GR">Greece (+30)</option>
                  <option value="GL">Greenland (+299)</option>
                  <option value="GD">Grenada (+1-473)</option>
                  <option value="GU">Guam (+1-671)</option>
                  <option value="GT">Guatemala (+502)</option>
                  <option value="GG">Guernsey (+44-1481)</option>
                  <option value="GN">Guinea (+224)</option>
                  <option value="GW">Guinea-Bissau (+245)</option>
                  <option value="GY">Guyana (+592)</option>
                  <option value="HT">Haiti (+509)</option>
                  <option value="HN">Honduras (+504)</option>
                  <option value="HK">Hong Kong (+852)</option>
                  <option value="HU">Hungary (+36)</option>
                  <option value="IS">Iceland (+354)</option>
                  <option value="IN">India (+91)</option>
                  <option value="ID">Indonesia (+62)</option>
                  <option value="IR">Iran (+98)</option>
                  <option value="IQ">Iraq (+964)</option>
                  <option value="IE">Ireland (+353)</option>
                  <option value="IM">Isle of Man (+44-1624)</option>
                  <option value="IL">Israel (+972)</option>
                  <option value="IT">Italy (+39)</option>
                  <option value="CI">Ivory Coast (+225)</option>
                  <option value="JM">Jamaica (+1-876)</option>
                  <option value="JP">Japan (+81)</option>
                  <option value="JE">Jersey (+44-1534)</option>
                  <option value="JO">Jordan (+962)</option>
                  <option value="KZ">Kazakhstan (+7)</option>
                  <option value="KE">Kenya (+254)</option>
                  <option value="KI">Kiribati (+686)</option>
                  <option value="XK">Kosovo (+383)</option>
                  <option value="KW">Kuwait (+965)</option>
                  <option value="KG">Kyrgyzstan (+996)</option>
                  <option value="LA">Laos (+856)</option>
                  <option value="LV">Latvia (+371)</option>
                  <option value="LB">Lebanon (+961)</option>
                  <option value="LS">Lesotho (+266)</option>
                  <option value="LR">Liberia (+231)</option>
                  <option value="LY">Libya (+218)</option>
                  <option value="LI">Liechtenstein (+423)</option>
                  <option value="LT">Lithuania (+370)</option>
                  <option value="LU">Luxembourg (+352)</option>
                  <option value="MO">Macau (+853)</option>
                  <option value="MK">Macedonia (+389)</option>
                  <option value="MG">Madagascar (+261)</option>
                  <option value="MW">Malawi (+265)</option>
                  <option value="MY">Malaysia (+60)</option>
                  <option value="MV">Maldives (+960)</option>
                  <option value="ML">Mali (+223)</option>
                  <option value="MT">Malta (+356)</option>
                  <option value="MH">Marshall Islands (+692)</option>
                  <option value="MR">Mauritania (+222)</option>
                  <option value="MU">Mauritius (+230)</option>
                  <option value="YT">Mayotte (+262)</option>
                  <option value="MX">Mexico (+52)</option>
                  <option value="FM">Micronesia (+691)</option>
                  <option value="MD">Moldova (+373)</option>
                  <option value="MC">Monaco (+377)</option>
                  <option value="MN">Mongolia (+976)</option>
                  <option value="ME">Montenegro (+382)</option>
                  <option value="MS">Montserrat (+1-664)</option>
                  <option value="MA">Morocco (+212)</option>
                  <option value="MZ">Mozambique (+258)</option>
                  <option value="MM">Myanmar (+95)</option>
                  <option value="NA">Namibia (+264)</option>
                  <option value="NR">Nauru (+674)</option>
                  <option value="NP">Nepal (+977)</option>
                  <option value="NL">Netherlands (+31)</option>
                  <option value="AN">Netherlands Antilles (+599)</option>
                  <option value="NC">New Caledonia (+687)</option>
                  <option value="NZ">New Zealand (+64)</option>
                  <option value="NI">Nicaragua (+505)</option>
                  <option value="NE">Niger (+227)</option>
                  <option value="NG">Nigeria (+234)</option>
                  <option value="NU">Niue (+683)</option>
                  <option value="KP">North Korea (+850)</option>
                  <option value="MP">Northern Mariana Islands (+1-670)</option>
                  <option value="NO">Norway (+47)</option>
                  <option value="OM">Oman (+968)</option>
                  <option value="PK">Pakistan (+92)</option>
                  <option value="PW">Palau (+680)</option>
                  <option value="PS">Palestine (+970)</option>
                  <option value="PA">Panama (+507)</option>
                  <option value="PG">Papua New Guinea (+675)</option>
                  <option value="PY">Paraguay (+595)</option>
                  <option value="PE">Peru (+51)</option>
                  <option value="PH">Philippines (+63)</option>
                  <option value="PN">Pitcairn (+64)</option>
                  <option value="PL">Poland (+48)</option>
                  <option value="PT">Portugal (+351)</option>
                  <option value="PR">Puerto Rico (+"1-787 (+ 1-939")</option>
                  <option value="QA">Qatar (+974)</option>
                  <option value="CG">Republic of the Congo (+242)</option>
                  <option value="RE">Reunion (+262)</option>
                  <option value="RO">Romania (+40)</option>
                  <option value="RU">Russia (+7)</option>
                  <option value="RW">Rwanda (+250)</option>
                  <option value="BL">Saint Barthelemy (+590)</option>
                  <option value="SH">Saint Helena (+290)</option>
                  <option value="KN">Saint Kitts and Nevis (+1-869)</option>
                  <option value="LC">Saint Lucia (+1-758)</option>
                  <option value="MF">Saint Martin (+590)</option>
                  <option value="PM">Saint Pierre and Miquelon (+508)</option>
                  <option value="VC">Saint Vincent and the Grenadines (+1-784)</option>
                  <option value="WS">Samoa (+685)</option>
                  <option value="SM">San Marino (+378)</option>
                  <option value="ST">Sao Tome and Principe (+239)</option>
                  <option value="SA">Saudi Arabia (+966)</option>
                  <option value="SN">Senegal (+221)</option>
                  <option value="RS">Serbia (+381)</option>
                  <option value="SC">Seychelles (+248)</option>
                  <option value="SL">Sierra Leone (+232)</option>
                  <option value="SG">Singapore (+65)</option>
                  <option value="SX">Sint Maarten (+1-721)</option>
                  <option value="SK">Slovakia (+421)</option>
                  <option value="SI">Slovenia (+386)</option>
                  <option value="SB">Solomon Islands (+677)</option>
                  <option value="SO">Somalia (+252)</option>
                  <option value="ZA">South Africa (+27)</option>
                  <option value="KR">South Korea (+82)</option>
                  <option value="SS">South Sudan (+211)</option>
                  <option value="ES">Spain (+34)</option>
                  <option value="LK">Sri Lanka (+94)</option>
                  <option value="SD">Sudan (+249)</option>
                  <option value="SR">Suriname (+597)</option>
                  <option value="SJ">Svalbard and Jan Mayen (+47)</option>
                  <option value="SZ">Swaziland (+268)</option>
                  <option value="SE">Sweden (+46)</option>
                  <option value="CH">Switzerland (+41)</option>
                  <option value="SY">Syria (+963)</option>
                  <option value="TW">Taiwan (+886)</option>
                  <option value="TJ">Tajikistan (+992)</option>
                  <option value="TZ">Tanzania (+255)</option>
                  <option value="TH">Thailand (+66)</option>
                  <option value="TG">Togo (+228)</option>
                  <option value="TK">Tokelau (+690)</option>
                  <option value="TO">Tonga (+676)</option>
                  <option value="TT">Trinidad and Tobago (+1-868)</option>
                  <option value="TN">Tunisia (+216)</option>
                  <option value="TR">Turkey (+90)</option>
                  <option value="TM">Turkmenistan (+993)</option>
                  <option value="TC">Turks and Caicos Islands (+1-649)</option>
                  <option value="TV">Tuvalu (+688)</option>
                  <option value="VI">U.S. Virgin Islands (+1-340)</option>
                  <option value="UG">Uganda (+256)</option>
                  <option value="UA">Ukraine (+380)</option>
                  <option value="AE">United Arab Emirates (+971)</option>
                  <option value="GB">United Kingdom (+44)</option>
                  <option value="US">United States (+1)</option>
                  <option value="UY">Uruguay (+598)</option>
                  <option value="UZ">Uzbekistan (+998)</option>
                  <option value="VU">Vanuatu (+678)</option>
                  <option value="VA">Vatican (+379)</option>
                  <option value="VE">Venezuela (+58)</option>
                  <option value="VN">Vietnam (+84)</option>
                  <option value="WF">Wallis and Futuna (+681)</option>
                  <option value="EH">Western Sahara (+212)</option>
                  <option value="YE">Yemen (+967)</option>
                  <option value="ZM">Zambia (+260)</option>
                  <option value="ZW">Zimbabwe (+263)</option>
                  <option value="RESERVED">Reserved: 970</option>
                </select>
                <span className={styles.ErrorMsg}>{this.state.phoneCodeErrMsg !== undefined ? this.state.phoneCodeErrMsg : ""}</span>
              </div>
              <div className={styles.formItem}>
                <label><span>*</span> Phone: </label>
                <input type={"number"} id={"phone"} name={"phone"} placeholder={"Phone"} onChange={(event: ChangeEvent<HTMLInputElement>) => { phoneOnChange(event.target.value, this) }} required={true} />
                <span className={styles.ErrorMsg}>{this.state.phoneErrMsg !== undefined ? this.state.phoneErrMsg : ""}</span>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={"TitleHolder2"}>Location Details</div>
            </div>

            <div className={styles.formItem}>
              <label><span>*</span> Address1: </label>
              <input type={"text"} id={"address"} name={"address"} placeholder={"Address"} onChange={(event: ChangeEvent<HTMLInputElement>) => { addressOnChange(event.target.value, this) }} required={true} />
              <span className={styles.ErrorMsg}>{this.state.addressErrMsg !== undefined ? this.state.addressErrMsg : ""}</span>
            </div>

            <div className={styles.formItem}>
              <label>Address2: </label>
              <input type={"text"} id={"address2"} name={"address2"} placeholder={"address2"} onChange={(event: ChangeEvent<HTMLInputElement>) => { address2OnChange(event.target.value, this) }} />
              <span className={styles.ErrorMsg}>{this.state.address2ErrMsg !== undefined ? this.state.address2ErrMsg : ""}</span>
            </div>

            <div className={styles.formItem}>
              <label><span>*</span> Zip Code: </label>
              <input type={"number"} id={"zipCode"} name={"zipCode"} placeholder={"Zip Code"} onChange={(event: ChangeEvent<HTMLInputElement>) => { zipCodeOnChange(event.target.value, this) }} required={true} />
              <span className={styles.ErrorMsg}>{this.state.zipCodeErrMsg !== undefined ? this.state.zipCodeErrMsg : ""}</span>
            </div>

            <div className={styles.formItem + " " + styles.phoneCode}>
              <label><span>*</span> Select Country: </label>
              <select id="country" value={this.state.country} onChange={(event: ChangeEvent<HTMLSelectElement>) => { countryOnChange(event.target.value, this) }} name="country" >
                <option value="AF">Afghanistan</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="VG">British Virgin Islands</option>
                <option value="BN">Brunei</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon </option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde </option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic </option>
                <option value="TD">Chad </option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curacao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="CD">Democratic Republic of the Congo</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="TL">East Timor</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="PF">French Polynesia</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="CI">Ivory Coast</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Laos</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macau</option>
                <option value="MK">Macedonia</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius </option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia</option>
                <option value="MD">Moldova</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria </option>
                <option value="NU">Niue</option>
                <option value="KP">North Korea</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestine</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="CG">Republic of the Congo</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russia</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe </option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="KR">South Korea</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syria</option>
                <option value="TW">Taiwan</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania</option>
                <option value="TH">Thailand</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="VI">U.S. Virgin Islands</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className={styles.formItem}>
              <label><span>*</span> State: </label>
              <input type={"text"} id={"state"} name={"state"} placeholder={"State"} onChange={(event: ChangeEvent<HTMLInputElement>) => { stateOnChange(event.target.value, this) }} required={true} />
              <span className={styles.ErrorMsg}>{this.state.stateErrMsg !== undefined ? this.state.stateErrMsg : ""}</span>
            </div>
            <div className={styles.formItem}>
              <label><span>*</span> City: </label>
              <input type={"text"} id={"city"} name={"city"} placeholder={"City"} required={true} onChange={(event: ChangeEvent<HTMLInputElement>) => { cityOnChange(event.target.value, this) }} />
              <span className={styles.ErrorMsg}>{this.state.cityErrMsg !== undefined ? this.state.cityErrMsg : ""}</span>
            </div>


            <div className={styles.formItem}>
              <div className={"TitleHolder2"}><span style={{ color: "red" }}>*</span>Image Upload</div>
            </div>

            <div className={styles.formItem}>

              <div className={styles.image} onClick={this.performImageClick.bind(this)} tabIndex={0} onKeyDown={(event) => { this.handleImgFocus(event) }}>

                <img className={this.state.isImageSelected ? (styles.show) : (styles.hide)} src={this.state.imageLocalLink} id={"target"} alt={"profile"} />
                <div className={this.state.isImageSelected ? (styles.iconHolder + " " + styles.hide) : (styles.iconHolder + " " + styles.show)}><BiImageAdd /></div>
              </div>
              <input type={"file"} id={"image"} name={"image"} title={"Select Image"} required={true} ref={ref => { this.selectImageRef = ref }} onChange={this.imageOnChange} />
              <div className={this.state.isImageSelected ? styles.deleteButton : styles.deleteButton + " " + styles.hide} onClick={this.deselectImage}><BiTrashAlt /></div>
              {/* <span className={styles.ErrorMsg}>{this.state.emailErrMsg !== undefined ? this.state.emailErrMsg : ""}</span> */}
            </div>
            <div className={styles.formItem}>

              <div className={styles.blockIconButtonHolder}>
                <NavLink to={"/registerAdmin"}>

                  <div className={styles.blockIconButton}><BiInfoCircle />{/* <span>About Us</span> */}</div>

                </NavLink>
                |
                <div className={styles.blockIconButton} tabIndex={0}><BiQuestionMark /><span>Privacy Policy</span></div>

              </div>
            </div>
            {/* <Button text={"lol"} onClick={this.signUp} /> */}
            <div className={styles.formItem}>
              <input title={"Sign In"} type={"submit"} className={styles.LoginBtn} onClick={this.signUp} disabled={this.state.isLoginDisabled} />
              {/* <input title={"Sign In"} type={"submit"} className={styles.LoginBtn} disabled={this.state.isLoginDisabled} /> */}
            </div>
          </form>

        </div>
      </OverlayPageView>
    );
  }
}

export default SignupPage;
