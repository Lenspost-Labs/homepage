import Image from 'next/image';
import { FC } from 'react';

import TextCounter from './TextCounter';

interface CounterBoxProps {
  percentage: string;
  gifts?: boolean;
  count: string;
  title: string;
  week: string;
}

const CounterBox: FC<CounterBoxProps> = ({
  gifts = true,
  percentage,
  title,
  count,
  week
}) => {
  return (
    <div className="relative flex w-full flex-row items-start justify-between overflow-hidden rounded-2xl border-[2px] border-[#375DFB] p-2 sm:p-4 lg:w-1/2 lg:p-8">
      <TextCounter title={title} count={count} />
      {gifts && (
        <div className="absolute -bottom-12 -right-5 -rotate-[15deg]">
          <Image
            alt="profile-graph"
            src="/gift.png"
            loading="lazy"
            height="136"
            width="155"
          />
        </div>
      )}
    </div>
  );
};
export default CounterBox;
