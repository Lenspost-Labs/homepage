import { BACKEND_ENDPOINT } from '@/data';
import { GetUserAssets } from '@/types';
import Cookies from 'js-cookie';

export const getUserAssets = async (): Promise<GetUserAssets> => {
  const jwtToken = Cookies.get('jwt') || '';

  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/user/canvas`, {
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
        totalPage: data?.totalPages,
        nextPage: data?.nextPage,
        assets: data?.assets
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
