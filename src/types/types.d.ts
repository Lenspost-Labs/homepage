interface ProfileRemixAsset {
  id: number;
}

interface Asset {
  data: {
    height: number;
    width: number;
  };
  imageLink: string;
  ownerId: number;
  ownerId: string;
  id: number;
}

interface TemplateAsset {
  data: {
    height: number;
    width: number;
  };
  image: string;
  name: string;
  id: number;
}

interface CollectionData {
  canvas: ProfileCollections;
  id: number;
}

interface NFTAsset {
  imageURL: string | null;
  permaLink: string;
  title: string;
}

interface ProfileCollections {
  imageLink: string[];
  ownerId: number;
}

interface UserCanvaType {
  slugs: string[];
  image: string;
}

export interface UserCanvas {
  message: UserCanvaType[];
}

export interface ProfileCollectionData {
  data: CollectionData[];
  totalPage: number;
  nextPage: number;
}

export interface DegenAssets {
  imageLink: string[];
  ipfsLink: string[];
  isPublic: boolean;
  ownerId: number;
  id: number;
}

export interface CollectionType {
  description: string;
  isVerified: boolean;
  comments: number;
  creator: string;
  reposts: number;
  height: number;
  image: string;
  title: string;
  price: string;
  likes: number;
  width: number;
  id: number;
}
interface ProfileCollectionCanvas {
  imageLink: string[];
  ipfsLink: string[];
}
export interface ProfileCollectionData {
  canvas: ProfileCollectionCanvas;
  contractType: string;
  canvasId: number;
  chainId: number;
  slug: string;
  hash: string;
  hash: string;
}

export interface DegenType {
  data: DegenAssets[];
  totalPage: number;
  nextPage: number;
}

export interface TemplatesType {
  totalPage: number;
  nextPage: number;
  assets: Asset[];
}

export interface AllAsset {
  data?: {
    height: number;
    width: number;
  };
  type: 'templates' | 'stickers' | 'remix';
  imageURL?: string | null;
  imageLink?: string;
  permalink?: string;
  image?: string;
  title?: string;
  name?: string;
  id: number;
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
  dimensions: Dimensions[];
  author: string;
  image: string;
  id: any;
}

export interface Dimensions {
  0: number;
  1: number;
}

export interface AuthEvmResponse {
  profileHandle: string;
  profileId: string;
  username: string;
  userId: string;
  status: string;
  jwt: string;
}

export interface TemplateData {
  assets: TemplateAsset[];
  totalPage: number;
  nextPage: number;
}

export interface UserDetails {
  message: {
    lens_handle: string;
    username: string;
    balance: number;
    points: number;
    mail: string;
  };
}

export interface GetCanvasData {
  totalPages: number;
  nextPage: number;
}

interface CollectionProfile
  extends ProfileCollections,
    CollectionData,
    ProfileCollectionData {}
