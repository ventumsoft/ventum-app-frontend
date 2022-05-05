<template>
  <form class="nobottommargin error-page-search-form">
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control search-form-input"
        :placeholder="$trans('errors.search.input')"
      >
      <div class="input-group-btn">
        <button class="btn btn-success" type="submit">
          {{ $trans('errors.search.button') }}
        </button>
      </div>
    </div>
  </form>
</template>
