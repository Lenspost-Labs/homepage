import { FC } from 'react';

// TODO: name the props type as ComponentProps
interface Props {
  title: string;
  count: string;
}

// TODO: two props are passed to the component, remove one of them
const TextCounter: FC<Props> = ({ title, count }: Props) => {
  return (
    <div className="flex flex-col items-start space-y-0 lg:space-y-2">
      <p className="text-lg font-bold sm:text-xl lg:text-2xl">{title}</p>
      <p className="gradient-text gradient-text text-xl font-[800] drop-shadow-[0px_4px_11px_rgba(61,11,56,0.13)] sm:text-2xl lg:text-5xl">
        {count}
      </p>
    </div>
  );
};

export default TextCounter;
