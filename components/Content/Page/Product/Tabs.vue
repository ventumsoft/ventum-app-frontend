<template>
  <div class="container tabs-container clearfix topmargin-sm">
    <div class="tabs tabs-alt tabs-tb clearfix" id="tab-8">
      <ul class="tab-nav clearfix">
        <li
          v-for="content of product.contents"
          v-if="content?.params?.[language.id] && content.is_available"
        >
          <a class="text-break" :href="'#tabs-' + content.id" @click.prevent>
            {{ content?.params?.[language.id?.frontend_name] || '' }}
          </a>
        </li>
      </ul>
      <div class="tab-container">
        <component
          v-for="content of product.contents"
          :key="content.id"
          v-if="content?.params?.[language.id] && content.is_available"
          :is="'ContentPageProductTab' + content.type"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['language']),
    ...mapState('page', {product: 'entity'}),
  },
}
</script>
