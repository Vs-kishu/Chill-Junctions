import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { FcAddImage } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import Loader from '../childComponents/Loader';
import PostForm from '../childComponents/PostForm';
const EditPost = () => {
  const { id } = useParams();
  const { data: post } = useGetPostById(id);
  if (!post) return <Loader w={50} h={50} />;
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <FcAddImage className="text-6xl" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm post={post} action="Update" />
      </div>
    </div>
  );
};

export default EditPost;
