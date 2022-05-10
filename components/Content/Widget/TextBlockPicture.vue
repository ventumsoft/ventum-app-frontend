<template>
  <div class="showcase-widget container clearfix last-no-margin padding-top-bottom-60" data-widget="MainthemTextBlockPicture">
    <ContentWidgetTextBlockPicturePartText
      v-if="img_position === 'right'"
      :class="textClass"
      v-bind="{title, subtitle, content, link}"
    />
    <ContentWidgetTextBlockPicturePartTitle
      v-if="img_position === 'left'"
      :class="textClass + ' visible-xs hidden-sm hidden-md hidden-lg'"
      v-bind="{title, subtitle}"
    />
    <div
      v-if="type !== noPictureType"
      class="block-image"
      :class="[imgClass, (img_position !== 'left') ? 'col_last' : null].filter(v => v)"
    >
      <img
        :src="img_url || '/images/no-image.png'"
        :srcset="(img_url || '/images/no-image.png') + ', ' + (img2x_url || img_url || '/images/no-image.png') + ' 2x'"
        loading="lazy"
        style="width: 100%;"
        :alt="img_alt"
      >
    </div>
    <ContentWidgetTextBlockPicturePartText
      v-if="img_position === 'left'"
      :class="textClass + ' col_last'"
      :titleClass="'hidden-xs'"
      v-bind="{title, subtitle, content, link}"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {type: String},
    noPictureType: {type: String},
    title: {type: String},
    subtitle: {type: String},
    content: {type: String},
    link: {type: String},
    img_position: {type: String},
    img_url: {type: String},
    img2x_url: {type: String},
    img_alt: {type: String},
  },
  computed: {
    textClass() {
      return {
        text: 'col_full',
        picture1: 'col_two_third',
        picture2: 'col_half',
        picture3: 'col_one_third',
        picture4: 'col_three_fourth',
        picture5: 'col_one_fourth',
        picture6: 'col_four_fifth',
        picture7: 'col_three_fifth',
        picture8: 'col_two_fifth',
        picture9: 'col_one_fifth',
        picture10: 'col_five_sixth',
        picture11: 'col_one_sixth',
      }[this.type];
    },
    imgClass() {
      return {
        picture1: 'col_one_third',
        picture2: 'col_half',
        picture3: 'col_two_third',
        picture4: 'col_one_fourth',
        picture5: 'col_three_fourth',
        picture6: 'col_one_fifth',
        picture7: 'col_two_fifth',
        picture8: 'col_three_fifth',
        picture9: 'col_four_fifth',
        picture10: 'col_one_sixth',
        picture11: 'col_five_sixth',
      }[this.type];
    },
  },
}
</script>
