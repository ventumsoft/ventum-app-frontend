import Noty from 'noty';

export default ({app}, inject) => {
  inject('noty', (text, type = 'alert', layout = 'topRight') => {
    (new Noty({
      width: 200,
      text: text,
      type: type,
      dismissQueue: true,
      timeout: 4000,
      layout: layout,
      closeWith: ['click', 'button'],
    })).show();
  });
}
