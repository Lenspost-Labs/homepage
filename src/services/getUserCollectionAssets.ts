import { getFromLocalStorage } from '@/utils/localStorage';
import { UserCollectionAssets } from '@/types';
import { BACKEND_ENDPOINT } from '@/data';

export const getUserCollectionAssets =
  async (): Promise<UserCollectionAssets> => {
    const userId = getFromLocalStorage('userId') || '';

    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/public/canvases-by-user?q=${userId}`,
        {
          next: {
            revalidate: 3600
          }
        }
      );

      if (response?.ok) {
        const data = await response.json();
        return {
          assets: data?.message
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
