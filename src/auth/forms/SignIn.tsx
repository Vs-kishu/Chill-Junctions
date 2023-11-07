import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SigninValidation } from '@/validation/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';
import Loader from '@/pages/childComponents/Loader';
import { useState } from 'react';
import * as z from 'zod';

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isGuestLogin, setIsGuestLogin] = useState(false);
  const { checkAuthUser } = useUserContext();

  const { mutateAsync: signInUser, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInUser({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ title: 'Uh oh! Something went wrong.' });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast({ title: 'signup failed Please try again' });
    }
  }

  async function handleGuestLogin() {
    form.setValue('email', 'guest@gmail.com');
    form.setValue('password', 'guest8896');

    const session = await signInUser({
      email: 'guest@gmail.com',
      password: 'guest8896',
    });
    if (!session) {
      return toast({ title: 'Uh oh! Something went wrong.' });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast({ title: 'signup failed Please try again' });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col mx-auto">
        <img
          className="w-40 h-24"
          src="/android-chrome-192x192.png"
          alt="logo"
        />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-sage-1 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isGuestLogin ? (
            <Button
              type="button"
              onClick={handleGuestLogin}
              className="shad-button_primary"
            >
              {isSigningIn ? (
                <div className="flex-center gap-2">
                  <Loader w={20} h={20} />
                </div>
              ) : (
                'Guest LogIn'
              )}
            </Button>
          ) : (
            <Button type="submit" className="shad-button_primary">
              {isSigningIn ? (
                <div className="flex-center gap-2">
                  <Loader w={20} h={20} />
                </div>
              ) : (
                'Log in'
              )}
            </Button>
          )}

          <h1
            className="cursor-pointer hover:text-light-1 font-bold"
            onClick={() => setIsGuestLogin(true)}
          >
            Guest LogIn ?
          </h1>

          <p className="text-small-regular text-sage-1 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-sage-1 hover:text-light-4 font-bold text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
