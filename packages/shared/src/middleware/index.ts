import authMiddleware from './authMiddleware';

const middlewares = {
  authMiddleware,
};

export type TKeyMiddlewares = keyof typeof middlewares;
export default middlewares;
