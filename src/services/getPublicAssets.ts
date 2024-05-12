import { BACKEND_ENDPOINT } from '@/data';
import { GetPublicAssets } from '@/types';

export const getPublicAssets = async (
  page: number
): Promise<GetPublicAssets> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/template/user?page=${page}`,
      {
        next: {
          revalidate: 3600
        }
      }
    );
    if (response?.ok) {
      const data = await response.json();
      return {
        totalPage: data?.totalPage,
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
