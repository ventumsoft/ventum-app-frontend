<template>
  <div v-if="product.integrations?.length" class="container clearfix topmargin-sm product-creators-integrations-container hidden">
    <div class="product-creators-integrations">
      <div
        v-for="integration of product.integrations"
        class="product-creator-integration hidden"
      >
        <a href="#" class="product-creator-integration-button" :data-integration-id="integration.id">
          <div class="feature-box fbox-center fbox-bg fbox-effect">
            <div class="fbox-icon">
              <i
                class="i-alt"
                :class="void 'icon-by-creator'"
                style="color: #ffffff;"
                :style="{'background-color': void 'color!important'}"
              ></i>
            </div>
            <h3>
              {{ 'title' }}
              <span class="subtitle">
                {{ 'description' }}
                    <span
                      class="product-creator-integration-using-price"
                      :data-settings="integration.settings?.usingPrice"
                    ></span>
                </span>
            </h3>
            <button
              type="button"
              class="button button-white button-border noshadow button-rounded noleftmargin norightmargin"
            >
              <span>{{ 'button' }}</span>
            </button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('page', ['product']),
  },
}
</script>
