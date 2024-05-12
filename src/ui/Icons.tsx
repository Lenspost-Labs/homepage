import Image from 'next/image';
import { FC } from 'react';

// TODO: name the props type as ComponentProps
interface CheckMarkIconProps {
  className?: string;
  color?: string;
  size?: number;
}

const CheckMarkIcon: FC<CheckMarkIconProps> = ({
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

export default CheckMarkIcon;
