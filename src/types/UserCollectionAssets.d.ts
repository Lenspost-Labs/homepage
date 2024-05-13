export interface CollectionAssets {
  image: string;
  slugs: string;
}

export interface UserCollectionAssets {
  assets?: CollectionAssets[];
  isError?: boolean;
  message?: string;
}
