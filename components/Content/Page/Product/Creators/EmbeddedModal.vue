<template>
  <BsModal
    v-if="integration"
    @closed="$store.commit('product/setCurrentActiveEmbeddedIntegration', null)"
  >
    <template v-slot:title>
      {{ integration.embedded.title }}
    </template>
    <template v-slot:body>
      <form
        class="product-creator-embedded-form"
        @submit.prevent="$store.dispatch('product/handleOrderSubmit', {
          integration,
          embeddedCreatorFormData: {...formData},
        })"
      >
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
            rows="6"
            cols="30"
            required
            v-model="formData.message1"
          ></textarea>
        </div>
        <div v-if="integration.embedded.secondField !== undefined" class="col_full">
          <label for="integrationEmbeddedCreatorDesignOrderMessage2">
            {{ integration.embedded.secondField }} <small>*</small>
          </label>
          <textarea
            class="required form-control"
            id="integrationEmbeddedCreatorDesignOrderMessage2"
            rows="6"
            cols="30"
            required
            v-model="formData.message2"
          ></textarea>
        </div>
        <template v-if="integration.embedded.files">
          <div class="col_full">
            <label for="integrationEmbeddedCreatorDesignOrderFiles">
              {{ integration.embedded.files.title }}
            </label>
            <BsFileInput
              id="integrationEmbeddedCreatorDesignOrderFiles"
              class="file-loading fileinput"
              multiple
              :options="{
                showUpload: false,
                showCaption: true,
                showPreview: true,
                previewFileType: 'image',
                mainClass: 'input-group-md',
                browseClass: 'btn btn-warning',
                browseIcon: '<i class=icon-folder-open></i>',
                swapButtonsPlacement: true,
                maxFileCount: integration.embedded.files.maxCount,
                maxFileSize: integration.embedded.files.maxSize / 1024,
                allowedFileExtensions: integration.embedded.files.types,
              }"
              :accept="integration.embedded.files.types.join(',')"
              @change.native="formData.files = $event.target.files"
            />
          </div>
          <div v-if="integration.embedded.files.url" class="col_full">
            <label for="integrationEmbeddedCreatorDesignOrderFilesUrl">
              {{ integration.embedded.files.url.title }}
            </label>
            <input
              id="integrationEmbeddedCreatorDesignOrderFilesUrl"
              class="form-control"
              type="url"
              :placeholder="integration.embedded.files.url.placeholder"
              v-model="formData.filesUrl"
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
          <ContentPageProductCalculatorOptions
            v-if="kitComponent?.calculator?.options?.length"
            :key="'integration-' + integration.id + '-kit-component-' + kitComponent.id + '-options'"
            :defaults="kitComponent.calculator.defaults"
            :options="kitComponent.calculator.options.filter(option => option.isOnlyForApps?.length && option.isOnlyForApps.includes(integration.creator))"
          />
          <ContentPageProductCalculatorOptions
            v-if="quantityComponent?.calculator?.options?.length"
            :key="'integration-' + integration.id + '-quantity-component-' + quantityComponent.id + '-options'"
            :defaults="product.calculator.defaults"
            :options="quantityComponent.calculator.options.filter(option => option.isOnlyForApps?.length && option.isOnlyForApps.includes(integration.creator))"
          />
          <template v-if="product.calculator.compoundComponents?.length">
            <ContentPageProductCreatorsCompoundComponentParams
              v-for="component of product.calculator.compoundComponents"
              :key="component.id"
              :integration="integration"
              :component="component"
              :defaults="product.calculator.defaults"
            />
          </template>
        </div>
        <div class="col_full">
          <div class="fleft btn-link product-creator-embedded-price">
            <div v-if="priceData.formatted === null" class="form-process" style="display: block;"></div>
            <Transition><span v-if="priceData.formatted !== null">{{ priceData.formatted }}</span></Transition>
          </div>
          <button
            type="submit"
            class="button button-reveal button-rounded tright fright nomargin"
            :class="{disabled: priceData.value === null}"
          >
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
import {mapGetters, mapState} from 'vuex';
import _debounce from 'lodash/debounce';

export default {
  data: () => ({
    priceData: {
      error: null,
      value: null,
      formatted: null,
      valueWithDiscount: null,
      formattedWithDiscount: null,
      discountBonusInfo: null,
    },
    formData: {
      message1: undefined,
      message2: undefined,
      files: undefined,
      filesUrl: undefined,
    },
  }),
  computed: {
    ...mapState('page', ['product']),
    ...mapState('product', ['params']),
    ...mapGetters('product', [
      'kitComponent',
      'quantityComponent',
    ]),
    ...mapState('product', {integration: 'currentActiveEmbeddedIntegration'}),
  },
  watch: {
    integration(value) {
      for (const key in this.formData) {
        this.formData[key] = undefined;
      }
      if (value) {
        this.updatePrice();
      }
    },
    params: {
      handler() {
        if (!this.integration) {
          return;
        }
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
