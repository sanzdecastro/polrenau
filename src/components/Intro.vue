<script>
import { gsap } from "gsap";

export default {
  name: 'Intro',
  props: {

  },
  mounted() {
    this.animateIntro();
  },
  created() {

  },
  methods: {
    animateIntro() {
      const tl = gsap.timeline({});

      var intro = document.querySelector(".intro");
      var name = intro.querySelector(".name");
      var bar = intro.querySelector("span");
      var desc = intro.querySelector(".desc");
      var p = intro.querySelectorAll("p");

      gsap.set (name, {
        xPercent: 50,
        autoAlpha: 0,
      })

      gsap.set (bar, {
        autoAlpha: 0,
      })

      gsap.set (desc, {
        autoAlpha: 0,
        xPercent: -40,
      })

      tl.to(name, {
        autoAlpha: 1,
        duration: 1,
      }).to(name, {
        delay: 1,
        xPercent: 0,
      }, '<.5').to(bar, {
        autoAlpha: 1,
      }, '<').to(desc, {
        autoAlpha: 1,
        duration: 1,
        xPercent: 0,
        ease: "power1.out",
      }, '<').to(name, {
        backgroundColor: "transparent",
      }).to(intro, {
        duration: 1,
        backdropFilter: "blur(3px)",
      }).to(p, {
        delay: 1,
        duration: .8,
        yPercent: 100,
      }).to(bar,  {
        autoAlpha: 0,
        yPercent: 100,
      }, '<').to(intro, {
        autoAlpha: 0,
        ease: "power4.out",
      })
    }
  }
}
</script>

<template>
  <div class="intro">
    <div class="intro-wrapper">
      <div class="name"><p>Pol Renau Wehr</p></div>
      <span>|</span>
      <div class="desc"><p>Video Storyteller</p></div>
    </div>
  </div>
</template>

<style>
.intro {
  width: 100vw;
  height: 100dvh;
  background-color: #f4e8e0;
  @apply

  pointer-events-none
  flex
  justify-center
  items-center
  z-50
  fixed
  top-0
  left-0;

  .intro-wrapper {
    @apply
    overflow-hidden
    flex;

    & > div {
      @apply
      overflow-hidden
      px-2;
    }
    .name {
      background-color: #f4e8e0;
    }
   
    .desc {
      background-color: #f4e8e0;
      @apply
      text-slate-400
      -z-10;
    }
  }
}
</style>
