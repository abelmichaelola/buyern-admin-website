import styles from './LoginPage.module.scss';
import React, { ChangeEvent, Component } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { BiQuestionMark, BiUser } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import OverlayPageView from '../ui/OverlayPageView/OverlayPageView';
import QuickNotification, { TYPE } from '../ui/QuickNotification/QuickNotification';
import UserContext from '../../Contexts/UserContext';
interface Props {
  history?: any;
  match?: any;
  location?: any;
}
interface State {
  email: string;
  password: string;
  emailErrMsg?: string;
  passwordErrMsg?: string;
  isLoginDisabled?: boolean;
  notification?: any;

  emailGood?: boolean;
  passwordGood?: boolean;
}
class LoginPage extends Component<Props, State> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;
  constructor(props: Props) {
    super(props);

    this.state = {
      email: 'abelmichaelola@gmail.com',
      password: '1111111111',
      emailErrMsg: "",
      passwordErrMsg: "",
      isLoginDisabled: true,
      emailGood: false,
      passwordGood: false,
    };
  }
  emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    var emailErrMsg, emailGood;
    emailGood = false;
    if (value.length < 1) {
      emailErrMsg = "Error: Email can't ba empty";
      emailGood = false;
    } else if (!value.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)) {
      // value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      emailErrMsg = "Error: Incorrect Email format (aaaa@aaa.aaa)";
      emailGood = false;
    } else {

      emailGood = true;
    }

    this.setState({
      email: value,
      emailErrMsg: emailErrMsg,
      emailGood: emailGood
    })
  }
  passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    var passwordErrMsg, passwordGood;
    passwordGood = false;

    if (value.length < 10) {
      passwordErrMsg = "Error: must be > 10 characters";
      passwordGood = false;
    } else {
      passwordGood = true;
    }
    this.setState({
      password: value,
      passwordErrMsg: passwordErrMsg,
      passwordGood: passwordGood
    })
  }
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any) {
    if (!nextState.emailGood || !nextState.passwordGood) {
      if (nextState.isLoginDisabled) {
        return true;
      }
      this.setState({ isLoginDisabled: true });
    } else if (nextState.emailGood && nextState.passwordGood) {
      if (!nextState.isLoginDisabled) {
        return true;
      }
      this.setState({ isLoginDisabled: false });
    }

    return true;
  }

  checkLoginBtn = () => {
    if (this.state.emailGood && this.state.passwordGood) {
      this.setState({ isLoginDisabled: false });
    } else {
      this.setState({ isLoginDisabled: true });
    }
  }
  login = (event: any) => {
    event.preventDefault();
    var payload: FormData = new FormData();
    payload.append("email", this.state.email);
    payload.append("password", this.state.password);
    this.showNotif(() => { }, "Signing in as: " + this.state.email, "", TYPE.LOADING, undefined);
    this.context.SignIn(payload, (isSuccess: boolean, message?: string) => {
      if (isSuccess) {
        this.hideNotif();
        this.props.history.push("/");
      } else {
        this.hideNotif();
        this.showNotif(() => { this.setState({ notification: undefined }) }, "Password Error", message, TYPE.DANGER, 2000 );
      }
    });
  }

  showNotif = (callback: Function, title?: string, subtitle?: string, type?: TYPE, duration: number = 0 ) => {
    this.setState({ notification: <QuickNotification type={type} title={title} duration={duration} subtitle={subtitle} callback={callback} /> })
  }
  hideNotif = () => {
    this.setState({ notification: undefined })
  }
  render() {
    return (
      // <div className={styles.LoginPage}>
      //   <div className={styles.backgroundExit} onClick={() => { this.props.history.goBack() }}></div>
      //   <div className={styles.mainView}>
      <OverlayPageView>
        <div className={styles.LoginPage + " " + styles.main}>

          <div className={"TitleHolder1"}>BUYERN</div>
          <div className={"TitleHolder1"}>ADMIN LOGIN</div>
          <form>
            <div className={styles.formItem}>
              <label><span>*</span> Email: </label>
              <input type={"text"} id={"email"} name={"email"} placeholder={"Email"} required={true} onChange={(event: ChangeEvent<HTMLInputElement>) => { this.emailOnChange(event) }} defaultValue={this.state.email} />
              <span className={styles.ErrorMsg}>{this.state.emailErrMsg !== undefined ? this.state.emailErrMsg : ""}</span>
            </div>

            <div className={styles.formItem}>
              <label><span>*</span> Password: </label>
              <input type={"password"} id={"password"} name={"password"} placeholder={"Password"} required={true} onChange={(event: ChangeEvent<HTMLInputElement>) => { this.passwordOnChange(event) }} defaultValue={this.state.password} />
              <span className={styles.ErrorMsg}>{this.state.passwordErrMsg !== undefined ? this.state.passwordErrMsg : ""}</span>
            </div>

            <div className={styles.formItem}>

              <div className={styles.blockIconButtonHolder}>
                <NavLink to={"/registerAdmin"}>

                  <div className={styles.blockIconButton}><FaSignOutAlt /><span>Register</span></div>
                </NavLink>
                |
                <div className={styles.blockIconButton}><BiQuestionMark /><span>Privacy Policy</span></div>
                |
                <div className={styles.blockIconButton} ><BiUser /><span>Forgot Password</span></div>

              </div>
            </div>
            <div className={styles.formItem}>
              <input title={"Sign In"} type={"submit"} className={styles.LoginBtn} onClick={this.login} disabled={this.state.isLoginDisabled} />
            </div>
          </form>
          {this.state.notification}

        </div>
      </OverlayPageView>
    );
  }
}

export default LoginPage;