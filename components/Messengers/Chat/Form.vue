<template>
  <form class="nobottommargin chat-message-send-form" @submit.prevent="handleChatOnlineSubmit">
      <textarea
        name="message"
        class="form-control content-group"
        rows="3"
        cols="1"
        :placeholder="$trans('chat.message.placeholder')"
        :class="{error: errors?.message}"
        v-model="formData.message"
      ></textarea>
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
        <TheCaptcha
          ref="captcha"
          v-if="$store.state.site.settings?.['helpdesk:chat-captcha'] && ($store.state.site.settings?.['seo-integration:google-captcha-version'] === CaptchaVersionEnum.RECAPTCHA_V3)"
          v-model="formData.g_recaptcha_response"
          :error="errors?.g_recaptcha_response?.join('<br />') || errors?.g_recaptcha_response"
        />
        <button type="submit" class="button button-rounded button-reveal tright nomargin fright">
          <i class="icon-email2"></i><span>{{ loading ? $trans('chat.sending') : $trans('chat.send') }}</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import CaptchaVersionEnum from '@/enums/CaptchaVersionEnum';

export default {
  data: () => ({
    CaptchaVersionEnum,
    formData: {
      message: undefined,
      files: undefined,
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

    async handleChatOnlineSubmit() {
      this.loading = true;
      this.errors = null;

      const formData = new FormData;
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

      let ticket, message;

      try {
        await this.$auth.getUserOrGuest();
        ({data: {ticket, message}} = await this.$axios.post('communications/chat-message', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          silenceException: true,
        }));
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

      if (this.$store.state.chat.ticket?.id !== ticket.id) {
        this.$store.commit('chat/update', {ticket});
      }

      this.$store.commit('chat/message', message);
    },

    resetFormData() {
      Object.assign(this.$data, this.$options.data.apply(this, [this]));
      this.$refs.captcha?.resetRepatcha();
    },
  },
}
</script>
