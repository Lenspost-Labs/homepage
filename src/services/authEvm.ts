import { getFromLocalStorage } from '@/utils/localStorage';
import { AuthEvmResponse } from '@/types';
import { BACKEND_ENDPOINT } from '@/data';

export const authEvm = async (
  evm_address: `0x${string}` | any
): Promise<AuthEvmResponse> => {
  try {
    const jwtFromPrivy = await getFromLocalStorage('privy:token');

    const response = await fetch(`${BACKEND_ENDPOINT}/auth/evm`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${jwtFromPrivy}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        evm_address
      }),
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
