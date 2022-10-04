import { configureStore } from '@reduxjs/toolkit';
import FileActionsSlice from './slices/FileActions.slice';

export const store = configureStore({
    reducer: {
        fileSlice: FileActionsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;