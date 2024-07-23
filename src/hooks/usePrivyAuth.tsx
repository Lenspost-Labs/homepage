import { useLogin, usePrivy } from '@privy-io/react-auth';
import { saveToLocalStorage } from '@/utils/localStorage';
import { useMutation } from '@tanstack/react-query';
import { useDisconnect } from 'wagmi';
import { authEvm } from '@/services';
import { toast } from '@/ui';

const usePrivyAuth = () => {
  const { logout } = usePrivy();
  const { disconnect } = useDisconnect();

  const { mutateAsync: evmAuthAsync } = useMutation({
    mutationKey: ['authEvm'],
    mutationFn: authEvm
  });

  const { login } = useLogin({
    onComplete: (user) => {
      evmAuthAsync(user?.wallet?.address)
        .then((res) => {
          saveToLocalStorage(`evmAuth`, true);
          saveToLocalStorage(`jwt`, res.jwt);
          saveToLocalStorage(`userAuthTime`, new Date().getTime());
          saveToLocalStorage(`userAddress`, user?.wallet?.address);
          saveToLocalStorage(`username`, user?.wallet?.address);
          saveToLocalStorage(`lensAuth`, {
            profileHandle: res?.profileHandle,
            profileId: res?.profileId
          });
          toast({
            description: 'You have successfully logged In',
            title: 'Successfully logged in',
            variant: 'default'
          });
        })
        .catch((error) => {
          logout();
          disconnect();
        });
    },
    onError: (error) => {
      logout();
      disconnect();
    }
  });

  return {
    login
  };
};

export default usePrivyAuth;
