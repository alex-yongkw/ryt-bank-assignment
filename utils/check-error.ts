export const exist = (errorMsg: string | undefined): boolean => {
  return errorMsg !== undefined && errorMsg.length > 0;
};
