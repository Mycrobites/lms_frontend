import { createContext, useState } from "react";

const UserContext = createContext();

const getUserDetails = () => {
  const user = localStorage.getItem("user-details");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};


export const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(getUserDetails);


  const updateUser = (data) => {
    setUserDetails(data);
    localStorage.setItem("user-details", JSON.stringify(data));
  };

  const removeUser = () => {
    setUserDetails(null);
    sessionStorage.clear();
    localStorage.clear();
  };


  

  return (
    <UserContext.Provider
      value={{
        userDetails,
        updateUser,
        removeUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
