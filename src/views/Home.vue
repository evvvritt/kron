<template lang="pug">
  article.relative
    transition(name="article")
      router-view(@close="$router.push({name: 'home'})")
    .relative(:style="{transition: 'transform 800ms', transform: $route.name === 'article' ? 'translateX(-5%)' : ''}")
      //- intro
      section#home__intro.relative.w-full.flex.items-center.px-8.md-px-16.py-32
        .w-full.max-w-5xl.mx-auto.pr-20.md-pr-36
          h1.style-hide Cat Kron
          .md-pb-15vh(v-if="doc.about")
            .relative
              //- about
              prismic-rich-text.text-lg.sm-text-xl.md-text-2xl.leading-tight.text-grey-darkest(:field="doc.about", style="max-width:30em")
              //- contact btn
              .absolute.pin-l.top-100.mt-12
                button-link(:href="'mailto:' + doc.contact") Contact
      //- nav
      nav.sticky.pin-t.pin-l.w-screen.flex.items-center.px-8.md-px-16.min-h-32.py-6.bg-gradient-1.border-b.border-grey-light(v-if="doc.body")
        .w-full.max-w-5xl.mx-auto.pr-16.list-reset.text-sm.md-text-base.leading-none
          .-m-1
            a.inline-block.p-2.md-mr-2.cursor-pointer(v-for="section in doc.body") {{$prismic.richTextAsPlain(section.primary.name)}}
            a.inline-block.p-2.md-mr-2.cursor-pointer.opacity-33 CV
      //- articles
      section(v-if="doc.body")
        section(v-for="(section, i) in doc.body", :key="i", v-if="section.items.length > 0")
          h2.border-b.border-grey-light.px-8.md-px-16.text-base.md-text-md.flex.items-center.justify-center(v-if="i > -1", style="height:14em")
            span.block.py-16.w-full.max-w-5xl.mx-auto.small-caps(style="letter-spacing:0.2em") {{$prismic.richTextAsPlain(section.primary.name)}}
          article.border-b.border-grey-light.px-8.md-px-16(v-for="(item, ii) in section.items", :key="ii", v-if="item.article && item.article.uid")
            router-link(:to="{name: 'article', params: {uid: item.article.uid}}")
              header.max-w-5xl.mx-auto.py-12.pr-20.leading-tight
                h2.text-xl.md-text-2xl.mb-2
                  prismic-rich-text(:field="item.article.data.title")
                article-details.text-xs.md-text-sm.mr-4(:publisher="item.article.data.publisher", :season="item.article.data.date__season", :year="item.article.data.date__year")
      footer(style="height:66vh;min-height:414px")
        section.max-w-5xl.mx-auto
    //- scrim
    transition(name="scrim")
      .absolute.pin.bg-black.opacity-50(v-show="$route.name !== 'home'")
</template>

<script>
import ArticleDetails from '@/components/Article__Details'
import ButtonLink from '@/components/ButtonLink'
export default {
  name: 'home',
  components: { ArticleDetails, ButtonLink },
  data () {
    return {
      doc: {}
    }
  },
  methods: {
    getHome () {
      const fetchlinks = ['article.title', 'article.publisher', 'article.date__season', 'article.date__year']
      this.$prismic.client.getSingle('home', { fetchLinks: fetchlinks }).then(resp => { this.doc = resp.data })
    }
  },
  created () {
    this.getHome()
  }
}
</script>

<style>
@import '../style/_settings.css';

.article-enter-active,
.article-leave-active{transition: all 800ms;}
.article-enter,
.article-leave-to{transform:translateX(30%); opacity:0;}

.scrim-enter-active,
.scrim-leave-active{transition: opacity 800ms;}
.scrim-enter,
.scrim-leave-to{opacity:0;}

#home__intro{
  min-height:72vh;
  @media (--bkpt-md) {
    min-height: calc(100vh - 8rem)
  }
}
</style>
