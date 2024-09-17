<script>
import { gsap } from "gsap";
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';

export default {
  name: 'Loading',
  props: {

  },
  mounted() {
    this.animateLoading()
  },
  created() {
    
  },
  methods: {
    animateLoading() {
      const tl = gsap.timeline({ repeat: -1});

      const loadingName = document.querySelector(".loading-wrapper p");

      gsap.set(loadingName, {
        yPercent: 100
      })
      tl.to(loadingName, {
        yPercent: 0,
        ease: "power1.out"
      }).to(loadingName, {
        autoAlpha: .6,
        duration: 1,
        ease: "power1.out"
      }).to(loadingName, {
        autoAlpha: 1,
        duration: 1,
        ease: "power1.out"
      })

      // const loadingBar = document.querySelector(".loading-bar");

      // tl.to(loadingBar, {
      //   width: "100%",
      //   duration: 1,
      //   ease: "power1.out"
      // }).to(loadingBar, {
      //   width: "0%",
      //   duration: 1,
      //   ease: "power1.out"
      // })
    }
  }
}
</script>

<template>
  <div class="loading">
    <div class="loading-wrapper">
      <p>Pol Renau Wehr</p>
      <!-- <div class="loading-bar"></div> -->
    </div>
  </div>
</template>

<style>
  @keyframes toblack {
    from {
      @apply
      bg-white;
    }
    to {
      @apply
      bg-black;
    }
  }
  .loading {
    height: 100dvh;
    width: 100vw;
    @apply
    z-40
    p-1
    md:p-3
    bg-white
    flex
    justify-center
    items-center
    fixed
    top-0
    left-0;

    .loading-wrapper {
      width: 100%;
      @apply
      overflow-hidden
      flex
      justify-center
      items-center;
    }
      
    &.white {
      animation: toblack 1s linear forwards;
      
      .loading-bar {
        @apply
        bg-white;
      }

      p {
        @apply
        text-white;
      }
    }

    .loading-bar {
      width: 0%;
      height: 1px;
      @apply
      bg-gray-700
      rounded-sm
      animate-pulse;
    }
  }

  footer.loading {
      opacity: 0;
   }
</style>
