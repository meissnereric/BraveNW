import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log("User: ", user)
  // console.log("isAuth: " , isAuthenticated)
  // console.log("isLoading: ", isLoading)
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {console.log(user)}
      </div>
    ) || (
      <h1>PLEASE LOGIN </h1>
    )
  );
};

export default Profile