import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail, createUser } from "../../api/userApi";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [userInfo, setUserInfo] = useState(undefined)


  async function createNewUser(email: string) {
    await createUser({email: email}).then(res => {console.log(res)}) // TODO: change console.log for prod
  }

  async function getUserFromDb(email: string) {
    return await getUserByEmail(email).then(dbUserResponse => {
      if (dbUserResponse.data.error) {
        console.log(dbUserResponse.data.error) 
      }
      console.log("getUserFromDb: ", dbUserResponse.data)
      return(dbUserResponse.data)
    })
    
  }

  async function getOrCreateUserData(email: string) {
    // Query the db by user.email, if it's not found create corresponding document
    const dbQuery = await getUserFromDb(email)
    if (!dbQuery.success) {
      if (userInfo.error === "Document not found.") {
       createNewUser(email) // TODO: make this not assume a success
       return await getUserFromDb(email)
      }
    }
    if (!userInfo) {
      setUserInfo(dbQuery)
    }
    console.log("getOrCreateUserData: " , dbQuery)
    return dbQuery
  }

  if (isLoading) {
    return <div>Loading ..</div>;
  }

  if (isAuthenticated) {
    getOrCreateUserData(user.email)
    console.log("isAuthenticated: ", userInfo)
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{userInfo.data.email}</p>
      </div>
    ) || (
      <h1>PLEASE LOGIN</h1>
    )
  );
};

export default Profile