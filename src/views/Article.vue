<template lang="pug">
  article.fixed.pin.w-full.h-screen.overflow-y-scroll.z-10.cursor-pointer(@click="$emit('close')")
    //- "page" body
    .min-h-screen.relative.z-20.shadow.bg-gradient-1.cursor-default(style="width:95%;margin-left:5%;", @click.stop="doNothing")
      //- text body
      .max-w-5xl.mx-auto.py-25vmin.pl-10.pr-16.sm-pl-20.md-pl-24.md-pr-44.xl-pl-16
        header.sm-w-3x4.lg-w-1x2.mb-32.md-mb-36
          h1.text-2xl.md-text-4xl.leading-tight.mb-6 {{article.title}}
          h6.text-sm.md-text-base <i>{{article.source}}</i><span class="inline-block mx-4">&middot;</span><span class="small-caps">{{article.date}}</span>
        section.md-text-xl.md-ml-20.lg-ml-32.xl-ml-36.leading-normal(v-html="text", style="max-width:30em")
</template>

<script>
export default {
  name: 'Article',
  props: ['article'],
  methods: {
    doNothing () {}
  },
  data () {
    return {
      text: `<p>At first glance, the thirteen photographs in Talia Chetrit’s show seemed to be “about” genitalia. The artist’s vulva, memorably depicted in Untitled (Bottomless #4), 2015, was again the unambiguous subject of her work, alternately pictured in a full-frontal view, facing the audience from behind a gutted pair of pants in Jeans (all works 2016), or via not-so-subtle allusion, as in Legs, a portrait of a tripod-mounted camera pointing downward, coolly aimed at the artist’s crotch.</p><p>Chetrit’s practice has always been marked by an acutely referential display of photographic apparatuses, and for these images, besides showing the camera and tripod, she also included glimpses of the cords that accompany a studio shoot—most emphatically, the cable release, a telltale wire frequently seen snaking through the compositions on view. This device, in one instance cradled between her thighs so as to allow her to trigger the camera’s shutter using her groin, underscored her authorship over the scenes depicted. In each case, the moment of release—a relatively straightforward metaphor for ejaculation—was determined by the artist herself.</p><p>In what could be interpreted as a wry nod to Joan Jonas’s video Organic Honey’s Visual Telepathy, 1972, photographs such as Jeans and Mirror Eyes show Chetrit vamping wryly for the camera, offering up her own body for scrutiny. (The latter depicts her beaming face with quarter-size mirrors over her eyes.) She also cast herself as the female half of the duo depicted in the more explicit “sex” series—an artistic decision that, when you think about it, is both the least exploitative and most expedient way to photograph a model getting fucked from behind. The graininess of some of these images (the result of processing underexposed film or enlarging cropped negatives) echoes both the aesthetic and the ethos of Jonas’s work, with its feminist send-up of early Port-a-Pak video narcissism, while retaining giddy tinges of Carolee Schneemann’s ebullient Fuses, 1964– 67, which captured the filmmaker’s delight at her newfound ability to document sex (and her own agency in recording it). Chetrit’s self-portraiture registers as refreshingly nostalgic, harkening back to a pre-internet era in which a female artist’s presentation of her documented naked body was an act of somatic rebellion rather than of exhibitionism. The artist was not playing a role.</p><p>Yet if all the sex and nudity in Chetrit’s work is striking, it is also a red herring, leading us away from her primary concern—the materiality of analog cameras and the self-conscious intent her medium requires. In looking at these images, we are aware of the limitations of the photographic apparatus—which, unlike digital still- and moving-image recorders, is constrained by the number of exposures in a film roll. Chetrit uses this to her advantage. The work on view was as carefully— indeed virtuosically—composed as any she has yet shown.</p><p>Chetrit’s photographs are interested in showing us how the sausage gets made. This was here demonstrated by thinly veiled photo jokes (the terms exposure and flashing come to mind) and the inclusion of film rolls and studio equipment in the frame. The artist’s emphasis on composition was pointed: She was in control.</p>`
    }
  }
}
</script>

<style scoped>
section >>> p + p{
  text-indent:2.4em;
}
</style>
