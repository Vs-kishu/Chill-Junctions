import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/lib/constants';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INavLink } from '@/types';
import { useEffect } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const LeftBar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in');
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar h-screen">
      <div className="flex flex-col gap-10">
        <img
          className="w-24 h-24 mx-auto"
          src="/android-chrome-192x192.png"
          alt="logo"
        />
        <Link
          to={`/profile/${user.id}`}
          className="flex-center bg-sage-1 rounded-lg p-2 text-white gap-5 "
        >
          <img
            src={user.imageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="h3-bold">{user.name}</h4>
            <p className="subtle-semibold ">{user.email}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li
                className={`leftsidebar-link ${
                  pathname === link.route && 'bg-sage-2'
                }`}
                key={link.label}
              >
                <NavLink
                  className="flex gap-4 items-center p-4"
                  to={link.route}
                >
                  {' '}
                  <span className="text-3xl"> {link.imgURL}</span>
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center gap-5 px-5">
        <BiLogOutCircle
          onClick={signOutAccount}
          className="text-3xl cursor-pointer"
        />
        LogOut
      </div>
    </nav>
  );
};

export default LeftBar;
