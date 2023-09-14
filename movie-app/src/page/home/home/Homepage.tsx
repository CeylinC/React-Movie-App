import './Homepage.css';
import {Navbar} from '../../../components';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useUserControl, useUserStore } from '../../../hook';

export function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {user, setUser} = useUserStore();
  
  useUserControl(user, setUser);
  
  return (
    <div className="Homepage">
      <Navbar setSearchParam={setSearchParams} username={user ? user.username : undefined}/>
      <Outlet/>
    </div>
  );
}
