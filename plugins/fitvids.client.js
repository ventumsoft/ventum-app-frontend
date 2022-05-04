import fitvids from 'fitvids';

export default ({app}, inject) => {
  app.router.afterEach((to, from) => {
    setTimeout(() => {
      resizeVideos();
    }, 0)
  });
}

function resizeVideos() {
  fitvids('#content,#footer,#slider:not(.revslider-wrap),.landing-offer-media,.portfolio-ajax-modal', {
    players: "iframe[src^='http://www.dailymotion.com/embed']",
    ignore: '.no-fv'
  });
}
