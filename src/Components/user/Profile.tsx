import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail, createUser } from "../../api/userApi";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ..</div>;
  }

  async function createNewUser(email: string) {
    await createUser({email: user.email}).then(res => {console.log(res)})
  }
  async function getUserData(email: string) {
    let success = false
    let userInfo
    await getUserByEmail(email).then(userData => {
      if(userData.data.error){
        console.log(userData.data.error)
      }
      success = userData.data.success
      if(!success){
        createNewUser(user.email)
      }
      userInfo = userData.data.data
      console.log(userInfo)
    })
  
  }
  if (isAuthenticated) {
    let userData = getUserData(user.email)
    // if(userData)
    // console.log("***")
    // console.log(userData)
    // console.log("***")
  }
  // async function test() {
  //   console.log(await api.getAllTestModels())
  // }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {console.log(user)}
      </div>
    ) || (
      <h1>PLEASE LOGIN</h1>
    )
  );
};

export default Profile