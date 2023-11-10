import { useGetUserPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import GridPosts from './GridPosts';
import Loader from './Loader';

type userProps = {
  userId: string;
  post: Models.Document;
};

const RealatedPosts = ({ userId, post }: userProps) => {
  const { data: userPosts } = useGetUserPosts(userId);

  if (!userPosts) return <Loader w={50} h={50} />;
  const filteredRelatedPosts = userPosts?.documents.filter(
    (item: Models.Document) => item.$id !== post.$id
  );
  console.log(filteredRelatedPosts);
  return (
    <>
      {filteredRelatedPosts.length == 0 ? (
        <h3 className="h3-bold text-red">No Related Posts</h3>
      ) : (
        <>
          <h1 className="h2-bold text-sage-1 my-4">Related Posts</h1>
          <GridPosts explorePosts={filteredRelatedPosts} />
        </>
      )}
    </>
  );
};

export default RealatedPosts;
