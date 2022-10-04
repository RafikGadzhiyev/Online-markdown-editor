import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { File } from '../../../pages'
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../../globalMethods'

interface IState {
    data: {
        files: File[],
        currentFile: string
    }
}

const initialState: IState = {
    data: {
        files: [],
        currentFile: ''
    }
}

const FileActionsSlice = createSlice({
    name: 'file-actions',
    initialState,
    reducers: {
        initializeFileData(store) {
            const initializedFileData: IState = {
                data: getDataFromLocalStorage() || {
                    File: [],
                    currentFile: ''
                }
            }

            return initializedFileData;
        },
        selectFile(store, action: PayloadAction<string>) {
            store.data.currentFile = action.payload;
            saveDataToLocalStorage(store.data);
        },
        createFile(store, action: PayloadAction<File>) {
            store.data.files.push(action.payload);
            saveDataToLocalStorage(store.data);
        },
        updateFile(store, action: PayloadAction<{ id: string, content: string }>) {
            store.data.files = store.data.files.map((e: File) => {
                if (e.id === action.payload.id) {
                    e.content = action.payload.content;
                    e.lastChanges = new Date(Date.now());
                }

                return e;
            })
            saveDataToLocalStorage(store.data);
        },
        deleteFile(store, action: PayloadAction<string>) {
            store.data.files = store.data.files.filter((e) => e.id !== action.payload);
            saveDataToLocalStorage(store.data);
        }
    }
})

export const { initializeFileData, selectFile, createFile, updateFile, deleteFile } = FileActionsSlice.actions;

export default FileActionsSlice.reducer;