import type { ReduxStore } from "./redux/StoreType";

export const saveDataToLocalStorage = (data: ReduxStore) => {
    localStorage.setItem('main_data', JSON.stringify(data));
}

export const getDataFromLocalStorage = (): ReduxStore => {
    return JSON.parse(localStorage.getItem('main_data') + '');
}