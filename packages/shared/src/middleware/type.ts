export interface IMiddlewareArguments {
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;
}

export type TPromiseReturn = {
  success: boolean;
  payload?: any;
};

export type TMiddlewareReturn = (payload: any) => Promise<TPromiseReturn>;
