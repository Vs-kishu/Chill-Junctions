import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/lib/constants';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INavLink } from '@/types';
import { useEffect } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../childComponents/Loader';

const LeftBar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const {
    mutate: signOutAccount,
    isSuccess,
    isPending: isSignOuting,
  } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return (
    <nav className="leftsidebar h-[100vh]">
      <div className="flex flex-col gap-2">
        <img
          className="w-24 h-24 mx-auto"
          src="/android-chrome-192x192.png"
          alt="logo"
        />
        <Link
          to={`/profile/${user.id}`}
          className="flex-center bg-sage-1 hover:bg-sage-2 rounded-lg p-2 text-white gap-5 "
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
      <div className="flex items-center justify-center bg-sage-1 py-2 rounded-lg gap-3 px-5">
        <span className="flex-shrink-0">LogOut</span>
        {isSignOuting ? (
          <Loader w={20} h={20} />
        ) : (
          <BiLogOutCircle
            onClick={signOutAccount}
            className="text-3xl flex-shrink-0 cursor-pointer hover:scale-110 rounded-full "
          />
        )}
      </div>
    </nav>
  );
};

export default LeftBar;
