import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import GridPosts from '../childComponents/GridPosts';
import Loader from '../childComponents/Loader';
import SearchedPosts from '../childComponents/SearchedPosts';

const Explore = () => {
  const { ref, inView } = useInView();

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 600);
  const { data: searchedPosts, isLoading: isSearching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchTerm) {
      fetchNextPage();
    }
  }, [inView, searchTerm, fetchNextPage]);

  if (!posts) {
    return <Loader w={50} h={50} />;
  }
  const shouldShowSearchedPosts = searchTerm !== '';
  const shouldShowPost =
    !shouldShowSearchedPosts &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4">
          <HiOutlineSearchCircle className="text-3xl" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchTerm}
            onChange={(e) => {
              const { value } = e.target;
              setSearchTerm(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-black">All</p>
          <FaFilter />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchedPosts && searchedPosts ? (
          <SearchedPosts
            isSearching={isSearching}
            searchedPosts={searchedPosts.documents}
          />
        ) : shouldShowPost ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts &&
          posts.pages.map((item, index) => {
            const documents = item?.documents;
            return <GridPosts key={`page-${index}`} explorePosts={documents} />;
          })
        )}
      </div>

      {hasNextPage && !searchTerm && (
        <div ref={ref} className="mt-10">
          <Loader w={50} h={50} />
        </div>
      )}
    </div>
  );
};

export default Explore;
