import { FC } from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

interface ErrorProps {}

export const ErrorPage: FC<ErrorProps> = ({}) => {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="font-bold">Вибачте, такої сторінки не існує!</h1>
        <Button as={Link} to="/">
          Головна сторінка
        </Button>
      </div>
    </div>
  );
};
