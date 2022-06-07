<template>
  <div v-if="options?.length" class="component-container" :class="'compound-product-' + component.id">
    <div class="component-name bottom-border"><label class="text-break"><i>{{ component.name }}</i></label></div>
    <ContentPageProductCalculatorOptions
      :defaults="defaults"
      :options="options"
      :component="true"
    />
  </div>
</template>

<script>
export default {
  props: [
    'integration',
    'component',
    'defaults',
  ],
  computed: {
    options() {
      return this.component.calculator.options.filter(option => option.isOnlyForApps?.length && option.isOnlyForApps.includes(this.integration.creator));
    },
  },
}
</script>
