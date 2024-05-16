import { ProfileInfo } from '@/components';

interface PageProps {
  params: {
    profile: string;
  };
}

const Profile = ({ params }: PageProps) => {
  const { profile } = params;

  return (
    <div className="md:first-viewport flex flex-col items-center bg-gradient-to-b from-[rgba(55,93,251,0.18)] to-transparent px-5 pb-5 pt-28 lg:px-20 lg:pb-20 lg:pt-36">
      <ProfileInfo profileHandle={profile} />
    </div>
  );
};

export default Profile;
