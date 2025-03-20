export type NextFunction = () => void;
type Params = Promise<{ id?: string }>;
export type QueryReq =
  | { next: NextFunction; prevResult?: any; params?: Params }
  | undefined;
