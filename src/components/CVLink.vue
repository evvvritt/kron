<template lang="pug">
  span(v-if="linkObj")
    template(v-if="linkObj.link_type === 'Document'")
      router-link(:to="{name: linkObj.type, params: {uid: linkObj.uid}}")
        slot
    template(v-else="linkObj.link_type_type === 'Media'")
      a(:href="linkObj.url", target="_blank", rel="nofollow")
        slot
</template>

<script>
export default {
  name: 'CVLink',
  props: {
    linkObj: { type: Object, required: true }
  }
}
</script>

<style>
</style>
