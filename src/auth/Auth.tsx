import { Navigate, Outlet } from 'react-router-dom';
const Auth = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'} />
      ) : (
        <>
          <section className="flex lg:flex-row flex-col-reverse justify-between items-center ">
            <Outlet />
            <div className="max-lg:w-full">
              <img
                className="max-lg:w-full  lg:min-h-screen"
                src="https://res.cloudinary.com/dngrtoqfe/image/upload/v1698836471/svg/ihbejk8tqewkqrxld3iw.gif"
                alt="auth"
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Auth;
