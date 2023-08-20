import { ZistConfig } from '../types/zist';

const parseDescription = (description: string) => {
  if (!description?.includes('<-ZIST-CONFIG->')) {
    return {
      descriptionText: description,
      config: {} as ZistConfig,
    };
  }
  const [descriptionText, configText] = description.split('<-ZIST-CONFIG->');

  const config = JSON.parse(configText || '{}');

  return {
    descriptionText,
    config: config as ZistConfig,
  };
};

export const getDescription = (description: string) => {
  const { descriptionText } = parseDescription(description);

  return descriptionText;
};

export const getZistConfig = (description: string) => {
  const { config } = parseDescription(description);

  return config;
};

export const updateDescription = (description: string, config: ZistConfig) => {
  const { descriptionText } = parseDescription(description);

  return `${descriptionText}<-ZIST-CONFIG->${JSON.stringify(config)}`;
};
