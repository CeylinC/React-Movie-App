import './Homepage.css';
import {Navbar} from '../../../components';
import { Outlet, useSearchParams } from 'react-router-dom';
import { IUser } from '../../../model';
import { getUser } from '../../../util';

export function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user: IUser = getUser();
  
  return (
    <div className="Homepage">
      <Navbar setSearchParam={setSearchParams} username={user.username}/>
      <Outlet/>
    </div>
  );
}
