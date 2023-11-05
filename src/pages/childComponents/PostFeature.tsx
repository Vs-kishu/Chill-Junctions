import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  useUnSavePost,
} from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { FcBookmark, FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FiBookmark } from 'react-icons/fi';
import Loader from './Loader';

type PostFeaturesProps = {
  post: Models.Document;
  userId: string;
};

const PostFeature = ({ post, userId }: PostFeaturesProps) => {
  const { mutate: LikePost, isPending: isliking } = useLikePost();
  const { data: userData, isPending: isUserDataLoading } = useGetCurrentUser();
  const { mutateAsync: savePost, isPending: isSaving } = useSavePost();

  const { mutateAsync: unSavePost, isPending: isDeleting } = useUnSavePost();

  const hashLiked = post.likes.find(
    (user: Models.Document) => user.$id === userId
  );

  const hasSaved = userData?.save.find(
    (savepost: Models.Document) => savepost.post.$id === post.$id
  );
  const handlePostLike = async (postId: string) => {
    if (hashLiked) {
      const updatedLikes = post.likes.filter(
        (user: Models.Document) => user.$id !== userId
      );
      LikePost({ postId, likesArr: updatedLikes });
    } else {
      const updatedLikes = [...post.likes, userId];
      LikePost({ postId, likesArr: updatedLikes });
    }
  };
  const handleSaveAndUnsavedPost = async (postId: string) => {
    if (hasSaved) {
      await unSavePost({ savePostId: hasSaved.$id });
    } else {
      await savePost({ postId, userId });
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
        {isSaving || isDeleting || isUserDataLoading ? (
          <Loader w={10} h={10} />
        ) : (
          <>
            {hasSaved ? (
              <FcBookmark onClick={handleSaveAndUnsavedPost} />
            ) : (
              <FiBookmark onClick={() => handleSaveAndUnsavedPost(post.$id)} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostFeature;
