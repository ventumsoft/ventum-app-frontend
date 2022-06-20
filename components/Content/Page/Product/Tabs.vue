<template>
  <div class="container tabs-container clearfix topmargin-sm">
    <JqTabs class="tabs-alt tabs-tb" id="tab-8">
      <ul class="tab-nav clearfix">
        <li
          v-for="contentTab of product.contentTabs"
          v-if="contentTab?.params?.[language.id]"
        >
          <a class="text-break" :href="'#tabs-' + contentTab.id">
            {{ contentTab?.params?.[language.id]?.frontend_name || '' }}
          </a>
        </li>
      </ul>
      <div class="tab-container">
        <component
          v-for="contentTab of product.contentTabs"
          :key="contentTab.id"
          v-if="contentTab?.params?.[language.id]"
          :is="'ContentPageProductTab' + upperFirst(camelCase(contentTab.type))"
          class="tab-content clearfix"
          :id="'tabs-' + contentTab.id"
          :commonParams="contentTab.params"
          :i18nParams="contentTab.params[language.id]"
        ></component>
      </div>
    </JqTabs>
  </div>
</template>

<script>
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('site', ['language']),
    ...mapState('page', ['product']),
  },
  methods: {
    camelCase,
    upperFirst,
  },
}
</script>
