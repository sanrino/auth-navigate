import { FC, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { UserLogin } from './login.interface';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../../shared/consts/route.consts';
import { useUserContext } from '../hooks/useUserContext';

interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const { logIn } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: UserLogin) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      logIn?.(data);
      navigate(HOME);
    }, 1000);
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <form
        className="mx-auto flex w-full  max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h3 className="pb-5 text-3xl font-bold dark:text-white">Вхід</h3>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Логін" />
          </div>
          <TextInput
            id="login"
            type="text"
            placeholder="name@name.com"
            {...register('login', {
              required: `Поле логін обов'язкове для заповнення!`,

              maxLength: {
                value: 50,
                message: 'Логін має бути не більше 50 символів',
              },
            })}
            color={errors.login?.message ? 'failure' : 'gray'}
            helperText={errors.login?.message}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Пароль" />
          </div>
          <TextInput
            id="password"
            type="password"
            {...register('password', {
              required: `Поле пароль обов'язкове для заповнення!`,
            })}
            color={errors.password?.message ? 'failure' : 'gray'}
            helperText={errors.password?.message}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          Вхід
        </Button>
      </form>
    </div>
  );
};
