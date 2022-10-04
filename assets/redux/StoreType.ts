import { File } from "../../pages"

export type ReduxStore = {
    files: File[],
    currentFile: string // will contain a file id
}