import { Link } from 'react-router-dom';

const ServerErrorPage = () => {
  return (
    <div className="text-white text-3xl">
      <h1 className="text-red h1-bold"> Server Error</h1>
      Please try again later{' '}
      <Link
        className="text-blue-500 underline-offset-2"
        target="_blank"
        to={'https://appwrite.io/'}
      >
        appwrite
      </Link>{' '}
      is in Beta Version So, Facing this issue some time
    </div>
  );
};

export default ServerErrorPage;
