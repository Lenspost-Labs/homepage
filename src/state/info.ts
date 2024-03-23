import {create} from 'zustand';
import {AuthEvmResponse} from '../../types/types';
interface ResponseState{
    response: AuthEvmResponse | null;
    setResponse: (response: AuthEvmResponse | null) => void;
}

export const useResponseStore = create<ResponseState>((set) => ({
    response: null,
    setResponse: (response) => set({response}),
}));