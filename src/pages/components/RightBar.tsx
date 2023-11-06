import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { useParams } from 'react-router-dom';

const RightBar = () => {
  const { id } = useParams();
  const { data } = useGetUserById(id);
  console.log(data);
  return <div>Top creaters</div>;
};

export default RightBar;
