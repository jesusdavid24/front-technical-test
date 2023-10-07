import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../api/users';
import { saveUsers } from '../../api/saveUsers';
import './index.scss';

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
          console.error("Error obtaining user profile:", error);
        }
      }
    }
    fetchUserProfile();
  }, [userName]);

  const handleSubmit = async (event) => {

    event.preventDefault()

    const {avatar_url, name, followers} = userData;

    const user = {
      avatar_url,
      name,
      followers,
    };

    const data = await saveUsers(user);

    return data;

  };

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
            </p>
            <p className="card__container__followers">Followers: { userData.followers }</p>
            <button type="submit" onClick={handleSubmit}>Export</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
