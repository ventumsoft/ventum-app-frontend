export default ({app: {$axios}, store}, inject) => {
  inject('download', async (endpoint, params, filename) => {
    const {data} = await $axios.get(endpoint, {params, responseType: 'blob'});

    const downloadUrl = (window.URL || window.webkitURL).createObjectURL(data);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    setTimeout(function () {
      URL.revokeObjectURL(downloadUrl);
      link.remove();
    }, 100);
  });
}
