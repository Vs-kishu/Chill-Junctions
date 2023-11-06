import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { BsImages } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import GridPosts from '../childComponents/GridPosts';
import LikedPosts from '../childComponents/LikedPosts';
import Loader from '../childComponents/Loader';

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { data: userProfile, isLoading: isProfileLoading } = useGetUserById(id);
  console.log(userProfile);

  if (isProfileLoading || !userProfile) {
    return <Loader w={70} h={70} />;
  }

  console.log();

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={userProfile.imageUrl}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {userProfile.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{userProfile.username}
              </p>
            </div>

            {/* <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div> */}

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {userProfile.bio} kishan
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== userProfile.$id && 'hidden'}`}>
              <Link
                to={`/update-profile/${userProfile.$id}`}
                className={`h-12 px-5 flex-center gap-2 rounded-lg ${
                  user.id !== userProfile.$id && 'hidden'
                }`}
              >
                <FiEdit />

                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && 'hidden'}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {userProfile.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && '!bg-sage-4 text-light-1'
            }`}
          >
            <BsImages />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` &&
              '!bg-sage-4 text-light-1'
            }`}
          >
            <FcLike />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={
            <GridPosts explorePosts={userProfile.post} showUser={false} />
          }
        />
        {userProfile.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
