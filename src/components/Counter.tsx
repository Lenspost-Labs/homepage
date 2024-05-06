import { ArrowUp } from 'lucide-react';
import { FC } from 'react';

interface Props {
  percentage: string;
  week: string;
}
const Counter: FC<Props> = ({ percentage, week }) => {
  return (
    <div className="relative z-10 flex flex-col items-start space-y-4">
      <div className="-mr-2 -mt-1 flex flex-row items-center justify-between space-x-1 rounded-[30px] border border-theme-light-purple bg-white/80 px-1 py-1 backdrop-blur sm:-mt-2 lg:-mr-5 lg:-mt-5 lg:space-x-2 lg:px-2">
        <div>
          <ArrowUp className="h-4 w-4 text-theme-purple" />
        </div>
        <div className="flex flex-row items-center space-x-1">
          <p className="text-xs text-theme-purple sm:text-sm lg:text-base">
            {percentage}%
          </p>
          <p className="text-xs text-theme-gray sm:text-sm lg:text-base">
            {week} week
          </p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
