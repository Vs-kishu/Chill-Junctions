import { INewUser } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPost,
  getRecentPosts,
  signOut,
  userSignIn,
  userSignUp,
} from '../appWrite/api';
import { QUERY_KEYS } from './queryKeys';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => userSignUp(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => userSignIn(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
