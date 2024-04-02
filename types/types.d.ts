export interface FrameData {
  frameId: number | undefined;
  imageUrl: string;
  tokenUri: string;
  minters: {
    minterAddress: string;
    txHash: string;
  }[];
  owner: string;
  isTopUp: boolean;
  allowedMints: number;
  isLike: boolean;
  isRecast: boolean;
  isFollow: boolean;
  redirectLink: string;
  noOfNftsMinited: number;
  contract_address: `0x${string}`;
  contract_type: string;
  creatorSponsored: boolean;
  chainId: `eip155:${string}` | `solana:${string}`;
  slug: string;
}


interface Asset {
  data: {
    width: number;
    height: number;
  };
  id: number;
  imageLink: string;
}

interface TemplateAsset {
  data: {
    width: number;
    height: number;
  };
  id: number;
  image: string;
  name: string;
}

interface NFTAsset{
  title: string;
  imageURL: string | null;
  permaLink: string;
  
}

export interface TemplatesType {
  assets: Asset[];
  totalPage: number;
  nextPage: number;
}

export interface AllAsset {
  data?: {
    width: number;
    height: number;
  };
  id: number;
  imageLink?: string;
  image?: string;
  name?: string;
  title?: string;
  imageURL?: string | null;
  permalink?: string;
  type: 'remix' | 'templates' | 'stickers';
}

export interface NFTType {
  assets: NFTAsset[];
  totalPage: number;
  nextPage: number;
}

export interface StickersType {
  assets: StickerAssets[];
  totalPage: number;
  nextPage: number;
}

export interface StickerAssets {
  id: any;
  image: string;
  dimensions: Dimensions[];
}

export interface Dimensions {
  0: number;
  1: number;
}

export interface MintFrameData {
  tx: string;
  message: string;
}

export interface AuthEvmResponse {
  status: string;
  profileId: string;
  profileHandle: string;
  jwt: string;
  userId: number;
  username: string;
}

export interface TemplateData {
  assets: TemplateAsset[];
  totalPage: number;
  nextPage: number;
}
export interface UpdateFrameData {
  status: string;
  message: string;
}

export interface UserDetails {
  message: {
    username: string;
    mail: string;
    lens_handle: string;
    points: number;
    balance: number;
  };
}

export interface GetCanvasData {
  totalPages: number;
  nextPage: number;
}