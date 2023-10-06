import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../api/users';
import './index.scss';
//import { Graphics } from "../Graphics";

export const Profile = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState([]);
  console.log('data', userData);

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
    <div className="card">
      <div className="card__container">
        <div className="card__container__client">
        {userData && (
          <div>
            <div className="card__container__picture">
              <img src={userData.avatar_url} alt={userData.name} />
            </div>
            <p className="card__container__name">{ userData.name }
              <span>{ userData.company }</span>
            </p>
            <p className="card__container__followers">Followers: { userData.followers }</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
