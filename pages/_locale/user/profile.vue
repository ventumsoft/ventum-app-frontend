<template>
  <div class="client-account-item account-data account-tab-profile">
    <div class="col-md-6">
      <form
        id="profile-form"
        name="profile-form"
        class="nobottommargin account-profile-form"
        @submit.prevent="handleProfileSubmit"
      >
        <div v-if="loading" class="form-process"></div>
        <div class="col_full">
          <label for="profile-form-name">{{ $trans('account.profile.name') }}:</label>
          <input
            type="text"
            id="profile-form-name"
            class="form-control"
            :class="{error: errors?.firstname}"
            v-model="formData.firstname"
            required
          >
          <label v-for="error of (errors?.firstname?.length ? errors.firstname : [])" class="help-error">{{ error }}</label>
        </div>
        <div class="col_full">
          <label for="profile-form-surname">{{ $trans('account.profile.surname') }}:</label>
          <input
            type="text"
            id="profile-form-surname"
            class="form-control"
            :class="{error: errors?.surname}"
            v-model="formData.surname"
          >
          <label v-for="error of (errors?.surname?.length ? errors.surname : [])" class="help-error">{{ error }}</label>
        </div>
        <div class="col_full">
          <label for="profile-form-email">{{ $trans('account.profile.email') }}:</label>
          <input
            type="text"
            id="profile-form-email"
            class="form-control"
            :class="{error: errors?.email}"
            v-model="formData.email"
            required
          >
          <label v-for="error of (errors?.email?.length ? errors.email : [])" class="help-error">{{ error }}</label>
        </div>
        <div class="col_full">
          <label for="profile-form-phone">{{ $trans('account.profile.phone') }}:</label>
          <input
            type="text"
            id="profile-form-phone"
            class="form-control"
            :class="{error: errors?.phone}"
            :placeholder="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask']?.replace(/#/g, '_') : ''"
            v-model="formData.phone"
            v-mask="!$store.state.site.settings?.['general:multicountry'] ? $store.state.site.settings?.['general:phone-mask'] : null"
          >
          <label v-for="error of (errors?.phone?.length ? errors.phone : [])" class="help-error">{{ error }}</label>
        </div>
        <div class="col_full nobottommargin">
          <label>{{ $trans('account.profile.avatar') }}</label>
          <br>
          <div class="col_full">
            <div class="col_three_fifth">
              <div ref="cropitEditor" class="image-editor">
                <div class="cropit-preview nobottommargin"></div>
                <input ref="cropitInput" type="file" class="cropit-image-input" accept="image/jpeg,image/png">
                <div
                  class="select-image-btn button button-rounded button-amber button-reveal nomargin"
                  @click="$refs.cropitInput.click()"
                >
                  {{ $trans('account.profile.avatar.choose') }}
                </div>
                <div class="image-size-label">
                  <label>{{ $trans('account.profile.avatar.changesize') }}</label>
                </div>
                <input type="range" class="cropit-image-zoom-input">
              </div>
            </div>
          </div>
        </div>
        <div class="col_full notopmargin">
          <button
            class="button button-rounded button-reveal button-white button-light tright nomargin fleft"
            id="profile-perform-delete"
            @click.prevent="handleProfileDelete"
          >
            <i class="icon-line-cross"></i>
            <span>{{ $trans('account.profile.delete') }}</span>
          </button>
          <button
            class="export button button-rounded button-reveal tright nomargin fright"
            id="profile-form-submit"
          >
            <i class="icon-save"></i>
            <span>{{ $trans('account.profile.save') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';

export default {
  data: ({$auth}) => ({
    loading: false,
    formData: {
      firstname: $auth.user?.firstname,
      surname: $auth.user?.surname,
      email: $auth.user?.email,
      phone: $auth.user?.phone,
      avatar: null,
    },
    errors: null,
  }),
  async mounted() {
    await import('cropit');
    const $cropitEditor = $(this.$refs.cropitEditor);
    let cropitInitialized = false;
    $cropitEditor.cropit({
      allowDragNDrop: false,
      imageState: {src: this.$auth.user?.avatarFull || 'data:image/jpeg;base64,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'},
      onFileChange: () => {
        this.formData.avatar = $cropitEditor.cropit('export', {originalSize: true, type: 'image/jpeg'});
      },
      onOffsetChange: _debounce(() => {
        if (cropitInitialized) {
          this.formData.avatar = $cropitEditor.cropit('export', {originalSize: true, type: 'image/jpeg'});
        }
      }, 100),
    });
    setTimeout(() => {
      cropitInitialized = true;
    }, 1000);
  },
  methods: {
    async handleProfileSubmit() {
      this.loading = true;
      this.errors = null;
      let success;
      try {
        ({data: {
          success,
        }} = await this.$axios.post('user/profile', this.formData, {silenceException: true}));
      } catch (exception) {
        if ('object' === typeof exception.response?.data?.errors) {
          this.errors = exception.response.data.errors;
        } else {
          this.$noty(exception.response?.data?.message || exception.message, 'error');
        }
        return;
      } finally {
        this.loading = false;
      }
      if (success) {
        this.$noty(this.$trans('account.profile.saved'));
        this.$auth.fetchUser();
      }
    },
    async handleProfileDelete() {
      if (!await this.$confirm({
        mainTitle: this.$trans('account.profile.delete.confirmation.mainTitle'),
        mainSubTitle: this.$trans('account.profile.delete.confirmation.mainSubTitle'),
        mainYesBtn: this.$trans('account.profile.delete.confirmation.mainYesBtn'),
        mainNoBtn: this.$trans('account.profile.delete.confirmation.mainNoBtn'),
        yesTitle: this.$trans('account.profile.delete.confirmation.yesTitle'),
        yesSubTitle: this.$trans('account.profile.delete.confirmation.yesSubTitle'),
        noTitle: this.$trans('account.profile.delete.confirmation.noTitle'),
        noSubTitle: this.$trans('account.profile.delete.confirmation.noSubTitle'),
      })) {
        return;
      }
      this.loading = true;
      let success;
      try {
        ({data: {
            success,
          }} = await this.$axios.delete('user/profile', {silenceException: true}));
      } catch (exception) {
        this.$noty(exception.response?.data?.message || exception.message, 'error');
        return;
      } finally {
        this.loading = false;
      }
      if (success) {
        await this.$auth.logout();
      }
    },
  },
}
</script>
