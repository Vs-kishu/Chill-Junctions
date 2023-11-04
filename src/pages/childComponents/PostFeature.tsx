import { useLikePost } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { FcBookmark, FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FiBookmark } from 'react-icons/fi';
import Loader from './Loader';

type PostFeaturesProps = {
  post: Models.Document;
  userId: string;
};

const PostFeature = ({ post, userId }: PostFeaturesProps) => {
  const { mutateAsync: LikePost, isPending: isliking } = useLikePost();

  const hashLiked = post.likes.find(
    (user: Models.Document) => user.$id === userId
  );

  const handlePostLike = async (postId: string) => {
    if (hashLiked) {
      const updatedLikes = post.likes.filter(
        (user: Models.Document) => user.$id !== userId
      );
      await LikePost({ postId, likesArr: updatedLikes });
    } else {
      const updatedLikes = [...post.likes, userId];
      await LikePost({ postId, likesArr: updatedLikes });
    }
  };

  return (
    <div className="text-white bg-sage-4 rounded-md py-2 px-5 flex-between text-3xl">
      <div className="flex items-center gap-2 cursor-pointer">
        {isliking ? (
          <Loader w={10} h={10} />
        ) : (
          <>
            {hashLiked ? (
              <FcLike onClick={() => handlePostLike(post.$id)} />
            ) : (
              <FcLikePlaceholder onClick={() => handlePostLike(post.$id)} />
            )}
            <span className="text-sm font-bold">{post.likes.length}</span>
          </>
        )}
      </div>
      <div className="flex items-center cursor-pointer">
        <FcBookmark />
        <FiBookmark />
      </div>
    </div>
  );
};

export default PostFeature;
