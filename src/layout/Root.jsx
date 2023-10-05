import { Outlet, useNavigation } from "react-router-dom";

export const Root = () => {

  const navigation = useNavigation()

  return (
    <div>
      <main>
        {
          navigation.state === 'loading' 
            ? 'Loading...'      
            : <Outlet />
        }
      </main>
    </div>
  )
};

