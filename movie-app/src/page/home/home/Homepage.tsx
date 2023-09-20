import './Homepage.css';
import {Navbar} from '../../../components';
import { Outlet } from 'react-router-dom';
import { useUserControl, useUserStore } from '../../../hook';

export default function Homepage() {
  const {user, setUser} = useUserStore();
  
  useUserControl(user, setUser);
  
  return (
    <div className="Homepage">
      <Navbar username={user ? user.username : undefined}/>
      <Outlet/>
    </div>
  );
}
