<template lang="pug">
  small.block
    template(v-if="publisher")
      h6.inline-block <i>{{publisher}}</i>
      span.inline-block.mx-4 &middot;
    h6.inline-block(v-if="year")
      span(class="small-caps") {{season}} {{year}}
</template>

<script>
export default {
  name: 'Article__Details',
  props: ['publisher', 'season', 'year']
}
</script>

<style>
</style>
