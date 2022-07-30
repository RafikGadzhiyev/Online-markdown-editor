import { Files } from "../../pages"

export type ReduxStore = {
    files: Files[],
    currentFile: string // will contain a file id
}