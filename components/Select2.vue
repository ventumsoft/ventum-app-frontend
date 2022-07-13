<template>
  <select :name="name">
    <slot></slot>
  </select>
</template>

<script>
export default {
  props: [
    'name',
    'options',
    'value',
  ],
  async mounted() {
    await import('select2');
    $.fn.select2.defaults.set('width', '100%');
    $.fn.select2.defaults.set('minimumResultsForSearch', Infinity);
    const $el = $(this.$el);
    $el.select2(this.extendSelect2Options(this.options));
    $el.on('select2:select', event => {
      this.$emit('input', this.$el.value);
      this.$el.dispatchEvent(new Event('change', {bubbles: true}));
    });
  },
  updated() {
    $(this.$el).data('select2')?._syncS();
  },
  destroyed() {
    const $el = $(this.$el);
    $el?.select2('destroy');
  },
  methods: {
    extendSelect2Options() {
      const options = {...this.options};
      if (options.i18nMessageInputTooShort) {
        if (!options.language) {
          options.language = {};
        }
        const {i18nMessageInputTooShort} = options;
        options.language.inputTooShort = ({minimum, input, remaining = minimum - input.length}) =>
          i18nMessageInputTooShort.replace(':minimum', minimum).replace(':remaining', remaining);
        delete options.i18nMessageInputTooShort;
      }
      if (options.ajax) {
        options.ajax.transport = async (params, success, failure) => {
          let data;
          try {
            ({data} = await this.$axios.request({
              method: params.method,
              url: params.url,
              data: (params.method !== 'GET') && params.data || undefined,
              params: (params.method === 'GET') && params.data || undefined,
              progress: false,
              silenceException: true,
            }));
          } catch (exception) {
            failure(exception);
            return;
          }
          success({results: data});
        };
      }
      return options;
    },
  },
}
</script>
