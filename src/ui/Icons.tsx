import Image from 'next/image';
import { FC } from 'react';

interface CheckMarkIconProps {
  className?: string;
  color?: string;
  size?: number;
}

const CheckMarkIcon: FC<CheckMarkIconProps> = ({
  color = '',
  size = 24,
  className
}) => {
  const checkmarkSrc =
    color === 'blue' ? '/blue-checkmark.svg' : '/checkmark.svg';

  return (
    <div className={className}>
      <Image src={checkmarkSrc} alt="checkmark" fill />
    </div>
  );
};

export default CheckMarkIcon;
