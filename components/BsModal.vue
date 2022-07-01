<template>
  <div class="modal">
    <slot>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 class="modal-title center"><slot name="title"></slot></h4>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  mounted() {
    const $modal = $(this.$el);
    $modal.on('shown.bs.modal', event => {
      this.$emit('opened');
    });
    $modal.modal('show');
    $modal.on('hidden.bs.modal', event => {
      this.$emit('closed');
    });
  },
  beforeDestroy() {
    if ($(this.$el).data('bs.modal').isShown) {
      $(this.$el).removeClass('fade');
      $(this.$el).data('bs.modal').hide();
    }
  },
}
</script>
