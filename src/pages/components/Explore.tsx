import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import { useState } from 'react';
import GridPosts from '../childComponents/GridPosts';
import Loader from '../childComponents/Loader';
import SearchedPosts from '../childComponents/SearchedPosts';

const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 600);
  const { data: searchedPosts } = useSearchPosts(debouncedValue);
  console.log(searchedPosts?.documents);

  if (!posts) {
    return <Loader w={50} h={50} />;
  }
  const shouldShowSearchedPosts = searchTerm !== '';
  const shouldShowPost =
    !shouldShowSearchedPosts &&
    posts.pages.every((item) => item?.documents.length === 0);
  return (
    <div>
      <Input type="text" onChange={(e) => setSearchTerm(e.target.value)} />

      <div>
        {shouldShowSearchedPosts ? (
          <SearchedPosts />
        ) : shouldShowPost ? (
          <p>end post</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPosts key={`posts-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
