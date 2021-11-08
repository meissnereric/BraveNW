import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail } from "../../api/userApi"; // NOTE: this now handles get or create


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userInfo, setUserInfo] = useState(undefined)

  async function getOrCreateUserData(email: string) {
    if (isAuthenticated) {
      const dbQuery = await getUserByEmail(email)
      const success = dbQuery.data.success
      const userData = dbQuery.data.data
      if (success) {
        console.log("succesfully queried db: ", userData)
        if (!userInfo) {
          setUserInfo(userData)
        }
        console.log("set userInfo: ", userInfo)
      }
      console.log("getOrCreateUserData: ", dbQuery)
    }
  }
  const renderUserInfo = () => {
    console.log("renderUserInfo: ", userInfo)
    if (userInfo) {
      return <p>{userInfo.email}</p>
    }
  }

  if (isLoading) {
    return <div>Loading ..</div>;
  }

  getOrCreateUserData(user.email)

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        {renderUserInfo()}
      </div>
    ) || (
      <h1>PLEASE LOGIN.</h1>
    )
  );
};

export default Profile