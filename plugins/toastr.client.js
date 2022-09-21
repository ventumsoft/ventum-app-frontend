import toastr from 'toastr';
//import toastr from 'toastr/build/toastr.min';

toastr.options.closeHtml = '<button><i class="icon-remove"></i></button>';

export default ({app}, inject) => {
  inject('toastr', (message, type = 'info', positionClass = 'toast-top-right', closeButton = false) => {
    toastr.clear();

    toastr.options.positionClass = positionClass;
    toastr.options.closeButton = closeButton;

    if (type === 'warning') {
      toastr.warning(message);
    } else if (type == 'error') {
      toastr.error(message);
    } else if (type == 'success') {
      toastr.success(message);
    } else {
      toastr.info(message);
    }
  });
}
