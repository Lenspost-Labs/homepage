import { BACKEND_ENDPOINT } from '@/data';
import { UserRemixAssets } from '@/types';
import Cookies from 'js-cookie';

export const getUserRemixAssets = async (): Promise<UserRemixAssets> => {
  const userId = Cookies.get('userId') || '';

  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/public/shared-canvas-mint-images?q=${userId}`,
      {
        next: {
          revalidate: 3600
        }
      }
    );

    if (response?.ok) {
      const data = await response.json();
      return {
        assets: data
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
