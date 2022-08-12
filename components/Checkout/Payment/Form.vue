<template>
  <form class="nobottommargin payment-type-form" @submit.prevent>
    <div class="control-block">

    </div>
  </form>
</template>

<script>
import UserTypeEnum from '@/enums/UserTypeEnum';

export default {
  data: () => ({
    UserTypeEnum,
  }),
}
</script>
