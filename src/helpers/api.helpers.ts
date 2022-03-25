import axios, { Canceler } from "axios";
import { toast } from "react-toastify";
import { apiService } from "../services/app.service";

export const CancelToken = axios.CancelToken;

export const handleGetFromAPI = async <T>(
  apiUrl: string,
  createAbortController?: (c: Canceler) => Canceler
): Promise<T | Error | undefined> => {
  const cancelToken = createAbortController
    ? new CancelToken(createAbortController)
    : undefined;
  try {
    const { data } = await apiService.get(apiUrl, {
      cancelToken,
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const handleError = (err: unknown) => {
  Promise.reject(err);
  if (err instanceof Error) {
    toast.error(err.message);
    return err;
  }
};
