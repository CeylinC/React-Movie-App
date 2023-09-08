import './Homepage.css';
import {Navbar} from '../../../components';
import { Outlet, useSearchParams } from 'react-router-dom';

export function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="Homepage">
      <Navbar setSearchParam={setSearchParams} />
      <Outlet/>
    </div>
  );
}
