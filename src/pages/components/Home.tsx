import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import PostCard from '../childComponents/PostCard';

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className="home-container">
      <div className="home-posts">
        <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
        {isPostLoading && !posts ? (
          <p>Loading...</p>
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
      ;
    </div>
  );
};

export default Home;
