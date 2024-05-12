'use client';

import { cn } from '@/utils';
import { FC } from 'react';

interface TabsProps {
  setActive: (active: string) => void;
  isTabStyle?: boolean;
  className?: string;
  tabs: string[];
  active: string;
}

const Tabs: FC<TabsProps> = ({
  isTabStyle = true,
  setActive,
  className,
  active,
  tabs
}) => {
  const Tab = ({ selected, tab }: { selected: boolean; tab: string }) => {
    return (
      <div
        className={cn(
          'cursor-pointer rounded-full px-4 py-1.5 text-base font-medium',
          {
            'text-[rgba(44,52,107,0.64)]': !selected && isTabStyle,
            'bg-[rgba(44,52,107,0.08)]': selected && isTabStyle,
            'text-[rgba(44,52,107,1)]': selected && isTabStyle,
            underline: selected && !isTabStyle,
            'font-semibold': selected
          },
          className
        )}
        onClick={() => setActive(tab)}
      >
        {tab}
      </div>
    );
  };
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-row items-center space-x-2">
        {tabs.map((tab, index) => (
          <Tab selected={tab === active} key={index} tab={tab} />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
