import './Homepage.css';
import {Navbar} from '../../../components';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useUserControl, useUserStore } from '../../../hook';
import { useEffect, useState } from 'react';

export function Homepage() {
  const {user, setUser} = useUserStore();
  
  useUserControl(user, setUser);
  
  return (
    <div className="Homepage">
      <Navbar username={user ? user.username : undefined}/>
      <Outlet/>
    </div>
  );
}
