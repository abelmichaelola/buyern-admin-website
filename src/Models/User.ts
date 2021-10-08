interface User {
  // location?: Location;
  uid?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  country?: string;
  state?: string;
  city?: string;
  image?: string;
  zipCode?: number;
  accessJWT?: string;
  theme?: string;
}

export default User;
