import Image from 'next/image';
import { FC } from 'react';

interface Props {
  className?: string;
  color?: string;
  size?: number;
}

export const CheckMarkIcon: FC<Props> = ({
  color = 'currentColor',
  size = 24,
  className
}) => {
  return (
    <div className={className}>
      <Image src="/checkmark.svg" alt="checkmark" fill />
    </div>
  );
};
