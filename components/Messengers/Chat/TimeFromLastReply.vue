<template>
  <span
    class="nocolor helpdesk-ticket-timefromlastreply"
    v-html="isNaN(seconds) ? '---' : (String(parseInt(seconds / 60 / 60)).padStart(2, '0') + ':' + String(parseInt(seconds / 60 % 60)).padStart(2, '0') + ':' + String(parseInt(seconds % 60 % 60)).padStart(2, '0'))"
  ></span>
</template>

<script>
export default {
  props: ['seconds'],
}
</script>
