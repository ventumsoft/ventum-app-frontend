<template>
  <ul v-if="pagesCount" class="pagination">
    <li v-if="currentPage > 1"><TheLink :to="routeBuilder(currentPage - 1)">←</TheLink></li>
    <li v-else class="disabled"><a href="#" @click.prevent>←</a></li>
    <template v-for="element of elements">
      <li v-if="typeof element === 'string'"><span>{{ element }}</span></li>
      <template v-else-if="typeof element === 'number'">
        <li v-if="element === currentPage" class="active"><a href="#" class="active" @click.prevent>{{ element }}</a></li>
        <li v-else><TheLink :to="routeBuilder(element)">{{ element }}</TheLink></li>
      </template>
    </template>
    <li v-if="currentPage < pagesCount"><TheLink :to="routeBuilder(currentPage + 1)">→</TheLink></li>
    <li v-else class="disabled"><a href="#" @click.prevent>→</a></li>
  </ul>
</template>

<script>
export default {
  props: {
    pagesCount: {type: Number},
    currentPage: {type: Number},
    routeBuilder: {type: Function},
  },
  computed: {
    elements() {
      const result = [];

      let eachSideWithCurrentPages = 10;
      let eachSidePages = 2;
      let eachDirectionFromCurrentPages = 3;
      let startSidePages = (this.currentPage <= eachSideWithCurrentPages - eachDirectionFromCurrentPages) ? eachSideWithCurrentPages : eachSidePages;
      let endSidePages = (this.currentPage >= this.pagesCount - (eachSideWithCurrentPages - eachDirectionFromCurrentPages) + 1) ? eachSideWithCurrentPages : eachSidePages;

      let firstDotsFlag = false;
      let secondDotsFlag = false;
      for (let page = 1; page <= this.pagesCount; page++) {
        if (page <= startSidePages) {
          result.push(page);
        } else if ((page > startSidePages) && (page < this.currentPage - eachDirectionFromCurrentPages) && !firstDotsFlag) {
          result.push('...');
          firstDotsFlag = true;
        } else if ((this.currentPage - eachDirectionFromCurrentPages <= page) && (page <= this.currentPage + eachDirectionFromCurrentPages)) {
          result.push(page);
        } else if ((page < this.pagesCount - endSidePages + 1) && (page > this.currentPage + eachDirectionFromCurrentPages - 1) && !secondDotsFlag) {
          result.push('...');
          secondDotsFlag = true;
        } else if (page >= this.pagesCount - endSidePages + 1) {
          result.push(page);
        }
      }

      return result;
    },
  },
}
</script>
