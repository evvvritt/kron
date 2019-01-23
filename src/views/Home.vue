<template lang="pug">
  article.home.relative(:data-route="$route.name")
    transition(name="article")
      router-view(@close="$router.push({name: 'home'})")
    .home__main.relative(:style="{transition: 'transform 800ms', transform: $route.name === 'article' ? 'translateX(-5%)' : ''}")
      //- intro
      section#home__intro.relative.w-full.flex.items-center.px-8.md-px-16.py-32
        .w-full.max-w-5xl.mx-auto.pr-20.md-pr-36
          h1.style-hide Cat Kron
          .md-pb-15vh(v-if="doc.about")
            .relative.trans-all-slow(:class="{'opacity-0 translY-25pct': loading}")
              //- about
              prismic-rich-text.text-lg.sm-text-xl.md-text-2xl.leading-tight.text-grey-darkest(:field="doc.about", style="max-width:30em;")
              //- contact btn
              .absolute.pin-l.top-100.mt-12(style="transition: all 1000ms 500ms", :class="{'opacity-0': loading}")
                a(:href="'mailto:' + doc.contact", target="_blank", rel="nofollow")
                  btn Contact
      //- nav
      nav.sticky.pin-t.pin-l.w-screen.flex.items-center.px-8.md-px-16.min-h-32.py-6.bg-gradient-1.border-b.border-grey-light.trans-opacity-slow(v-if="doc.body", ref="nav", :class="{'opacity-0': loading}")
        .w-full.max-w-5xl.mx-auto.pr-16.list-reset.text-sm.md-text-base.leading-none
          .-m-1
            a.inline-block.p-2.md-mr-2.cursor-pointer.trans-opacity-fast(v-for="(section, i) in doc.body", @click="jumpTo(section.primary.name)", v-if="section.items.length > 0", :class="{'opacity-25': activeWaypoint > -1 && activeWaypoint !== i}") {{$prismic.richTextAsPlain(section.primary.name)}}
            .inline-block.p-2.md-mr-2.cursor-pointer.opacity-33
              cv-link(:linkObj="doc.cv_link") CV
      //- articles
      section(v-if="doc.body")
        //- category
        section(v-for="(section, i) in doc.body", :key="i", v-if="section.items.length > 0", :id="'home__section--' + kebab(section.primary.name)", ref="section")
          //- cat title
          h2.border-b.border-grey-light.px-8.md-px-16.text-base.md-text-md.flex.items-center.justify-center(v-if="i > -1", style="height:14em")
            span.block.py-16.w-full.max-w-5xl.mx-auto.small-caps(style="letter-spacing:0.2em") {{$prismic.richTextAsPlain(section.primary.name)}}
          //- article loop
          article.border-b.border-grey-light.px-8.md-px-16(v-for="(item, ii) in section.items", :key="ii", v-if="item.article && item.article.uid")
            router-link(:to="{name: 'article', params: {uid: item.article.uid}}")
              header.max-w-5xl.mx-auto.py-12.pr-20.leading-tight
                h2.text-xl.md-text-2xl.mb-2
                  prismic-rich-text(:field="item.article.data.title")
                article-details.text-xs.md-text-sm.mr-4(:publisher="item.article.data.publisher", :season="item.article.data.date__season", :year="item.article.data.date__year")
      footer(style="height:61.8vh;min-height:414px").relative.flex.items-center.justify-center.px-8.md-px-16
        section.w-full.max-w-5xl.mx-auto.pb-20
          cv-link.text-lg(:linkObj="doc.cv_link")
            btn.px-8 CV
      small.block.px-8.md-px-16.text-grey.text-xs
        .max-w-5xl.mx-auto.small-caps
          span.font-sans.inline-block.py-10.cursor-pointer(v-show="!showCredits", @click="showCredits = true") Credits
          span.font-sans.inline-block.py-10(v-show="showCredits") Site by <a class="underline" href="http://everettwilliams.info" target="_blank" rel="nofollow">Everett Williams</a>
    //- scrim
    transition(name="scrim")
      .home__scrim.absolute.pin.bg-black.opacity-50(v-show="$route.name !== 'home'")
</template>

<script>
import ArticleDetails from '@/components/Article__Details'
import Btn from '@/components/Button'
import cvLink from '@/components/CVLink'
import _kebab from 'lodash/kebabCase'
import _throttle from 'lodash/throttle'
export default {
  name: 'home',
  components: { ArticleDetails, Btn, cvLink },
  data () {
    return {
      doc: {},
      loading: true,
      navHt: 0,
      showCredits: false,
      waypoints: [],
      activeWaypoint: -1
    }
  },
  head: {
    meta: function () {
      const desc = this.doc.site_description
      return desc && [{ name: 'description', content: this.$prismic.richTextAsPlain(desc), id: 'meta-desc' }]
    }
  },
  methods: {
    kebab (field) {
      return _kebab(this.$prismic.richTextAsPlain(field))
    },
    getNavHt () {
      const el = this.$refs.nav
      if (!el) return 0
      this.navHt = el.offsetHeight
      return this.navHt
    },
    getWaypoints () {
      const pts = []
      const body = document.body.getBoundingClientRect()
      this.$refs.section.forEach(sec => {
        const box = sec.getBoundingClientRect()
        pts.push(box.top - body.top)
      })
      this.waypoints = pts
    },
    jumpTo (name) {
      const offset = this.getNavHt()
      const el = '#home__section--' + this.kebab(name)
      return this.$scrollTo(el, 500, { offset: -offset })
    },
    onScroll: _throttle(function () {
      const y = window.pageYOffset + this.navHt + 50
      let index = -1
      this.waypoints.forEach((pt, i) => { if (y >= pt) index = i })
      this.activeWaypoint = index
    }, 100),
    getHome () {
      const fetchlinks = ['article.title', 'article.publisher', 'article.date__season', 'article.date__year']
      return this.$prismic.client.getSingle('home', { fetchLinks: fetchlinks })
        .then(resp => {
          this.doc = resp.data
          this.$emit('updateHead')
        })
    }
  },
  created () {
    this.getHome().then(() => {
      setTimeout(() => { this.loading = false }, 1000)
    })
  },
  updated () {
    this.getNavHt()
    this.getWaypoints()
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
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

@media print {
  .bg-gradient-1{background:white;}
  [data-route="article"] .home__main,
  .home__scrim{
    display: none
  }
}
</style>
