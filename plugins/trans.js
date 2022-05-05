export default ({app, store}, inject) => {
  inject('trans', key => {
    const [group, ...phrase] = key.split('.');
    return store.state.site.trans?.[group]?.[phrase.join('.')] || key;
  });
}
