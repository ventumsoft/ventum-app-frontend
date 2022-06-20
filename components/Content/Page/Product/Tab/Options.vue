<template>
  <div>
    <div v-if="i18nParams.items" class="topmargin-sm">
      <div
        v-for="(item, index) of Object.values(i18nParams.items)"
        class="col_one_third col-max-height"
        :class="{col_last: index % 3 === 2}"
      >
        <div class="feature-box fbox-rounded">
          <div class="fbox-icon">
            <i :class="'backicon-' + item.icon"></i>
          </div>
          <h3 v-html="item.title"></h3>
          <p v-html="$nl2br(item.subtitle)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commonParams', 'i18nParams'],
}
</script>
