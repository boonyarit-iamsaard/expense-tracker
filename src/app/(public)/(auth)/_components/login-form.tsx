'use client';

import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginInput, loginInputSchema } from '@/types/auth';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null,
  );

  const router = useRouter();
  const form = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginInputSchema),
  });

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    form.setValue('email', event.target.value);
    form.clearErrors('email');
    setLoginErrorMessage(null);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    form.setValue('password', event.target.value);
    form.clearErrors('password');
    setLoginErrorMessage(null);
  }

  async function onSubmit(values: LoginInput) {
    setLoading(true);
    setLoginErrorMessage(null);

    const response = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!response?.ok) {
      console.error(response?.error);
      setLoginErrorMessage(
        response?.error ?? 'Unable to login, please try again later',
      );
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        value={field.value}
                        onChange={handleEmailChange}
                        placeholder="m@example.com"
                        type="email"
                      />
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        type="password"
                        value={field.value}
                        onChange={handlePasswordChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Login
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            {loginErrorMessage ? (
              <div className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-center text-sm text-destructive">
                {loginErrorMessage}
              </div>
            ) : null}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
