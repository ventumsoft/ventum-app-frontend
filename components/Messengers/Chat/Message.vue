<template>
  <li class="media chat-message" :class="{reversed: !message.own}">
    <div class="media-body">
      <div class="media-heading">
        <span class="text-semibold chat-message-user">{{ message.own ? $trans('chat.you') : (message.authorL10nName?.[$store.state.site.language.slug] || message.authorName) }}</span>
        <span class="media-annotation dotted chat-message-time">{{ message.createdAt }}</span>
      </div>
      <div v-if="message.message || message.images?.length" class="media-content chat-message-content">
        <blockquote
          v-if="message.quoted"
          class="chat-message-quoted"
          v-html="$nl2br(autolinker(striptags(message.quoted.message), {stripPrefix: false}))"
        ></blockquote>
        <div
          class="chat-message-text"
          v-html="$nl2br(autolinker(striptags(message.message), {stripPrefix: false}))"
        ></div>
        <div v-if="message.images?.length" class="chat-message-images">
          <div
            v-for="image of message.images"
            class="chat-message-image"
            style="display: inline-block; margin: 10px;"
          >
            <a :href="image.link" class="chat-message-image-link" data-lightbox="image">
              <div
                v-if="image.cmyk && $store.state.site.settings?.['helpdesk:discussion-thread:show-cmyk-image-warning']"
                class="chat-message-image-cmyk"
                style="display: block;"
                v-bs.tooltip="{title: $trans('chat.image.cmyk'), container: 'body'}"
              ><i class="icon-warning-sign"></i> CMYK</div>
              <img
                class="chat-message-image-element"
                :src="image.preview"
                @load="$event.target.style.width = 'auto'; $event.target.style.height = 'auto'; "
              >
            </a>
          </div>
        </div>
      </div>
      <ul
        v-if="message.attachments?.length"
        class="list-inline list-inline-separate list-inline-chat text-size-small chat-message-actions"
      >
        <li v-for="attachment of message.attachments">
          <a :href="attachment.link" target="_blank" class="chat-message-attachment-link">
            <i class="icon-paperclip position-left text-muted"></i>
            <span class="chat-message-attachment-title">{{ attachment.title }}</span>
            (<span class="chat-message-attachment-info">{{
              [
                parseInt(attachment.size / 1024) + ' kB',
                (attachment.description?.colorSpace === 'cmyk') && 'CMYK',
              ].filter(v => v).join(', ')
            }}</span>)
          </a>
        </li>
      </ul>
    </div>
    <div v-if="!message.own" class="media-right">
      <img
        class="img-circle chat-message-avatar"
        :src="message.avatar || '/images/placeholder.jpg'"
        :alt="message.author"
      >
    </div>
  </li>
</template>

<script>
import Autolinker from 'autolinker';
import striptags from 'striptags';

export default {
  props: [
    'message',
  ],
  async mounted() {
    await import('magnific-popup');
    $(this.$el).find('[data-lightbox="image"]').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-fade',
      image: {verticalFit: true},
    });
  },
  methods: {
    autolinker: Autolinker.link,
    striptags,
  },
}
</script>
