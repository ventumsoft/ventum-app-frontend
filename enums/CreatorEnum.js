const CreatorEnum = {
  UNIVERSAL: 'universal',
  UPLOADER: 'uploader',
  SIMPLOADER: 'simploader',
  DESIGN_ORDER: 'design-order',
  BUY_BUTTON: 'buy-button',
  CALC_REQUEST: 'calc-request',
};

Object.defineProperty(CreatorEnum, 'isEmbedded', {
  value: {
    [CreatorEnum.UNIVERSAL]: false,
    [CreatorEnum.UPLOADER]: false,
    [CreatorEnum.SIMPLOADER]: true,
    [CreatorEnum.DESIGN_ORDER]: true,
    [CreatorEnum.BUY_BUTTON]: true,
    [CreatorEnum.CALC_REQUEST]: true,
  },
  enumerable: false,
});

Object.defineProperty(CreatorEnum, 'iconByCreator', {
  value: {
    [CreatorEnum.UNIVERSAL]: 'icon-magic',
    [CreatorEnum.UPLOADER]: 'icon-line2-cloud-upload',
    [CreatorEnum.SIMPLOADER]: 'icon-line-upload',
    [CreatorEnum.DESIGN_ORDER]: 'icon-pen',
    [CreatorEnum.BUY_BUTTON]: 'icon-line2-basket',
    [CreatorEnum.CALC_REQUEST]: 'icon-calculator',
  },
  enumerable: false,
});

export default Object.freeze(CreatorEnum);
