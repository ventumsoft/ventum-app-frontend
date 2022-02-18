<template>
  <Fragment>
    <div class="showcase-widget col_half nobottommargin" data-widget="MainthemPhones">
        <p class="phones nobottommargin">
          <span
            v-for="(phone, index) in phones"
            :key="index"
          >
            <strong v-if="phone.prefix" v-html="phone.prefix"></strong>
            <a :href="'tel:' + phone.number">{{ phone.number }}</a>
            <template v-if="index < phones.length - 1"> | </template>
          </span>
        </p>
    </div>
    <li class="hidden-md hidden-lg" data-widget="MainthemPhones">
      <a href="#" @click.prevent>
        <i class="icon-phone3"></i>
        site/header.phones
        <i class="icon-angle-down"></i>
      </a>
        <ul>
          <li
            v-for="(phone, index) in phones"
            :key="index"
          >
            <a :href="'tel:' + phone.number" class="not-animsition">
              <strong v-if="phone.prefix" v-html="phone.prefix"></strong>
              {{ phone.number }}
            </a>
          </li>
        </ul>
    </li>
  </Fragment>
</template>

<script>
export default {
  props: {
    phones: {type: Array},
  },
}
</script>
