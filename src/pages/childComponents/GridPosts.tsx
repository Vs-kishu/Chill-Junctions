import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import PostFeature from './PostFeature';
type PostTypesProps = {
  explorePosts: Models.Document[] | undefined;
  showUser?: boolean;
  showPostFeature?: boolean;
};
const GridPosts = ({
  explorePosts,
  showUser = true,
  showPostFeature = true,
}: PostTypesProps) => {
  const { user } = useUserContext();
  if (!explorePosts) return <Loader w={50} h={50} />;
  return (
    <ul className="grid-container">
      {explorePosts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post?.user?.imageUrl}
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1 text-light-1">{post?.user?.name}</p>
              </div>
            )}
            {showPostFeature && (
              <PostFeature notShowLike={false} post={post} userId={user.id} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPosts;
