export const imageTypeRefine = (value: unknown): boolean => {
  if (!(value instanceof File)) return true;
  const { type } = value as File;
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  return validTypes.includes(type);
};
export const imageSizeRefine = (value: unknown): boolean => {
  if (!(value instanceof File)) return true;
  if (value.size > 10485760) return false;
  return true;
};
