<template>
  <BsModal id="writeTestimonialModal" style="top: 0%;" @closed="$emit('closed')">
    <template v-slot:title>
      {{ $trans('reviews.modal.label') }}
    </template>
    <template v-slot:body>
      <div v-show="loading" class="form-process" style="display: block; left: 0; top: 0;"></div>
      <form
        class="nobottommargin modal-review-form"
        @change="errors = null"
        @input="errors = null"
        @submit.prevent="handleReviewSubmit"
      >
        <div class="col_full">
          <label>{{ $trans('reviews.modal.label.name.customer') }}</label>
          <input
            type="text"
            class="form-control"
            :class="{error: errors?.customer_name}"
            v-model="formData.customer_name"
          >
        </div>
        <div class="col_full">
          <label>{{ $trans('reviews.modal.label.customer.about') }}</label>
          <input
            type="text"
            class="form-control"
            maxlength="150"
            :class="{error: errors?.company_position_etc}"
            v-model="formData.company_position_etc"
          >
        </div>
        <div class="col_full nobottommargin" :class="{error: errors?.avatar}">
          <label>{{ $trans('reviews.modal.label.customer.image') }}</label>
          <br>
          <div class="col_full">
            <div class="col_three_fifth">
              <div ref="cropitEditor" class="image-editor">
                <div class="cropit-preview">
                  <div class="cropit-preview-default">
                    <img
                      class="preview-default"
                      src="/images/no-photo.png"
                      alt="avatar"
                      style="object-fit: cover;position: absolute;top: 0;left: 0;width: 100%;height: 100%;"
                    >
                  </div>
                </div>
                <input ref="cropitInput" type="file" class="cropit-image-input" accept="image/jpeg,image/png">
                <div
                  class="select-image-btn button button-rounded button-amber button-reveal nomargin"
                  @click="$refs.cropitInput.click()"
                >
                  {{ $trans('reviews.modal.button.select_photo') }}
                </div>
                <div class="image-size-label">
                  <label>{{ $trans('reviews.modal.label.customer.image.size') }}</label>
                </div>
                <input type="range" class="cropit-image-zoom-input">
              </div>
            </div>
          </div>
        </div>
        <div class="col_full">
          <label>{{ $trans('reviews.modal.label.review') }}</label>
          <textarea
            class="form-control required"
            rows="4"
            cols="30"
            maxlength="400"
            :class="{error: errors?.review}"
            v-model="formData.review"
          ></textarea>
        </div>
        <div class="col_full" :class="{error: errors?.rating}">
          <div class="white-section">
            <label for="testimonial-form-rating">{{ $trans('reviews.modal.label.rating') }}</label>
            <input
              ref="ratingInput"
              id="testimonial-form-rating"
              type="number"
              data-empty-star="★"
              data-filled-star="★"
              data-step="1"
              data-show-clear="false"
              :data-star-captions="JSON.stringify({
                  '1': $trans('reviews.modal.label.rating.1'),
                  '2': $trans('reviews.modal.label.rating.2'),
                  '3': $trans('reviews.modal.label.rating.3'),
                  '4': $trans('reviews.modal.label.rating.4'),
                  '5': $trans('reviews.modal.label.rating.5'),
              })"
              :data-star-caption-classes="JSON.stringify({
                1: 'label label-danger',
                2: 'label label-warning',
                3: 'label label-info',
                4: 'label label-primary',
                5: 'label label-success',
              })"
              :value="formData.rating"
            >
          </div>
        </div>
        <div
          v-if="$store.state.site.settings?.['general:is-terms-message-enabled']"
          class="col_full check-control"
          :class="{error: errors?.is_agree_with_terms}"
        >
          <input id="reviews-checkbox-terms" class="checkbox-style" type="checkbox" v-model="formData.is_agree_with_terms">
          <label for="reviews-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['general:terms-message']"></label>
        </div>
        <TheCaptcha
          ref="captcha"
          v-if="$store.state.site.settings?.['seo-integration:captcha:use-for-review-form']"
          v-model="formData.g_recaptcha_response"
          :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
        />
        <div class="modal-footer">
          <button
            class="export button button-rounded button-reveal tright nomargin fright"
            id="review-save-button"
            type="submit"
            :data-loading-text="$trans('reviews.modal.button.sending')"
          >
            <i class="icon-email2"></i><span>{{ $trans('reviews.modal.button.send') }}</span>
          </button>
        </div>
      </form>
    </template>
  </BsModal>
</template>

<script>
import _debounce from 'lodash/debounce';

export default {
  data: ({$auth}) => ({
    formData: {
      customer_name: $auth.user?.name,
      company_position_etc: undefined,
      avatar: undefined,
      review: undefined,
      rating: 5,
      is_agree_with_terms: undefined,
      g_recaptcha_response: undefined,
    },
    loading: false,
    errors: null,
  }),
  async mounted() {
    await import('cropit');
    await import('bootstrap-star-rating');
    const $cropitEditor = $(this.$refs.cropitEditor);
    $cropitEditor.cropit({
      allowDragNDrop: false,
      width: 180,
      height: 180,
      smallImage: 'stretch',
      imageState: {src: this.$auth.user?.avatar},
      exportZoom: 500 / 180,
      onImageLoaded: () => {
        this.formData.avatar = $cropitEditor.cropit('export', {type: 'image/jpeg'});
      },
      onOffsetChange: _debounce(() => {
        this.formData.avatar = $cropitEditor.cropit('export', {type: 'image/jpeg'});
      }, 100),
    });
    $(this.$refs.ratingInput).rating().on('change', event => {
      this.formData.rating = $(event.currentTarget).val();
    });
  },
  methods: {
    async handleReviewSubmit() {
      this.loading = true;
      this.errors = null;
      let success, message;
      try {
        ({data: {
          success,
          message,
        }} = await this.$axios.post('reviews', this.formData, {silenceException: true}));
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        return;
      } finally {
        this.loading = false;
        this.$refs.captcha?.resetRepatcha();
      }
      if (!success) {
        this.$noty(message, 'error');
        return;
      }
      if (message) {
        this.$noty(message);
      }
      $(this.$el).modal('hide');
    },
  },
}
</script>
