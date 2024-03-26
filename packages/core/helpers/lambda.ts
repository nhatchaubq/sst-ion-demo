export const success = (message: string = "OK") => {
  return {
    isError: false,
    message,
  };
};

export const error = (message: string) => {
  return {
    isError: true,
    message,
  };
};
