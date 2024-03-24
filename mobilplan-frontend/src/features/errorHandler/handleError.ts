import { OptionsObject, useSnackbar } from 'notistack';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {SerializedError} from "@reduxjs/toolkit";

export interface CustomError {
    code?: string;
    msg?: string;
}

export function handleApiError(
    error: FetchBaseQueryError | CustomError | SerializedError | Error | any,
    defaultMessage: string,
    enqueueSnackbar: (message: string, options?: OptionsObject) => void
) {
    let errorMessage = defaultMessage;
    if ('status' in error && error.status === 'FETCH_ERROR') {
        errorMessage = "Problema de conexão ou servidor inacessível.";
    } else if ('data' in error && error.data) {
        const errorData = error.data as CustomError;
        errorMessage = errorData.msg || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    enqueueSnackbar(errorMessage, { variant: "error" });
    console.error(errorMessage, error);
}
