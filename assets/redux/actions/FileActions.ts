import { Files } from "../../../pages"

export const InitState = () => {
    return {
        type: "__INIT__"
    }
}

export const CreateFile = (file: Files) => {
    return {
        type: "CREATE_NEW_FILE",
        payload: {
            data: file
        }
    }
}

export const GetFileContent = (fileId: string) => {
    return {
        type: "GET_FILE_CONTENT_BY_ID",
        payload: {
            id: fileId
        }
    }
}

export const UpdateFileContent = (fileId: string, content: string) => {
    return {
        type: "UPDATE_FILE_CONTENT_BY_ID",
        payload: {
            id: fileId,
            content
        }
    }
}

export const DeleteFile = (fileId: string) => {
    return {
        type: "DELETE_FILE_BY_ID",
        payload: {
            id: fileId
        }
    }
}

export const SelectFile = (fileId: string) => {
    return {
        type: "SELECT_FILE",
        payload: {
            id: fileId
        }
    }
}