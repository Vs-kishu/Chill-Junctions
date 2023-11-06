import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import GridPosts from './GridPosts';
import Loader from './Loader';

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader w={50} h={50} />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPosts explorePosts={currentUser.liked} showPostFeature={false} />
    </>
  );
};

export default LikedPosts;
