import { RootState } from 'store';

export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const getUserId = (state: RootState) => state.auth.userId;
