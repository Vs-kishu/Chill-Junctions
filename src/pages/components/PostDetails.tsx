import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import {
  useDeletePost,
  useGetCurrentUser,
  useGetPostById,
} from '@/lib/react-query/queriesAndMutations';
import { multiFormatDateString } from '@/lib/utils';
import { Models } from 'appwrite';
import { FcEditImage } from 'react-icons/fc';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../childComponents/Loader';
import PostFeature from '../childComponents/PostFeature';

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: userData } = useGetCurrentUser();

  const { data: post, isLoading } = useGetPostById(id);
  const { mutateAsync: deletePost } = useDeletePost();

  const savedPost = userData?.save.find(
    (savepost: Models.Document) => savepost.post.$id === post?.$id
  );

  if (!post || !userData) return <Loader w={50} h={50} />;

  const handleDeletePost = async () => {
    await deletePost({
      postId: id,
      imageId: post?.imageId,
      savePostId: savedPost?.$id,
    });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <IoMdArrowRoundBack />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader w={50} h={50} />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.user.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.user.imageUrl}
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.user.name}
                  </p>
                  <div className="flex-center gap-2 text-light-2">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.user.$id && 'hidden'}`}
                >
                  <FcEditImage className="text-3xl hover:scale-110" />
                </Link>

                <Button
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.user.$id && 'hidden'
                  }`}
                >
                  <MdDelete
                    onClick={handleDeletePost}
                    className="text-2xl hover:scale-110 hover:text-light-1"
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular text-light-1">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2 ">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-2 small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostFeature post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
