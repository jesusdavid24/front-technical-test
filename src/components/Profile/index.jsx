import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../api/users";
import { Graphics } from "../Graphics";

export const Profile = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUserProfile() {
      if (userName) {
        try {
          const userProfileData = await getUserProfile(userName);
          setUserData(userProfileData);
        } catch (error) {
          console.error("Error al obtener el perfil del usuario:", error);
        }
      }
    }
    fetchUserProfile();
  }, [userName]);

  return (
    <div>
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.name} />
          <p>Seguidores: {userData.followers}</p>
          <p>Siguiendo: {userData.following}</p>
        </div>
      )}
      <div>
        {userData.length > 0 && (
          <Graphics userData={userData.slice(0, 10)} />
        )}
      </div>
    </div>
  );
};
