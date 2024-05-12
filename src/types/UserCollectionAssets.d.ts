export interface CollectionAssets {
  image: string;
  slug: string;
}

export interface UserCollectionAssets {
  assets?: CollectionAssets[];
  isError?: boolean;
  message?: string;
}
