import React from 'react';
import { UserController } from '../Controllers/UserController';
const UserContext = React.createContext(new UserController());
export default UserContext;
// getUser
// removeUser
// updateUserLocally
