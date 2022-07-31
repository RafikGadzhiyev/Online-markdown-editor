import { ReduxStore } from "../StoreType";
import { Action } from 'redux';
import { Files } from "../../../pages";

interface ActionWithPayload extends Action {
    payload: {
        id?: string,
        data?: Files,
        content?: string
    }
}

export const MainReducer = (store: ReduxStore | undefined, action: ActionWithPayload): ReduxStore => {
    switch (action.type) {
        case "__INIT__":
            const initialState: ReduxStore = getDataFromLocalStorage() || {
                files: [],
                currentFile: ''
            };
            return initialState
        case "SELECT_FILE":
            if (action.payload.id && store) {
                const newState: ReduxStore = {
                    ...store,
                    currentFile: action.payload.id
                };
                saveDataToLocalStorage(newState);
                return newState
            }
        case "CREATE_NEW_FILE":
            if (action.payload.data && store) {
                const newState = {
                    ...store,
                    files: [...store.files, action.payload.data]
                };
                saveDataToLocalStorage(newState)
                return newState;
            }
        case "UPDATE_FILE_CONTENT_BY_ID":
            if (action.payload.content && action.payload.id && store) {
                for (let file of store.files) {
                    if (file.id === action.payload.id) {
                        file.content = action.payload.content;
                        file.lastChanges = new Date(Date.now())
                        break;
                    }
                }
                const newState: ReduxStore = { ...store };
                saveDataToLocalStorage(newState);
                return newState;
            }
        case "DELETE_FILE_BY_ID":
            if (action.payload.id && store) {
                const filtered = store.files.filter(e => e.id !== action.payload.id);
                const newState: ReduxStore = {
                    ...store,
                    files: filtered
                }
                saveDataToLocalStorage(newState);
                return newState
            }
        default: {
            return {
                files: [],
                currentFile: ''
            }
        }
    }
}

const saveDataToLocalStorage = (data: ReduxStore) => {
    localStorage.setItem('main_data', JSON.stringify(data));
}

const getDataFromLocalStorage = (): ReduxStore => {
    return JSON.parse(localStorage.getItem('main_data') + '');
}