'use client';

import { Button } from '@/components/atoms/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { Title } from '@/components/atoms/Typography';
import { useLoginMutation } from '@/hooks/slices/authAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard/product');
    }
  }, []);
  const [login] = useLoginMutation();
  const form = useForm<{ username: string; password: string }>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(
      z.object({
        username: z
          .string({ required_error: 'username is require.' })
          .nonempty({ message: 'username is require.' }),
        password: z
          .string({ required_error: 'password is require.' })
          .nonempty({ message: 'password is require.' }),
      })
    ),
  });
  const handleLogin = async (data: { username: string; password: string }) => {
    await login(data)
      .unwrap()
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard/product');
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Title className='font-medium'>username</Title>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder='username'
                          type='text'
                          className=' bg-white'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Title className='font-medium'>password</Title>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder='password'
                          type='password'
                          className=' bg-white'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
