import { useState} from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api/users';
import { validateField } from '../../utils/validateField';
import { Graphics } from '../Graphics';
import './index.scss';

export const Users = () => {

  const [userName, setUserName] = useState('');
  const [userData, setUserData]=useState([]);
  const [errors, setErrors] = useState('');

  const handleChange = (event) => {

    const { value } = event.target;

    setUserName(value)

    const errorMessage = validateField(value);
    
    setErrors({
      ...errors,
      userName: errorMessage 
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (userName.length < 4 || userName === 'doublevpartners') {
      setErrors({
        ...errors,
        userName: 'Searching with less than 4 characters or the word "doublevpartners" is not allowed.'
      });
      return;
    }

    const data = await getUsers(userName);

    setUserData(data);

    setUserName('');

    setErrors('');
  };

  return (
    <div className="users">
      <div className="users__container">
        <form onSubmit={handleSearch}>
          <span>Found users GitHub</span>
          <p>You must enter at least 4 characters 
          and the word &quot;doublevpartners&quot; is not allowed.
          </p>
          <input 
            id='userName'
            name='userName'
            type="text"
            autoComplete='off'
            value={userName}
            onChange={handleChange}
            />  
          <button type='submit'>Search</button>
          {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}
        </form>
        {userData.length > 0 && ( 
          <div className="users__container__data">
            <div className="users__container__data__info">
              <h2>Users found</h2>
              <ul>
                {userData.slice(0, 10).map((user) => (
                  <li key={user.id}>
                    <Link  to={`/profile/${user.login}`}>
                      <p>ID: {user.id}</p>
                      <p>Name User: {user.login}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="users__container__data__graphic">
              <Graphics />
            </div>
          </div>
        )}
      </div>
    </div>
  )
};
