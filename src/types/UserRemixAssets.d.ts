interface Canvas {
  imageLink: string[];
  ipfsLink: string[];
}
export interface RemixAssets {
  contract: `0x${string}`;
  contractType: string;
  canvasId: number;
  chainId: number;
  canvas: Canvas;
  hash: string;
  slug: string;
}

export interface UserRemixAssets {
  assets?: RemixAssets[];
  isError?: boolean;
  message?: string;
}
