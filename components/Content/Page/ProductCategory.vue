<template>
  <div class="container clearfix">
    <div id="shop" class="product-3 clearfix">
      <div v-for="category of $store.state.page.entity.categories" class="product clearfix">
        <div class="product-image">
          <TheLink :to="category.link">
            <img
              :src="category.image || '/images/placeholder.jpg'"
              :srcset="category.image && category.image2x ? (category.image + ', ' + category.image2x + ' 2x') : null"
              :alt="category.name"
              style="object-fit: contain; height: 270px"
            >
          </TheLink>
          <div class="sale-flash-container text-nowrap">
            <div v-if="category.is_new" class="sale-flash new">
              site/product.new!
            </div>
            <div v-if="category.discount" class="sale-flash">
              site/product.discount - {{ category.discount * 1 }}%
            </div>
            <div v-if="category.totalDiscountLabel" class="sale-flash">
              - {{ category.totalDiscountLabel }}
            </div>
          </div>
        </div>
        <div class="product-desc">
          <div class="product-title">
            <h3>
              <TheLink :to="category.link">
                {{ category.name }}
              </TheLink>
            </h3>
          </div>
          <div class="product-category">site/product.category</div>
        </div>
        <TheLink :to="category.link" class="button button-border button button-rounded nomargin">
          <span>site/product.button.browse</span>
          <i class="icon-angle-right"></i>
        </TheLink>
      </div>
      <div v-for="product of $store.state.page.entity.products" class="product clearfix">
        <div class="product-image">
          <TheLink :to="product.link">
            <img
              :src="product.image || '/images/placeholder.jpg'"
              :srcset="product.image && product.image2x ? (product.image + ', ' + product.image2x + ' 2x') : null"
              :alt="product.name"
              style="object-fit: contain; height: 270px"
            >
          </TheLink>
          <div class="sale-flash-container text-nowrap">
            <div v-if="product.is_new" class="sale-flash new">
              site/product.new!
            </div>
            <div v-if="product.discount" class="sale-flash">
              site/product.discount - {{ product.discount * 1 }}%
            </div>
            <div v-if="product.totalDiscountLabel" class="sale-flash">
              - {{ product.totalDiscountLabel }}
            </div>
          </div>
        </div>
        <div class="product-desc">
          <div class="product-title">
            <h3>
              <TheLink :to="product.link">
                {{ product.name || 'site/product.label.product' }}
              </TheLink>
            </h3>
          </div>
          <div class="product-price" v-html="product.promoPrice"></div>
        </div>
        <TheLink :to="product.link" class="button button-border button button-rounded nomargin">
          <span>site/product.button.order</span> <i class="icon-angle-right"></i>
        </TheLink>
      </div>
    </div>
  </div>
</template>
