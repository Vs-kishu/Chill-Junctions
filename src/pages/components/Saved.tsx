import { getPostById } from '@/lib/appWrite/api';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GridPosts from '../childComponents/GridPosts';
import Loader from '../childComponents/Loader';

const Saved = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const { pathname } = useLocation();
  const savedPostsIds = currentUser?.save.map(
    (item: Models.Document) => item.post.$id
  );

  const [savedPosts, setSavedPosts] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (savedPostsIds) {
      const fetchSavedPosts = async () => {
        const postPromises = savedPostsIds.map((id: string) => getPostById(id));
        const posts = await Promise.all(postPromises);
        setSavedPosts(posts);
        setIsLoading(false);
      };

      fetchSavedPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (isLoading || isCurrentUserLoading) return <Loader w={50} h={50} />;

  return (
    <div className="flex flex-col mx-auto gap-5">
      {currentUser?.liked.length === 0 && (
        <p className="text-light-4">NO saved posts</p>
      )}

      {pathname === '/saved' && (
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      )}

      <GridPosts explorePosts={savedPosts} showPostFeature={false} />
    </div>
  );
};

export default Saved;
