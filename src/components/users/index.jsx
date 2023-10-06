import { useState} from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api/users';
import { validateField } from '../../utils/validateField';
//import { Graphics } from '../Graphics';

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
    <div>
      <h1> Users GitHub </h1>
      <form onSubmit={handleSearch}>
        <label htmlFor='userName'> Enter user name </label>
        <input 
          id='userName'
          name='userName'
          type="text"
          autoComplete='off'
          value={userName}
          onChange={handleChange}
          />  
        <button type='submit'>Search</button>
      </form>
      {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}
      {userData.length > 0 && ( 
        <div>
          <h2>Users found</h2>
          <div>
            <ul>
              {userData.slice(0, 10).map((user) => (
                <li key={user.id}>
                  <Link to={`/profile/${user.login}`}>
                    <p>ID: {user.id}</p>
                    <p>Name User: {user.login}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
};
