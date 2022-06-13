<template>
  <li :class="{'sub-menu': subMenuClass && $auth.user}">
    <a v-if="!$auth.user" href="#" @click.prevent="$emit('login')">
      <i class="icon-signin"></i> {{ $trans('header.login') }}
    </a>
    <a v-if="$auth.user" href="#" @click.prevent>
      <i class="icon-user"></i>
      <span class="stat-new-messages-orders" style="position:absolute;top:5px;left:20px;font-size:10px;color:#FFF;width:14px;height:14px;line-height:15px;text-align:center;border-radius:50%;background-color:#59BA40;">{{ $auth.user.statNewMessagesOrders }}</span>
      {{ $auth.user.name }}
      <i class="icon-angle-down"></i>
    </a>
    <ul v-if="$auth.user" :style="{width: subMenuWidth ? (subMenuWidth + 'px') : ''}">
      <li
        v-for="tab of PersonalAccountTabEnum"
        v-if="(tab !== PersonalAccountTabEnum.CREATORS_TEMPLATES) && (tab !== PersonalAccountTabEnum.CREATORS_TEMPLATES_PAYMENTS) || $auth.user.isDesigner"
      >
        <TheLink :to="$page({name: 'user/' + tab})">
          {{ $trans('account.tabs.' + tab) }}
          <div v-if="(tab === PersonalAccountTabEnum.BALANCE) && $auth.user.balanceValue" class="pull-right"><div class="badge badge-default">{{ $auth.user.balanceValue }}</div></div>
        </TheLink>
      </li>
      <li>
        <a href="#" @click.prevent="$auth.logout()">
          <i class="icon-signout"></i>{{ $trans('header.logout') }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
import PersonalAccountTabEnum from '@/enums/PersonalAccountTabEnum';

export default {
  props: [
    'subMenuClass',
    'subMenuWidth',
  ],
  data: () => ({
    PersonalAccountTabEnum,
  }),
}
</script>
