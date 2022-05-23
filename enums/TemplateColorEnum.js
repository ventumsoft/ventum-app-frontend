const TemplateColorEnum = {
  COLOR_00: '#ff0000',
  COLOR_01: '#ff8000',
  COLOR_02: '#ffff00',
  COLOR_03: '#008000',
  COLOR_04: '#00aeef',
  COLOR_05: '#0000ff',
  COLOR_06: '#8000cc',
  COLOR_07: '#ffc0cc',
  COLOR_08: '#a6792b',
  COLOR_09: '#ffffff',
  COLOR_10: '#808080',
  COLOR_11: '#000000',
};

Object.defineProperty(TemplateColorEnum, 'classesForCheck', {
  value: {
    [TemplateColorEnum.COLOR_00]: 'check-white',
    [TemplateColorEnum.COLOR_01]: 'check-white',
    [TemplateColorEnum.COLOR_02]: 'check-black',
    [TemplateColorEnum.COLOR_03]: 'check-white',
    [TemplateColorEnum.COLOR_04]: 'check-black',
    [TemplateColorEnum.COLOR_05]: 'check-white',
    [TemplateColorEnum.COLOR_06]: 'check-white',
    [TemplateColorEnum.COLOR_07]: 'check-black',
    [TemplateColorEnum.COLOR_08]: 'check-white',
    [TemplateColorEnum.COLOR_09]: 'check-black',
    [TemplateColorEnum.COLOR_10]: 'check-white',
    [TemplateColorEnum.COLOR_11]: 'check-white',
  },
  enumerable: false,
});

export default Object.freeze(TemplateColorEnum);
