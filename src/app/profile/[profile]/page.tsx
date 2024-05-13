import { ProfileInfo } from '@/components';

interface PageProps {
  params: { profile: string };
}

const Profile = ({ params }: PageProps) => {
  const { profile } = params;

  return (
    <div className="flex flex-col items-center px-5 pb-5 pt-28 lg:px-20 lg:pb-20 lg:pt-36">
      <ProfileInfo profileHandle={profile} />
    </div>
  );
};

export default Profile;
