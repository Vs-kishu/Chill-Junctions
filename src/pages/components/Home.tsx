import {
  useFetchUsers,
  useGetRecentPosts,
} from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import Loader from '../childComponents/Loader';
import PostCard from '../childComponents/PostCard';
import UserCard from '../childComponents/UserCard';
import ServerErrorPage from './ServerErrorPage';

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useFetchUsers(4);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <ServerErrorPage />
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1"> Server error!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold text-sage-1 md:h2-bold text-left w-full">
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <Loader w={100} h={100} />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-sage-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader w={50} h={50} />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
