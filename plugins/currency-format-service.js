import numberFormat from 'number_format-php';

export default ({app, store}, inject) => {
  inject('currency', (value, {tax} = {}) => {
    const currencyFormat = store.state.site.settings?.['currency_format'];
    const currencyAbbr = store.state.site.settings?.['general:currency-abbr'];
    const currencyAbbrPosition = store.state.site.settings?.['general:currency-abbr-pos'];

    const formattedNumber = numberFormat(value, currencyFormat?.decimals, currencyFormat?.dec_point, currencyFormat?.thousands_sep);

    return (currencyAbbrPosition === 'postfix') ?
      (formattedNumber + ' ' + currencyAbbr) :
      (currencyAbbr + ' ' + formattedNumber);
  });
}
