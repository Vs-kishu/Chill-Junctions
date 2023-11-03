import { bottombarLinks } from '@/lib/constants';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && 'rounded-[10px] bg-sage-3 '
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <span className={`text-white ${isActive && 'invert-white'}`}>
              {link.imgURL}
            </span>

            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
