import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import GridPosts from '../childComponents/GridPosts';
import Loader from '../childComponents/Loader';

const UserPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader w={50} h={50} />
      </div>
    );

  return (
    <>
      {currentUser.post.length === 0 && (
        <p className="text-light-4">No Post Yet</p>
      )}

      <GridPosts explorePosts={currentUser.post} showPostFeature={false} />
    </>
  );
};

export default UserPosts;
