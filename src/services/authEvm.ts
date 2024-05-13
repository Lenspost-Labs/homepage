import { AuthEvmResponse } from '@/types';
import { BACKEND_ENDPOINT } from '@/data';

export const authEvm = async (
  evm_address: `0x${string}` | any,
  signature: any,
  message: string
): Promise<AuthEvmResponse> => {
  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/auth/evm`, {
      body: JSON.stringify({
        evm_address,
        signature,
        message
      }),

      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (response?.ok) {
      const data = await response.json();
      return {
        username: data?.username,
        userId: data?.userId,
        jwt: data?.jwt
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
