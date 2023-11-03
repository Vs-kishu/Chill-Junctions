import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in');
    }
  }, [isSuccess]);

  return (
    <section className="bg-sage-4 text-light-1 py-2 px-5 flex-between md:hidden ">
      <Link to={'/'}>
        <img className="w-14" src="/android-chrome-192x192.png" alt="logo" />
      </Link>
      <div className="flex gap-5 items-center">
        <img
          className="w-8 h-8 rounded-full"
          src={user.imageUrl}
          alt="profile"
        />
        <BiLogOutCircle
          className="text-3xl cursor-pointer"
          onClick={signOutAccount}
        />
      </div>
    </section>
  );
};

export default Header;
