import { GetAssetsByCampaign } from '@/types';
import { BACKEND_ENDPOINT } from '@/data';

export const getAssetsByCampaign = async (
  campaignName: string,
  page: number
): Promise<GetAssetsByCampaign> => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/asset/canvases-by-campaign/${campaignName}?page=${page}&limit=20`,
      {
        next: {
          revalidate: 3600
        }
      }
    );

    if (response?.ok) {
      const data = await response.json();
      return {
        currentPage: data?.currentPage,
        totalPages: data?.totalPages,
        nextPage: data?.nextPage,
        assets: data?.data
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
