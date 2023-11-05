import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';
import {
  useCreatePost,
  useEditPost,
} from '@/lib/react-query/queriesAndMutations';
import { PostValidation } from '@/validation/validation';
import FileUploader from './FileUploader';
import Loader from './Loader';

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update';
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useEditPost();

  const [fileChanged, setFileChanged] = useState(false);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      setFileChanged(true);
    } else {
      setFileChanged(false);
    }
  }, [form.formState.isDirty]);

  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });
      if (!updatedPost) {
        return toast({ title: 'please try again' });
      }
      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({ ...value, userId: user.id });
    if (!newPost) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    }
    navigate('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className=" flex items-center shad-button_primary whitespace-nowrap"
            disabled={isCreating || isUpdating || !fileChanged}
          >
            {(isCreating || isUpdating) && <Loader w={10} h={10} />}
            {`${action} Post`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
