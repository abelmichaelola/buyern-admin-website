import User from "./../Models/User";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Component } from "react";
import FirebaseConnect from "./../Functions/FirebaseConnect";
// import {
//   // collection,
//   // getDocs,
//   // QuerySnapshot,
//   DocumentData,
//   // QueryDocumentSnapshot,
//   // DocumentReference,
//   getDoc,
//   doc,
//   DocumentSnapshot,
// } from "@firebase/firestore";

enum DataSource {
  LOCAL = 0,
  SERVER = 1,
}
class UserController {
  firebaseConnect: FirebaseConnect = new FirebaseConnect();
  userId = "wRr28oofmMPM47rUgQefteXVMLO2";
  tempUser: User = {
    uid: this.userId,
    firstName: "Mayowa",
    lastName: "Obisesan",
    email: "mayoroflagos@gmail.com",
    image: "http://localhost/profileImage.jpg",
    coverImage: "http://localhost/bg.jpg",
    accessJWT: "fugigaherughiuerhagruaidhgiruea",
    theme: "light",
    financeId: "financeId",
    location: {
      address: "21, Alaka street Shasha Lagos",
      address2: "",
      city: "Shasha",
      country: "Nigeria",
      state: "Lagos",
      zipCode: 34282,
      latLng: {
        latitude: 22.378536,
        longitude: 53.57438,
      },
    },
  };

  cookies: Cookies = new Cookies();
  connectFirebase = () => {};
  getUser = (source?: DataSource, id?: string): User | undefined => {
    var fromServer = (): User | undefined => {
      // const firestoredB = this.firebaseConnect.firestore;
      //getUser
      this.saveUserDetailsLocally(this.tempUser);
      return this.tempUser;
      // const usersCol = collection(firestoredB, "users");
      // const docRef = doc(firestoredB, "users", this.userId);
      // const docUserPrivateRef = doc(
      //   firestoredB,
      //   "users",
      //   this.userId,
      //   "details",
      //   "private"
      // );
      // getDoc(docUserPrivateRef)
      //   .then((value: DocumentSnapshot<DocumentData>) => {
      //     if (value.exists()) {
      //       console.log(value.data());

      //       var user: User = value.data() as User;
      //       user.uid = this.userId;
      //       //save user data locally
      //       this.saveUserDetailsLocally(user);
      //       //continue
      //       return user;
      //     } else {
      //       return undefined;
      //     }
      //   })
      //   .catch((reason: any) => {
      //     console.log(reason);
      //     return undefined;
      //   });
      // return undefined;
    };

    const fromLocal = () => {
      // this.cookies.get("activeUser");
      // this.cookies.remove("theme");
      // this.cookies.remove("USER:private");
      var uid: string = this.cookies.get("activeUser");
      // if (!uid) {
      //   // redirect to select user page
      //   // console.log("select user");
      //   console.log("login Again");
      //   return;
      // }
      // get user details
      var user: User = this.cookies.get("USER:" + uid);
      if (!user) {
        // redirect to login page
        //get user details from server if still logged in
        return fromServer();
      }
      // this.cookies.remove("theme");
      // this.cookies.remove("activeUser");
      // this.cookies.remove("USER:" + this.userId);

      return user;
    };
    try {
      switch (source) {
        case DataSource.LOCAL:
          return fromLocal();
        case DataSource.SERVER:
          return fromServer();
        default:
          return fromLocal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  saveUserDetailsLocally = (user: User) => {
    this.cookies.set("USER:" + user.uid, {
      ...user,
    });
    this.cookies.set("theme", "dark");
    this.cookies.set("activeUser", user.uid);
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
  isLoggedIn = (component?: Component) => {
    var uid: string = this.cookies.get("activeUser");
    if (!uid) {
      if (component) {
        component.setState({ redirect: "signin" });
      }
      return false;
    }
    return true;
    // var user: User = this.cookies.get(uid);
    // if (!user) {
    //   if (component) {
    //     component.setState({ redirect: "signin" });
    //   }
    //   return false;
    // }
    // return true;
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
