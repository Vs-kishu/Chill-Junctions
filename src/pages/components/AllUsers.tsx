import { useFetchUsers } from '@/lib/react-query/queriesAndMutations';
import Loader from '../childComponents/Loader';
import UserCard from '../childComponents/UserCard';
import ServerErrorPage from './ServerErrorPage';

const AllUsers = () => {
  const {
    data: creators,
    isLoading,
    isError: isErrorCreators,
  } = useFetchUsers();

  if (isErrorCreators) {
    return <ServerErrorPage />;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader w={50} h={50} />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
