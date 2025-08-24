import { useDispatch, useSelector } from 'react-redux';
import type { store } from '.';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: typeof useSelector = useSelector;
