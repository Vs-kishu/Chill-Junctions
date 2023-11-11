import { Models } from 'appwrite';
import GridPosts from '../childComponents/GridPosts';
import Loader from '../childComponents/Loader';
type userPostProps = {
  userPosts: Models.Document[];
};
const UserPosts = ({ userPosts }: userPostProps) => {
  if (!userPosts)
    return (
      <div className="flex-center w-full h-full">
        <Loader w={50} h={50} />
      </div>
    );

  return (
    <>
      {userPosts.length === 0 && <p className="text-light-4">No Post Yet</p>}

      <GridPosts explorePosts={userPosts} showPostFeature={false} />
    </>
  );
};

export default UserPosts;
