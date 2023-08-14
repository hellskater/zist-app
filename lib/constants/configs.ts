export const defaultZistConfig = {
  description: 'zist config file',
  public: false,
  files: {
    'zist.config.json': {
      content: JSON.stringify({
        version: '0.0.1',
        description: 'zist config file',
      }),
    },
  },
};
