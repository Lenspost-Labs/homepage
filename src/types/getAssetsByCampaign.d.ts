export interface AssetsByCampaign {
  imageLink?: string[];
  ipfsLink?: string[];
  platform?: string;
  ownerID?: number;
  txHash?: string;
  id?: number;
}

export interface GetAssetsByCampaign {
  assets?: AssetsByCampaign[];
  currentPage?: number;
  totalPages?: number;
  nextPage?: number;
  isError?: boolean;
  message?: string;
}
