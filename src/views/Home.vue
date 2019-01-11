<template lang="pug">
  article.relative
    transition(name="article")
      router-view(:article="articles[$route.params.slug]")
    #home__intro.relative(:style="{transition: 'transform 800ms', transform: $route.name === 'article' ? 'translateX(-5%)' : ''}")
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
      nav.sticky.pin-t.pin-l.w-screen.flex.items-center.px-8.min-h-32.py-6.bg-gradient-1.border-b.border-grey-light
        ul.w-full.max-w-5xl.mx-auto.list-reset.text-base.leading-normal
          li.inline-block.mr-10
            a.cursor-pointer Essays
          li.inline-block.mr-10
            a.cursor-pointer Selected Reviews
          li.inline-block.mr-10
            a.cursor-pointer Features
          li.inline-block.mr-10
            a.cursor-pointer Interviews
          li.inline-block.mr-10
            a.cursor-pointer Arts + Culture
          li.inline-block.mr-10
            a.cursor-pointer Place
          li.inline-block.mr-10
            a.cursor-pointer.opacity-33 Contact
          li.inline-block.mr-10
            a.cursor-pointer.opacity-33 CV
      section
        section(v-for="(typ, i) in types")
          h2.border-b.border-grey-light.px-8.text-md.flex.items-center.justify-center(v-if="i > -1", style="height:14em")
            span.block.py-16.w-full.max-w-5xl.mx-auto.small-caps(style="letter-spacing:0.2em") {{typ.label}}
          article.border-b.border-grey-light.px-8(v-for="(article, index) in articles.filter(a => a.cat === typ.id)", :key="index")
            router-link(:to="{name: 'article', params: {slug: index}}")
              header.max-w-5xl.mx-auto.py-12.leading-tight
                h2.text-2xl.mb-2 {{article.title}}
                h6.inline-block.text-sm.mr-4 <i>{{article.source}}</i><span class="inline-block mx-4">&middot;</span><span class="small-caps">{{article.date}}</span>
      footer(style="height:66vh;min-height:414px")
        section.max-w-5xl.mx-auto
    //- scrim
    transition(name="scrim")
      .absolute.pin.bg-black.opacity-50(v-show="$route.name !== 'home'")
</template>

<script>
const newArticle = (cat = 'essay', title, source, date, type = 'article') => { return { title: title, source: source, date: date, type: type, cat: cat } }
export default {
  name: 'home',
  data () {
    return {
      types: [
        { id: 'essay', label: 'Essays' },
        { id: 'reviews', label: 'Selected Reviews' },
        { id: 'features', label: 'Features' }
      ],
      articles: [
        newArticle('essay', 'Leigh Ruple', 'Page Gallery', 'March 2018'),
        newArticle('essay', 'Under the Paving Stones: Dispatch from Pittsburg', 'Art Review', 'Winter 2019'),
        newArticle('essay', 'Raúl de Nieves', 'Art Review', 'Winter 2019'),
        newArticle('essay', 'Orhan Pamuk', 'Bookforum', 'Winter 2019'),
        newArticle('essay', 'Salmon Creek Farm and Flexible Utopias', 'Apricota', 'Winter 2019'),
        newArticle('essay', 'Suellen Rocca: Drawings', 'Matthew Marks Gallery', 'Fall 2018'),
        newArticle('essay', 'Nancy Holt: Sun Tunnels', 'Artsy', 'September 2018'),
        newArticle('reviews', 'Leigh Ruple', 'Page Gallery', 'March 2018'),
        newArticle('reviews', 'Under the Paving Stones: Dispatch from Pittsburg', 'Art Review', 'Winter 2019'),
        newArticle('reviews', 'Raúl de Nieves', 'Art Review', 'Winter 2019'),
        newArticle('reviews', 'Orhan Pamuk', 'Bookforum', 'Winter 2019'),
        newArticle('reviews', 'Salmon Creek Farm and Flexible Utopias', 'Apricota', 'Winter 2019'),
        newArticle('reviews', 'Suellen Rocca: Drawings', 'Matthew Marks Gallery', 'Fall 2018'),
        newArticle('reviews', 'Nancy Holt: Sun Tunnels', 'Artsy', 'September 2018'),
        newArticle('features', 'Leigh Ruple', 'Page Gallery', 'March 2018'),
        newArticle('features', 'Under the Paving Stones: Dispatch from Pittsburg', 'Art Review', 'Winter 2019'),
        newArticle('features', 'Raúl de Nieves', 'Art Review', 'Winter 2019'),
        newArticle('features', 'Orhan Pamuk', 'Bookforum', 'Winter 2019'),
        newArticle('features', 'Salmon Creek Farm and Flexible Utopias', 'Apricota', 'Winter 2019'),
        newArticle('features', 'Suellen Rocca: Drawings', 'Matthew Marks Gallery', 'Fall 2018'),
        newArticle('features', 'Nancy Holt: Sun Tunnels', 'Artsy', 'September 2018')
      ]
    }
  }
}
</script>

<style>
/*@import '../style/_settings.css';*/
@media (--bkpt-md) {
  #home__intro{
    background: red
  }
}
.article-enter-active,
.article-leave-active{transition: all 800ms;}
.article-enter,
.article-leave-to{transform:translateX(30%); opacity:0;}

.scrim-enter-active,
.scrim-leave-active{transition: opacity 800ms;}
.scrim-enter,
.scrim-leave-to{opacity:0;}
</style>
