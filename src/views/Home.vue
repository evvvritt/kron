<template lang="pug">
  article.relative
    transition(name="article")
      router-view(:article="articles[$route.params.slug]")
    .relative(:style="{transition: 'transform 800ms', transform: $route.name === 'article' ? 'translateX(-5%)' : ''}")
      section.relative.w-full.flex.items-center.px-8(style="height:calc(100vh - 8rem);")
        .w-full.max-w-5xl.mx-auto
          h1.style-hide Cat Kron
          p.leading-tight.text-grey-darkest(style="font-size:1.5em; max-width:30em; padding-bottom:15vh") Cat Kron is a writer and editor based between Los Angeles and New York. Her work has appeared in <i>Artforum</i>, <i>Art Review</i>, <i>Artsy</i>, <i>Apricota</i>, <i>Bookforum</i>, <i>Bomb</i>, <i>Kunstkritikk</i>, and <i>Modern Painters</i>.
        //- nav.absolute.w-full.pin-l.pin-b.flex.items-center.px-8
          ul.w-full.max-w-5xl.mx-auto.list-reset.tex-lg
            li.inline-block.mr-8
              a.cursor-pointer.hover-text-orange-dark.trans-color-fast CV
            li.inline-block.mr-8
              a.cursor-pointer.hover-text-orange-dark.trans-color-fast Contact
      nav.sticky.pin-t.pin-l.w-screen.flex.items-center.px-8.h-32.bg-gradient-1.border-b.border-grey-light
        ul.w-full.max-w-5xl.mx-auto.list-reset.tex-lg
          li.inline-block.mr-8
            a.cursor-pointer.hover-text-orange-dark.trans-color-fast Essays
          li.inline-block.mr-8
            a.cursor-pointer.hover-text-orange-dark.trans-color-fast Selected Reviews
          li.inline-block.mr-8
            a.cursor-pointer.hover-text-orange-dark.trans-color-fast Features
          li.inline-block.mr-8
            a.cursor-pointer.hover-text-orange-dark.trans-color-fast Interviews
          li.inline-block.mr-8
            a.cursor-pointer.hover-text-orange-dark.trans-color-fast Arts + Culture
          li.inline-block.mr-8
            a.cursor-pointer.hover-text-orange-dark.trans-color-fast Place
      section
        article.border-b.border-grey-light.px-8(v-for="(article, index) in articles", :key="index")
          router-link(:to="{name: 'article', params: {slug: index}}")
            header.max-w-5xl.mx-auto.py-12.leading-tight
              h2.text-2xl.mb-2 {{article.title}}
              h6.inline-block.text-sm.mr-4 <i>{{article.source}}</i><span class="inline-block mx-4">&middot;</span><span class="small-caps">{{article.date}}</span>
    //- scrim
    transition(name="scrim")
      .absolute.pin.bg-black.opacity-50(v-show="$route.name !== 'home'")
</template>

<script>
const newArticle = (title, source, date, type = 'article') => { return { title: title, source: source, date: date, type: type } }
export default {
  name: 'home',
  data () {
    return {
      articles: [
        newArticle('Leigh Ruple', 'Page Gallery', 'March 2018'),
        newArticle('Under the Paving Stones: Dispatch from Pittsburg', 'Art Review', 'Winter 2019'),
        newArticle('Raúl de Nieves', 'Art Review', 'Winter 2019'),
        newArticle('Orhan Pamuk', 'Bookforum', 'Winter 2019'),
        newArticle('Salmon Creek Farm and Flexible Utopias', 'Apricota', 'Winter 2019'),
        newArticle('Suellen Rocca: Drawings', 'Matthew Marks Gallery', 'Fall 2018'),
        newArticle('Nancy Holt: Sun Tunnels', 'Artsy', 'September 2018')
      ]
    }
  }
}
</script>

<style>
.article-enter-active,
.article-leave-active{transition: all 800ms;}
.article-enter,
.article-leave-to{transform:translateX(30%); opacity:0;}

.scrim-enter-active,
.scrim-leave-active{transition: opacity 800ms;}
.scrim-enter,
.scrim-leave-to{opacity:0;}
</style>
