<template>
  <div class="chat-block-offline">
    <form class="nobottommargin contacts-form" @submit.prevent="handleChatOfflineSubmit">
      <div class="chat-contacts-form-fields">
        <div class="col_full">
          <label for="chat-form-name">{{ $trans('chat.yourname') }}:</label>
          <input
            type="text"
            id="chat-form-name"
            class="form-control"
            :class="{error: errors?.name}"
            v-model="formData.name"
          >
        </div>
        <div class="col_full">
          <label for="chat-form-email">{{ $trans('chat.email') }}:</label>
          <input
            type="text"
            id="chat-form-email"
            class="form-control"
            :class="{error: errors?.email}"
            v-model="formData.email"
          >
        </div>
        <div class="col_full">
          <label for="chat-form-phone">{{ $trans('chat.mobilephone') }}:</label>
          <input
            type="text"
            id="chat-form-phone"
            class="form-control"
            :class="{error: errors?.phone}"
            :placeholder="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask']?.replace(/#/g, '_') : ''"
            v-model="formData.phone"
            v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : null"
          />
        </div>
        <div class="col_full">
          <label for="chat-form-message">{{ $trans('chat.message') }}:</label>
          <textarea
            id="chat-form-message"
            class="form-control content-group"
            rows="3"
            cols="1"
            :placeholder="$trans('chat.message.placeholder')"
            :class="{error: errors?.message}"
            v-model="formData.message"
          ></textarea>
        </div>
        <div
          v-if="$store.state.site.settings?.['general:is-terms-message-enabled']"
          class="col_full check-control"
          :class="{error: errors?.is_agree_with_terms}"
        >
          <input id="chat-checkbox-terms" class="checkbox-style" type="checkbox" v-model="formData.is_agree_with_terms">
          <label for="chat-checkbox-terms" class="checkbox-style-2-label checkbox-small" v-html="$store.state.site.settings?.['helpdesk:terms_message']"></label>
        </div>
        <TheCaptcha
          ref="captcha"
          v-if="$store.state.site.settings?.['helpdesk:chat-captcha']"
          v-model="formData.g_recaptcha_response"
          :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
        />
      </div>
      <div class="row">
        <div class="col-xs-3">
          <ul class="icons-list">
            <li>
              <a
                class="message-files-button"
                style="position: relative;"
                v-bs.tooltip="{
                  title: formData.files?.length ? Array.from(formData.files).map(file => file.name).join('<br>') : $trans('chat.sendfile'),
                  html: true,
                  container: '#chat',
                }"
              >
                <i class="icon icon-file-add"></i>
                <input
                  type="file"
                  multiple
                  style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0;"
                  :accept="$store.state.site.settings?.['helpdesk:upload-files-types']?.map(fileType => '.' + fileType)"
                  @change="handleSelectingFiles"
                >
                <span
                  v-if="formData.files?.length"
                  class="badge badge-default message-files-count-badge"
                  style="display: block;"
                >{{ formData.files.length }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-xs-9 text-right">
          <button type="submit" class="button button-rounded button-reveal tright nomargin fright">
            <i class="icon-email2"></i><span>{{ loading ? $trans('chat.sending') : $trans('chat.send') }}</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: ({$auth}) => ({
    formData: {
      name: $auth.user?.name || undefined,
      email: $auth.user?.email || undefined,
      phone: $auth.user?.phone || undefined,
      message: undefined,
      files: undefined,
      is_agree_with_terms: undefined,
      g_recaptcha_response: undefined,
    },
    loading: false,
    errors: null,
  }),
  methods: {
    handleSelectingFiles(event) {
      const files = event.target.files;

      if (files.length > this.$store.state.site.settings?.['upload_count_max']) {
        $(event.target).val('');
        this.$noty(this.$trans('creator-uploader.violation_system_upload_files_count_max').replace(':value', this.$store.state.site.settings?.['upload_count_max']), 'error');
        return;
      }

      if ([...files].reduce((size, file) => size + file.size, 0) > this.$store.state.site.settings?.['upload_size_max']) {
        $(event.target).val('');
        this.$noty(this.$trans('creator-uploader.violation_system_upload_files_size_max').replace(':value', Math.round(this.$store.state.site.settings?.['upload_size_max'] / 1024 / 1024)), 'error');
        return;
      }

      this.formData.files = files;
    },

    async handleChatOfflineSubmit() {
      this.loading = true;
      this.errors = null;

      const formData = new FormData;
      formData.append('form', 'chat');
      for (const [key, value] of Object.entries(this.formData)) {
        if (value !== undefined) {
          if (value instanceof FileList) {
            for (const [fileIndex, file] of [...value].entries()) {
              formData.append(key + '[' + fileIndex + ']', file);
            }
          } else {
            formData.append(key, value);
          }
        }
      }

      try {
        await this.$auth.getUserOrGuest();
        await this.$axios.post('communications/ticket-message', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          silenceException: true,
        });
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        this.$refs.captcha?.resetRepatcha();
        return;
      } finally {
        this.loading = false;
      }

      this.resetFormData();
      this.$noty('<i class=icon-ok-sign></i> ' + this.$trans('contacts.form.success'), 'success');
    },

    resetFormData() {
      Object.assign(this.$data, this.$options.data.apply(this, [this]));
      this.$refs.captcha?.resetRepatcha();
    },
  },
}
</script>
