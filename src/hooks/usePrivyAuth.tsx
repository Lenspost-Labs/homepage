import { useLogin, usePrivy } from '@privy-io/react-auth';
import { saveToLocalStorage } from '@/utils/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useDisconnect } from 'wagmi';
import { authEvm } from '@/services';

const usePrivyAuth = () => {
  const { logout } = usePrivy();
  const { disconnect } = useDisconnect();

  const { mutateAsync: evmAuthAsync } = useMutation({
    mutationKey: ['authEvm'],
    mutationFn: authEvm
  });

  const { login } = useLogin({
    onComplete: (user) => {
      // console.log('Logged in user by privy');
      // console.log(user);
      evmAuthAsync(user?.wallet?.address)
        .then((res) => {
          // console.log('success by auth endpoint');
          // console.log(res);
          //   toast("Login successful");
          saveToLocalStorage(`evmAuth`, true);
          saveToLocalStorage(`jwt`, res.jwt);
          saveToLocalStorage(`userAuthTime`, new Date().getTime());
          saveToLocalStorage(`userAddress`, user?.wallet?.address);
          saveToLocalStorage(`username`, user?.wallet?.address);
          saveToLocalStorage(`lensAuth`, {
            profileHandle: res?.profileHandle,
            profileId: res?.profileId
          });
        })
        .catch((error) => {
          // console.log('error by auth endpoint');
          // console.log(error);
          // toast("Something went wrong");
          logout();
          disconnect();
        });
    },
    onError: (error) => {
      // console.log('error by privy');
      // console.log(error);
      // toast.error("Something went wrong");
      logout();
      disconnect();
    }
  });

  return {
    login
  };
};

export default usePrivyAuth;
