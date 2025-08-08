export type Result<T> = {
  success: T | null;
  failure: string | null;
};

export function ok<T>(data: T): Result<T> {
  return { success: data, failure: null };
}

export function fail<T>(message: string): Result<T> {
  return { success: null, failure: message };
}
