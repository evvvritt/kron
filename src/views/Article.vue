<template lang="pug">
  article.article.fixed.pin.w-full.h-screen.overflow-y-scroll.z-10.cursor-pointer(@click="$emit('close')")
    //- "page" body
    .article__body.md-w-95pct.md-ml-5pct.min-h-screen.relative.z-20.shadow.bg-gradient-1.cursor-default(@click.stop="doNothing")
      //- text body
      transition(name="fade")
        .max-w-5xl.mx-auto.py-25vmin.pl-10.pr-16.sm-pl-20.md-pl-24.md-pr-44.xl-pl-16(v-if="doc")
          header.sm-w-3x4.lg-w-1x2.mb-32.md-mb-36
            prismic-rich-text.text-2xl.md-text-4xl.leading-tight.mb-6(:field="doc.title")
            article-details.text-sm.md-text-base(:publisher="doc.publisher", :season="doc.date__season", :year="doc.date__year")
            nav.mt-16(v-if="doc.external_source.url")
              a(:href="doc.external_source.url", target="_blank", rel="nofollow")
                btn {{btnLabel}}
          section.md-text-xl.md-ml-20.lg-ml-32.xl-ml-36.leading-normal(style="max-width:30em")
            prismic-rich-text(:field="doc.body")
</template>

<script>
import ArticleDetails from '@/components/Article__Details'
import Btn from '@/components/Button'
export default {
  name: 'Article',
  props: ['uid'],
  components: { ArticleDetails, Btn },
  data () {
    return {
      doc: null
    }
  },
  computed: {
    btnLabel () {
      const type = this.doc.external_source.link_type
      return type === 'Web' ? 'View Online' : type === 'Media' ? 'View PDF' : null
    }
  },
  methods: {
    doNothing () {},
    getDoc (uid) {
      if (!uid) return console.error('Missing parameter: uid')
      this.$prismic.client.getByUID('article', uid).then(doc => { this.doc = doc.data })
    }
  },
  created () {
    this.getDoc(this.uid)
  }
}
</script>

<style scoped>
section >>> p + p{
  text-indent:2.4em;
}

@media print {
  .article{
    position:static;
    height:auto;
  }
  .article__body{
    margin-left:0;
    width:100%;
    background:white;
  }
}
</style>
