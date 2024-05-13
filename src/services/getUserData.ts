import { BACKEND_ENDPOINT } from '@/data';
import { UserDetails } from '@/types';
import Cookies from 'js-cookie';

export const getUserData = async (): Promise<UserDetails> => {
  const jwtToken = Cookies.get('jwt') || '';

  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/user`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      },
      next: {
        revalidate: 3600
      }
    });

    if (response?.ok) {
      const data = await response.json();
      return {
        lens_handle: data?.message?.lens_handle,
        username: data?.message?.username,
        balance: data?.message?.balance,
        points: data?.message?.points,
        mail: data?.message?.mail
      };
    } else {
      return {
        message: response?.status + ' - ' + response?.statusText,
        isError: true
      };
    }
  } catch (error) {
    return {
      message: "Couldn't fetch data",
      isError: true
    };
  }
};
