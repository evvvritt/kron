<template lang="pug">
  .inline-block.text-sm.md-text-base.text-grey-dark.border.border-grey.px-5.pt-3.pb-2.rounded.leading-none.hover-text-grey-darker.hover-border-grey-dark.trans-color-fast
    <slot></slot>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: ['href']
}
</script>

<style>
</style>
