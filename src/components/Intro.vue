<script>
import { gsap } from "gsap";
import { mapState } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'Intro',
  props: {

  },
  created() {
    setTimeout(()=> {
      this.animateIntro();
    }, 3000)
  },
  computed: {
        ...mapState(useStore, ['loading'])
  },
  methods: {
    animateIntro() {
      const tl = gsap.timeline({});

      const intro = document.querySelector(".intro");
      const name = intro.querySelector(".name");
      const p = intro.querySelectorAll("p");
      const containers = document.querySelectorAll(".project-loop .media-container");
      const medias = document.querySelectorAll(".project-loop video");
      const title = document.querySelectorAll("h2");
      const client = document.querySelectorAll(".client");


      gsap.set (containers, {
        autoAlpha: 0,
      })

      gsap.set (medias, {
        filter: "blur(15px)",
        scale: 1.4,
      })

      // gsap.set(name, {
      //   yPercent: -100,
      // })

      gsap.set(title, {
        xPercent: -10,
        autoAlpha: 0,
      })

      gsap.set(client, {
        xPercent: -10,
        autoAlpha: 0,
      })

      tl.to(name, {
        delay: .3,
        yPercent: 0,
      }, '<.5').to(intro, {
        duration: 1,
        backdropFilter: "blur(3px)",
      }).to(p, {
        delay: 1,
        duration: .8,
        yPercent: 100,
      }).to(intro, {
        autoAlpha: 0,
        ease: "power4.out",
      }).to(containers, {
        duration: .5,
        autoAlpha: 1,
        stagger: .04,
        ease: "power1.out"
      }, '<').to(medias, {
        duration: 1,
        filter: "blur(0px)",
        scale: 1,
        stagger: .04,
        ease: "power1.out"
      }, "<.3").to(title, {
        delay: .5,
        xPercent: 0,
        autoAlpha: 1,
        ease: "power1.out"
      }, "<").to(client, {
        xPercent: 0,
        autoAlpha: 1,
        ease: "power1.out"
      }, "<25%")

    }
  },
  // watch: {
  //     loading(value) {
  //       if (!value) {
  //         // La variable cambió a false
  //         setTimeout(() => {
  //           this.animateIntro();
  //         }, 100);
            
  //       }
  //     },
  // }
}
</script>

<template>
  <div class="intro" ref="intro">
    <div class="intro-wrapper">
      <div class="name"><p>Pol Renau Wehr</p></div>
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
      animate-pulse
      overflow-hidden
      px-2;
    }
   
  }
}
</style>
