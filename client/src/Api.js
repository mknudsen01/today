const API = function()  {
  const url = 'http://localhost:3000';
  const maxSizeParamConfig = {
    params: {
      size: 2000
    }
  };

  return {
    url,
    maxSizeParamConfig,
  };
};

export default new API();
