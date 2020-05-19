export const getEnv = () => {
  return process.env.NODE_ENV || 'development';
};

export const getServerPort = () => {
  return process.env.SERVER_PORT || 3001;
};
