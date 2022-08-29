<template>
  <div>
    <div v-for="item of order.items" class="order-product-data">
      <div class="order-product-preview" v-mfp:gallery="Boolean(item.approvedImages?.length)">
        <template v-if="item.approvedImages?.length">
          <a
            v-for="(itemApprovedImage, index) of item.approvedImages"
            v-if="itemApprovedImage.full"
            v-show="index === 0"
            :href="itemApprovedImage.full"
            data-lightbox="gallery-item"
          >
            <img
              v-if="itemApprovedImage.preview"
              :src="itemApprovedImage.preview"
              :srcset="itemApprovedImage.preview2x && (itemApprovedImage.preview + ', ' + itemApprovedImage.preview2x + '2x')"
            >
          </a>
        </template>
        <a v-else-if="item.image && item.preview" :href="item.image" class="center-icon" v-mfp:image>
          <img
            :src="item.preview"
            :srcset="item.preview2x && (item.preview + ', ' + item.preview2x + '2x')"
          >
        </a>
      </div>
      <div class="order-product-name">
        <span class="item-product-title">{{ item.name }} <span v-for="option of item.options" class="item-option" v-html="option"></span></span>
      </div>
    </div>
    <div v-if="order.deliveryData" class="order-product-data">
      <div class="order-product-preview"></div>
      <div class="order-product-name">
        <i class="icon-truck color"></i>
        {{ [order.deliverySystemName, order.deliveryAddress].filter(v => v).join(', ') }}
        <br>
        <i class="icon-user2 color"></i>
        {{ [order.deliveryName, order.deliveryData.phone].filter(v => v).join(', ') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
}
</script>
