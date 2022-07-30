import { ReduxStore } from "../StoreType";
import { Action, bindActionCreators } from 'redux';
import { Files } from "../../../pages";
import { SelectFile } from "../actions/FileActions";

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
            return {
                files: [],
                currentFile: ''
            }
        case "SELECT_FILE":
            if (action.payload.id && store) {
                return {
                    ...store,
                    currentFile: action.payload.id
                }
            }
        case "CREATE_NEW_FILE":
            if (action.payload.data && store) {
                return {
                    ...store,
                    files: [...store.files, action.payload.data]
                }
            }
        case "UPDATE_FILE_CONTENT_BY_ID":
            if (action.payload.content && action.payload.id && store) {
                // getting file
                for (let file of store.files) {
                    if (file.id === action.payload.id) {
                        file.content = action.payload.content;
                        file.lastChanges = new Date(Date.now())
                        break;
                    }
                }

                return {
                    ...store
                }
            }
        case "DELETE_FILE_BY_ID":
            if (action.payload.id && store) {
                const filtered = store.files.filter(e => e.id !== action.payload.id);
                return {
                    ...store,
                    files: filtered
                }
            }
        default: {
            return {
                files: [],
                currentFile: ''
            }
        }
    }
}