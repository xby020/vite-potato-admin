import { request as req } from './axios';
import { RequestFunctionParams, Method } from 'yapi-to-typescript';

export default async function request<TResData>(
  payload: RequestFunctionParams
): Promise<TResData> {
  const { path, method, data, hasFileData, fileData } = payload;

  const requstOption = {
    url: path,
    method: Method[method],
    data: data
  };

  if (hasFileData) {
    const formData = new FormData();
    Object.keys(fileData).forEach((key) => {
      formData.append(key, fileData[key]);
    });
    requstOption.data = formData;
  }

  return await req(requstOption);
}
