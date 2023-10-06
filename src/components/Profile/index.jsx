import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../api/users";

export const Profile = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    ( async function fetchUserProfile() {
      if(userName) {
        const userProfileData = await getUserProfile(userName);
        setUserData(userProfileData);
      }
      fetchUserProfile();
    })();
  }, [userName])

  return (
    <div>
      <img src={userData.avatar_url} alt={userData.name} />
      <p>Seguidores: {userData.followers}</p>
      <p>Siguiendo: {userData.following}</p>
    </div>
  );
};
