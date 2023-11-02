import { INewUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { userSignIn, userSignUp } from '../appWrite/api';

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
