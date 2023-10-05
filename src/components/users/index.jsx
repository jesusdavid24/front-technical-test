import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api/users';

export const Users = () => {

  const [userName, setUserName] = useState('');
  const [userData, setUserData]=useState([]);

  const handleChange = (event) => {

    const { value } = event.target;

    setUserName(value)
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const data = await getUsers(userName);

    setUserData(data);

    setUserName('');
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
          value={userName}
          onChange={handleChange}
          />  
        <button type='submit'>Search</button>
      </form>
      <div>
      <h2>Users found</h2>
          <div>
            <ul>
              { userData.length > 0 && userData.slice(0, 10).map((user) => (
              <li key={user.id}>
                <Link to={`/profile/${user.login}`}>
                  <p>ID: { user.id }</p>
                  <p>Name User: { user.login }</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      </div>
    </div>
  )
};
