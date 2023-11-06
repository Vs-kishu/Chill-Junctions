import { Models } from 'appwrite';
import GridPosts from './GridPosts';
import Loader from './Loader';

type searchedPostprops = {
  isSearching: boolean;
  searchedPosts: Models.Document[];
};
const SearchedPosts = ({ isSearching, searchedPosts }: searchedPostprops) => {
  if (isSearching || !searchedPosts) return <Loader w={50} h={50} />;

  console.log(searchedPosts);

  if (searchedPosts && searchedPosts.length > 0) {
    return <GridPosts explorePosts={searchedPosts} />;
  }
  return <div>No post found</div>;
};

export default SearchedPosts;
