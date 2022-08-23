import swal from 'sweetalert';

export default ({app}, inject) => {
  inject('confirm', options => new Promise(resolve => swal({
    title: options.mainTitle,
    text: options.mainSubTitle,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF5350',
    confirmButtonText: options.mainYesBtn,
    cancelButtonText: options.mainNoBtn,
    closeOnConfirm: false,
    closeOnCancel: false
  }, isConfirm => {
    swal(isConfirm ? {
      title: options.yesTitle,
      text: options.yesSubTitle,
      confirmButtonColor: '#66BB6A',
      type: 'success',
      timer: 500
    } : {
      title: options.noTitle,
      text: options.noSubTitle,
      confirmButtonColor: '#2196F3',
      type: 'error',
      timer: 500
    });
    resolve(isConfirm);
  })));
}
