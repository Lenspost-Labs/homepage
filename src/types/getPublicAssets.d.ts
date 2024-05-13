interface AssetsRecipients {
  recipient: `0x${string}`;
  elementId: string;
}

interface Data {
  height: number;
  width: number;
}

export interface PublicAssets {
  assetsRecipients: AssetsRecipients[];
  ownerAddress: `0x${string}`;
  ownerId: number | any;
  allowList: string[];
  imageLink: string[];
  gatedWith: string[];
  ipfsLink: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  isGated: boolean;
  tags: string[];
  slug: string[];
  params: any;
  data: Data;
  id: number;
}

export interface GetPublicAssets {
  assets?: PublicAssets[];
  nextPage?: number | any;
  totalPage?: number;
  isError?: boolean;
  message?: string;
}
