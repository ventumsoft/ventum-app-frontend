<template>
  <div class="client-account-item account-layouts account-tab-creators-templates">
    <div class="btn-group bottommargin-sm">
      <TheLink
        class="btn btn-success"
        :to="$page({name: 'user/design-template/creator', params: {creator: CreatorEnum.UNIVERSAL}, query: {templateId: undefined}})"
      >
        {{ $trans('account.creators-templates.create') }}
      </TheLink>
    </div>
    <div class="table-responsive">
      <DataTable
        id="datatable-account"
        :options="{
          ordering: false,
          searching: false,
          paging: false,
        }"
      >
        <thead>
        <tr>
          <th data-responsive-priority="1">{{ $trans('account.creators-templates.table.date') }}</th>
          <th data-responsive-priority="2">{{ $trans('account.creators-templates.table.preview') }}</th>
          <th class="order-price" data-responsive-priority="3">{{ $trans('account.creators-templates.table.status') }}</th>
          <th class="order-price" data-responsive-priority="3">{{ $trans('account.creators-templates.table.price') }}</th>
          <th class="order-price text-nowrap" data-responsive-priority="4">{{ $trans('account.creators-templates.table.used') }}</th>
          <th class="order-price text-nowrap" data-responsive-priority="4">{{ $trans('account.creators-templates.table.message') }}</th>
          <th data-responsive-priority="1"></th>
        </tr>
        </thead>
        <tbody>
        <template v-if="templates.length">
          <tr v-for="template of templates">
            <td>{{ $dt(template.created_at, 'datetime') }}</td>
            <td class="order-product-thumbnail" style="min-width: auto;">
              <a :href="template.image" v-mfp:image>
                <img
                  :src="template.preview"
                  :srcset="template.preview2x && (template.preview + ', ' + template.preview2x + ' 2x')"
                  :alt="template.title"
                >
              </a>
            </td>
            <td class="order-price">
              <template v-if="template.approval === TemplateApprovalEnum.EMPTY">
                <span class="label label-default">{{ $trans('account.creators-templates.table.approval.' + template.approval) }}</span>
                <br><br>
                <TheLink
                  class="btn btn-default"
                  :to="$page({name: 'user/design-template/creator', params: {creator: CreatorEnum.UNIVERSAL}, query: {templateId: template.id}})"
                >{{ $trans('account.creators-templates.table.open-in-constructor') }}</TheLink>
              </template>
              <span v-else-if="template.approval === TemplateApprovalEnum.MODERATION" class="label label-warning">
                {{ $trans('account.creators-templates.table.approval.' + template.approval) }}
              </span>
              <span v-else-if="template.approval === TemplateApprovalEnum.APPROVED" class="label label-success">
                {{ $trans('account.creators-templates.table.approval.' + template.approval) }}
              </span>
              <template v-else-if="template.approval === TemplateApprovalEnum.REJECTED">
                <span class="label label-danger">
                  {{ $trans('account.creators-templates.table.approval.' + template.approval) }}
                </span>
                <br><br>
                <TheLink
                  class="btn btn-default"
                  :to="$page({name: 'user/design-template/creator', params: {creator: CreatorEnum.UNIVERSAL}, query: {templateId: template.id}})"
                >{{ $trans('account.creators-templates.table.open-in-constructor') }}</TheLink>
              </template>
            </td>
            <td class="text-nowrap order-price">
              {{ template.priceImportFormatted }}
            </td>
            <td class="order-price" style="min-width: 50px;">
              {{ template.statUsedTotalCount || '' }}
            </td>
            <td class="order-price" style="min-width: 70px;">
              <a
                v-if="(template.approval === TemplateApprovalEnum.REJECTED) && template.messageAboutReject"
                href="#"
                class="button-show-message-about-reject"
                :data-message="template.messageAboutReject"
              ><i class="icon-chat-2"></i></a>
            </td>
            <td>
              <button
                v-if="template.approval !== TemplateApprovalEnum.APPROVED"
                type="button"
                class="template-delete btn btn-link"
                @click="deleteTemplate(template)"
              >
                <i class="icon-trash"></i>
              </button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="empty-table-message" colspan="7">{{ $trans('account.creators-templates.table.empty') }}</td>
        </tr>
        </tbody>
      </DataTable>
    </div>
    <div class="col_full">
      <div class="pagination-container text-center">
        <ThePagination
          v-if="pagination.pages > 1"
          :pagesCount="pagination.pages"
          :currentPage="pagination.page"
          :routeBuilder="page => $page({...$route, query: {...$route.query, page}})"
        />
      </div>
    </div>
    <!--script type="text/template" class="template-message-about-reject">
      <div class="modal modaltop fade" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-body">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">{{ $trans('account.creators-templates.message_about_reject') }}</h4>
              </div>
              <div class="modal-body">
                <%- message %>
              </div>
            </div>
          </div>
        </div>
      </div>
    </script-->
  </div>
</template>

<script>
import CreatorEnum from '@/enums/CreatorEnum';
import TemplateApprovalEnum from '@/enums/TemplateApprovalEnum';

export default {
  async asyncData({query, $axios}) {
    const {data: {
      data: templates,
      pagination,
    }} = await $axios.get('user/constructor-templates', {params: {
        page: Number(query.page) || 1,
      }});
    return {
      templates,
      pagination,
    };
  },
  data: () => ({
    CreatorEnum,
    TemplateApprovalEnum,
  }),
  watchQuery: true,
  methods: {
    async deleteTemplate(template) {
      if (!await this.$confirm({
        mainTitle: this.$trans('account.creators-templates.delete.confirmation.mainTitle'),
        mainSubTitle: this.$trans('account.creators-templates.delete.confirmation.mainSubTitle'),
        mainYesBtn: this.$trans('account.creators-templates.delete.confirmation.mainYesBtn'),
        mainNoBtn: this.$trans('account.creators-templates.delete.confirmation.mainNoBtn'),
        yesTitle: this.$trans('account.creators-templates.delete.confirmation.yesTitle'),
        yesSubTitle: this.$trans('account.creators-templates.delete.confirmation.yesSubTitle'),
        noTitle: this.$trans('account.creators-templates.delete.confirmation.noTitle'),
        noSubTitle: this.$trans('account.creators-templates.delete.confirmation.noSubTitle'),
      })) {
        return;
      }
      let success;
      try {
        ({data: {
          success,
        }} = await this.$axios.delete('user/constructor-template', {params: {
          id: template.id,
        }, silenceException: true}));
      } catch (exception) {
        this.$noty(exception.response?.data?.message || exception.message, 'error');
        return;
      }
      if (success) {
        this.$noty(this.$trans('account.creators-templates.delete-message'), 'error');
        await this.$nuxt.refresh();
      }
    },
  },
}
</script>
