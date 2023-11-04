import { Models } from 'appwrite';
import { FcEditImage } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';
import { multiFormatDateString } from '@/lib/utils';
import PostFeature from './PostFeature';

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!post.user) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.user.$id}`}>
            <img
              src={
                post.user?.imageUrl || '/assets/icons/profile-placeholder.svg'
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col text-light-1">
            <p className="base-medium lg:body-bold ">{post.user.name}</p>
            <div className="flex-center gap-2 text-light-2 ">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.user.$id && 'hidden'}`}
        >
          <FcEditImage className="text-3xl" />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p className="text-light-1">{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-2 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img src={post.imageUrl} alt="post image" className="post-card_img" />
      </Link>
      <PostFeature post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
