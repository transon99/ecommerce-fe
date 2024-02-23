import Heading from '@/components/Heading';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import authApi from '@/apis/authApi';
import { Button } from '@/components/ui/button';
import routes from '@/routes';
import { useUser } from '@/store/useUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input/Input';
import { rules } from '@/utils/rules';
import { CgSpinner } from 'react-icons/cg';

type LoginFormProps = {};

const LoginForm = (props: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogined } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    const response = await authApi.login(data);
    setIsLoading(false);
    if (response.data.status === 'OK') {
      Cookies.set('accessToken', response.data.accessToken, { expires: 100 });
      Cookies.set('refreshToken', response.data.refreshToken, { expires: 100 });
      Cookies.set('isLogined', true.toString());
      setIsLogined(true);
      router.push(routes.home);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <Heading title="Sign in to your account" center />
      <hr className="bg-slate-300 w-full h-px" />
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit((data) => handleLogin(data))}
      >
        <div>
          <Input
            id="email"
            register={register}
            type="email"
            placeholder="Enter your email..."
            lable="Your email"
            errorMessage={errors.email?.message?.toString()}
            rules={rules.email}
            disabled={isLoading}
          />
        </div>
        <div>
          <Input
            id="password"
            register={register}
            type="password"
            placeholder="••••••••"
            lable="Password"
            errorMessage={errors.password?.message?.toString()}
            rules={rules.password}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        <Button
          type="submit"
          className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading && (
            <span className="animate-spin">
              <CgSpinner />
            </span>
          )}
          {isLoading ? 'Loading...' : 'Sign in'}
        </Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{' '}
          <Link
            href="register"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
