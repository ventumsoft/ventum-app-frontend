export default ({app}, inject) => {
  inject('nl2br', (value, breakTag = '<br>') => {
    return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  });
}
