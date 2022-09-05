import {onPageLoadedAndInteracted} from '@/plugins/load-interacted.client.js';

export default async function ({store}) {
  if (!store.state.site.settings?.['seo-integration:google-shopping-reviews:enabled'] ||
    !store.state.site.settings?.['seo-integration:google-shopping-reviews:show-badge']
  ) {
    return;
  }

  await new Promise(resolve => onPageLoadedAndInteracted(event => resolve()));

  const googleShoppingScript = document.createElement('script');
  googleShoppingScript.setAttribute('type', 'text/javascript');
  googleShoppingScript.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=renderBadge');
  window.renderBadge = function() {
    const ratingBadgeContainer = document.createElement('div');
    document.body.appendChild(ratingBadgeContainer);
    window.gapi.load('ratingbadge', function() {
      window.gapi.ratingbadge.render(ratingBadgeContainer, {
        merchant_id: store.state.site.settings?.['seo-integration:google-shopping-reviews:merchant-id'],
        position: store.state.site.settings?.['seo-integration:google-shopping-reviews:badge-position'],
      });
    });
  }
  document.body.appendChild(googleShoppingScript);
}
