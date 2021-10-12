import Location from "./Location";

interface User {
  // location?: Location;
  uid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  coverImage?: string;
  accessJWT?: string;
  theme?: string;
  financeId?: string;
  location?: Location;
}

export default User;
