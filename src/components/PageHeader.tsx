import { FC } from 'react';

import Carousel from './Carousel';

interface PageHeaderProps {
  backgroundImages: string[];
  isCollection?: boolean;
  isFeatured?: boolean;
  isUser?: boolean;
  title?: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  backgroundImages,
  isCollection,
  isFeatured,
  isUser,
  title
}) => {
  isFeatured = false;
  return (
    <div className="relative  z-0 flex h-44 flex-col items-start overflow-hidden bg-cover bg-center bg-no-repeat sm:h-52 lg:h-96">
      <div className="absolute left-0 top-0 h-44 w-full sm:h-52 lg:h-96">
        <Carousel images={backgroundImages} />
      </div>
      {isCollection && (
        <div className="relative z-10 flex h-full w-full flex-col items-start justify-end space-y-3 p-5 text-center lg:space-y-5 lg:p-20">
          {isFeatured && (
            <p className="rounded-full border border-white/75 px-2 py-1 text-xs font-light uppercase text-white/75 lg:px-3 lg:py-1.5 lg:text-base">
              Featured This Week
            </p>
          )}
          <h1 className="text-2xl font-bold text-white lg:text-7xl">{title}</h1>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
