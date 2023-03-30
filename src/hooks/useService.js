import { useAuthContext } from '../contexts/AuthContext';

export const useService = (serviceFactory) => {
    const { token } = useAuthContext();

    const service = serviceFactory(token);

    return service;
};