import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from "react-charts";
import { getUsers } from '../../api/users';
import { validateField } from '../../utils/validateField';

//import { Graphics } from '../Graphics';
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

  // if(userData && userData.length > 0) {
  //   console.log(userData[0].login);
  // }

  const GITHUB_TOKEN = "";

  const headers = {};
  
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  const primaryAxis = useMemo(() => ({ getValue: (datum) => datum.login }), []);
  const secondaryAxes = useMemo(
    () => [{ getValue: (datum) => datum.followers, elementType: "bar" }],
    []
  );

  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function load() {
      if(userData && userData.length > 0 ) {
        const userLogin = userData[0].login;
          const url = `https://api.github.com/search/users?q=${userLogin}&per_page=10`;
          console.log(url);
          const response = await fetch(url, { headers });
          const githubUsers = await response.json();

          const promises = [];
          for (let i = 0; i < githubUsers.items.length; i++) {
            const githubUser = githubUsers.items[i];
            promises.push(
              fetch(`https://api.github.com/users/${githubUser.login}`, {
                headers
              }).then((response) => response.json())
            );
          }
          const ghUsers = await Promise.all(promises);
          setUsers(ghUsers);
        }
      }

    load();
  }, []);

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
            <div className="App">
              {users.map((user) => (
                <div key={user.login}>
                  {user.login}: {user.followers}
                </div>
              ))}
              {users && users.length ? (
                <Chart
                  options={{
                    data: [{ label: "Users", data: users }],
                    primaryAxis,
                    secondaryAxes
                  }}
                />
              ) : null}
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};
