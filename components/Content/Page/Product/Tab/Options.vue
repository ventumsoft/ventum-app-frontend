<template>
  <div>
    <div v-if="params.items?.length" class="topmargin-sm">
      <div
        v-for="(item, index) of params.items"
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
  props: ['params'],
}
</script>
