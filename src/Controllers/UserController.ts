import User from "./../Models/User";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Component } from "react";
import FirebaseConnect from './../Functions/FirebaseConnect';

enum DataSource {
  LOCAL = 0,
  SERVER = 1,
}
class UserController {
  firebaseConnect: FirebaseConnect = new FirebaseConnect();
  cookies: Cookies = new Cookies();
  connectFirebase = () => {};
  getUser = (source?: DataSource, id?: string): User | undefined => {
    function fromServer(): User {
      var user: User = {};
      //save user data locally
      //continue
      return user;
    }
    const fromLocal = () => {
      var uid: string = this.cookies.get("activeUser");

      var user: User = this.cookies.get(uid);

      return user;
    };
    try {
      switch (source) {
        case DataSource.LOCAL:
          return fromLocal();
        case DataSource.SERVER:
          return fromServer();
        default:
          return fromLocal() ? fromLocal() : fromServer();
      }
    } catch (error) {
      console.log(error);
    }
  };
  getActiveUserId = (): string => {
    return this.cookies.get("activeUser");
  };
  setActiveUser = (uid: string) => {
    this.cookies.set("activeUser", uid);
  };
  setLocalUser = (uid: string, userData: any, theme?: any) => {
    this.cookies.set(uid, {
      ...userData,
      theme: theme,
    });
    this.cookies.set("theme", theme);
    this.cookies.set("activeUser", uid);
  };
  isLoggedIn = (component: Component) => {
    var uid: string = this.cookies.get("activeUser");
    if (!uid) {
      if (component) {
        component.setState({ redirect: "signin" });
      }
      return false;
    }
    var user: User = this.cookies.get(uid);
    if (!user) {
      if (component) {
        component.setState({ redirect: "signin" });
      }
      return false;
    }
    return true;
  };
  getUserCookie = (uid: string, con: Component) => {
    return this.cookies.get(uid);
  };
  getTheme = (con?: any): string => {
    // const uid: string = this.getActiveUserId();
    // var userCookie = this.cookies.get(uid);
    // if (!userCookie) {
    //   if (con) {
    //     con.setState({ redirect: "/signin" });
    //   }
    //   return this.cookies.get("theme");
    // }
    // return userCookie.theme ? userCookie.theme : this.cookies.get("theme");
    return this.cookies.get("theme") ? this.cookies.get("theme") : "light";
  };
  setTheme = (theme: string) => {
    this.connectFirebase();
    this.cookies.set("theme", theme);
    const uid: string = this.getActiveUserId();
    var userCookie = this.cookies.get(uid);
    if (!userCookie) {
      return;
    }
    userCookie.theme = theme;
    this.cookies.set(uid, userCookie);
    console.log(this.getUser()?.theme);
  };

  logoutUser = (callback?: Function) => {
    const uid: string = this.getActiveUserId();
    console.log("====================================");
    this.cookies.remove(uid);
    this.cookies.remove("activeUser");
    console.log(this.cookies.getAll());
    if (callback) {
      callback();
    }
  };
  SignOut = (callback?: Function) => {
    axios
      .post(process.env.REACT_APP_SERVER_ENDPOINT_HOST + "/user/signout")
      .then((response: any) => {
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
        if (response.data.status) {
          this.logoutUser(callback);
        }
      });
  };

  SignIn = (payload: FormData, callback: Function) => {
    axios
      .post(
        process.env.REACT_APP_SERVER_ENDPOINT_HOST + "/user/login",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            withCredentials: true,
          },
        }
      )
      .then((response: any) => {
        var data = response.data;
        // (response.status === 200)
        //  {
        //   console.log('====================================');
        //   console.log(data.message);
        //   console.log('====================================');
        // }
        if (!data.status) {
          console.log("====================================");
          console.log(data);
          console.log("====================================");
          if (data.code === 101) {
            callback(false, data.message);
            return;
          }
          return;
        }
        this.setLocalUser(
          data.response.user.uid,
          data.response.user,
          data.response.theme
        );
        callback(true);
      });
  };
}
export { UserController, DataSource };
