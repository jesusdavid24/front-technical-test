import { useEffect, useState, useMemo } from "react";
import { Chart } from "react-charts";

export const Graphics = () => {

  const primaryAxis = useMemo(() => ({ getValue: (datum) => datum.login }), []);
  const secondaryAxes = useMemo(
    () => [{ getValue: (datum) => datum.followers, elementType: "bar" }],
    []
  );

  const [users, setUsers] = useState([])
  
  useEffect(() => {
    async function load() {
      const url = "https://api.github.com/search/users?q=german&per_page=5"
      const response = await fetch(url)
      const githubUsers = await response.json()

      const promises = []
      for (let i=0; i < githubUsers.items.length; i++) {
        const githubUser = githubUsers.items[i]
        promises.push(fetch(`https://api.github.com/users/${githubUser.login}`)
        .then(response => response.json()))
      }
      const ghUsers = await Promise.all(promises)
      setUsers(ghUsers)
    }

    load()
  }, []);

  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>
      {/* {users.map((user) => (
        <div key={user.login}>
          {user.login}: {user.followers}
        </div>
      ))} */}
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
  );
};


