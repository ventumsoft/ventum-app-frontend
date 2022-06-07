<template>
  <BsModal v-on="$listeners">
    <template v-slot:title>
      {{ integration.embedded.title }}
    </template>
    <template v-slot:body>
      <form class="product-creator-embedded-form">
        <div v-show="false" class="form-progress" style="display: block;">
          <div class="progress"><div class="progress-bar progress-bar-striped active"></div></div>
        </div>
        <div v-if="integration.embedded.firstField !== undefined" class="col_full">
          <label for="integrationEmbeddedCreatorDesignOrderMessage1">
            {{ integration.embedded.firstField }} <small>*</small>
          </label>
          <textarea
            class="required form-control"
            id="integrationEmbeddedCreatorDesignOrderMessage1"
            name="message1"
            rows="6"
            cols="30"
            required
          ></textarea>
        </div>
        <div v-if="integration.embedded.secondField !== undefined" class="col_full">
          <label for="integrationEmbeddedCreatorDesignOrderMessage2">
            {{ integration.embedded.secondField }} <small>*</small>
          </label>
          <textarea
            class="required form-control"
            id="integrationEmbeddedCreatorDesignOrderMessage2"
            name="message2"
            rows="6"
            cols="30"
            required
          ></textarea>
        </div>
        <template v-if="integration.embedded.files">
          <div class="col_full">
            <label for="integrationEmbeddedCreatorDesignOrderFiles">
              {{ integration.embedded.files.title }}
            </label>
            <input
              id="integrationEmbeddedCreatorDesignOrderFiles"
              type="file"
              name="files[]"
              class="file-loading fileinput"
              multiple
              data-show-upload="false"
              data-show-caption="true"
              data-show-preview="true"
              data-preview-file-type="image"
              data-main-class="input-group-md"
              data-browse-class="btn btn-warning"
              :data-max-file-count="integration.embedded.files.maxCount"
              :data-max-file-size="integration.embedded.files.maxSize / 1024"
              :accept="integration.embedded.files.types.join(',')"
              :data-allowed-file-extensions="integration.embedded.files.types"
            >
          </div>
          <div v-if="integration.embedded.files.url" class="col_full">
            <label for="integrationEmbeddedCreatorDesignOrderFilesUrl">
              {{ integration.embedded.files.url.title }}
            </label>
            <input
              id="integrationEmbeddedCreatorDesignOrderFilesUrl"
              class="form-control"
              type="url"
              name="filesUrl"
              :placeholder="integration.embedded.files.url.placeholder"
            >
          </div>
        </template>
        <div class="product-creator-embedded-options">
          <ContentPageProductCalculatorOptions
            v-if="product.calculator.options?.length"
            :params="params"
            :defaults="product.calculator.defaults"
            :options="product.calculator.options.filter(option => option.isOnlyForApps?.length && option.isOnlyForApps.includes(integration.creator))"
          />
        </div>
        <div class="col_full">
          <div class="fleft btn-link product-creator-embedded-price">
            <div v-if="priceData.formatted === null" class="form-process" style="display: block;"></div>
            <Transition><span v-if="priceData.formatted !== null">{{ priceData.formatted }}</span></Transition>
          </div>
          <button type="submit" class="button button-reveal button-rounded tright fright nomargin">
            <span>{{ $trans('product.button.order') }}</span>
            <i class="icon-angle-right"></i>
          </button>
          <div class="clearfix"></div>
        </div>
      </form>
    </template>
  </BsModal>
</template>

<script>
import {mapState} from 'vuex';
import _debounce from 'lodash/debounce';

export default {
  props: [
    'integration',
    'params',
  ],
  data: () => ({
    priceData: {
      error: null,
      value: null,
      formatted: null,
      valueWithDiscount: null,
      formattedWithDiscount: null,
      discountBonusInfo: null,
    },
  }),
  computed: {
    ...mapState('page', ['product']),
  },
  mounted() {
    this.updatePrice();
  },
  watch: {
    params: {
      handler() {
        this.updatePrice();
      },
      deep: true,
    },
  },
  methods: {
    updatePrice: _debounce(async function () {
      for (const key in this.priceData) {
        this.priceData[key] = null;
      }
      ({data: this.priceData} = await this.$axios.post('products/price', {
        productId: this.product.id,
        params: this.params,
        usingPrice: this.integration.usingPrice,
      }, {progress: false}));
    }, 10),
  },
}
</script>
