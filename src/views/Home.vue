<template lang="pug">
  article.relative
    transition(name="article")
      router-view(:article="articles[$route.params.slug]", @close="$router.push({name: 'home'})")
    .relative(:style="{transition: 'transform 800ms', transform: $route.name === 'article' ? 'translateX(-5%)' : ''}")
      section#home__intro.relative.w-full.flex.items-center.px-8.md-px-16.py-32
        .w-full.max-w-5xl.mx-auto.pr-20.md-pr-36
          h1.style-hide Cat Kron
          p.text-lg.sm-text-xl.md-text-2xl.leading-tight.text-grey-darkest.md-pb-15vh(style="max-width:30em") Cat Kron is a writer and editor based between Los Angeles and New York. Her work has appeared in <i>Artforum</i>, <i>Art Review</i>, <i>Artsy</i>, <i>Apricota</i>, <i>Bookforum</i>, <i>Bomb</i>, <i>Kunstkritikk</i>, and <i>Modern Painters</i>.
        //- nav.absolute.w-full.pin-l.pin-b.flex.items-center.px-8.md-px-16
          ul.w-full.max-w-5xl.mx-auto.list-reset.tex-lg
            li.inline-block.mr-8
              a.cursor-pointer.hover-text-orange-dark.trans-color-fast CV
            li.inline-block.mr-8
              a.cursor-pointer.hover-text-orange-dark.trans-color-fast Contact
      nav.sticky.pin-t.pin-l.w-screen.flex.items-center.px-8.md-px-16.min-h-32.py-6.bg-gradient-1.border-b.border-grey-light
        .w-full.max-w-5xl.mx-auto.pr-16.list-reset.text-sm.md-text-base.leading-none
          .-m-1
            a.inline-block.p-2.md-mr-2.cursor-pointer Essays
            a.inline-block.p-2.md-mr-2.cursor-pointer Selected Reviews
            a.inline-block.p-2.md-mr-2.cursor-pointer Features
            a.inline-block.p-2.md-mr-2.cursor-pointer Interviews
            a.inline-block.p-2.md-mr-2.cursor-pointer Arts + Culture
            a.inline-block.p-2.md-mr-2.cursor-pointer Place
            a.inline-block.p-2.md-mr-2.cursor-pointer.opacity-33 Contact
            a.inline-block.p-2.md-mr-2.cursor-pointer.opacity-33 CV
      section
        section(v-for="(typ, i) in types")
          h2.border-b.border-grey-light.px-8.md-px-16.text-base.md-text-md.flex.items-center.justify-center(v-if="i > -1", style="height:14em")
            span.block.py-16.w-full.max-w-5xl.mx-auto.small-caps(style="letter-spacing:0.2em") {{typ.label}}
          article.border-b.border-grey-light.px-8.md-px-16(v-for="(article, index) in articles.filter(a => a.cat === typ.id)", :key="index")
            router-link(:to="{name: 'article', params: {slug: index}}")
              header.max-w-5xl.mx-auto.py-12.pr-20.leading-tight
                h2.text-xl.md-text-2xl.mb-2 {{article.title}}
                h6.inline-block.text-xs.md-text-sm.mr-4 <i>{{article.source}}</i><span class="inline-block mx-4">&middot;</span><span class="small-caps">{{article.date}}</span>
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
