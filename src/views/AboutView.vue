<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import { data } from 'autoprefixer';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideAutoplay from '@/components/slideAutoplay.vue';
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';


export default {
  components: {
    SlideAutoplay,
  },
  computed: {
        ...mapState(useStore, ['loading','data']),

  },

  mounted() {
    this.animateAbout();
  },
  
  created() {
    const apiUrl = import.meta.env.VITE_STRAPI_URL;
    const authToken = import.meta.env.VITE_AUTH_TOKEN;
    this.fetchAbout(apiUrl, authToken);
    
  },
  methods: {
      ...mapActions(useStore, ['fetchAbout']),

      animateAbout() {
        const blocks = document.querySelectorAll(".about > div");

        const tl = gsap.timeline({});

        gsap.set(blocks, {
          autoAlpha: 0,
        })

        tl.to(blocks, {
          duration: 1,
          autoAlpha: 1,
          stagger: .3,
          ease: "power1.out"
        })
      }
  }
}
</script>

<template>
  <div class="about">

    <div class="slide-autoplay" v-if="data.Images">
      <SlideAutoplay :media="data.Images"/>
    </div>
    
    <div class="info">
      <div v-for="info in data.Info"  >
        <p v-for="text in info.children">
          {{ text.text }}
        </p>
      </div>
    </div>

    <div class="blocks" >
      <div class="info_block" v-for="block in data.InfoBlock">
        <h3>{{ block.NameBlock }}</h3>
        <div class="info_block_line" v-for="line in block.LineInfoBlock">
          <a target="_blank":href="line.LinkTo">↗ {{ line.NameLink }}</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.about {
  @apply
  gap-3
  flex
  flex-col
  lg:grid
  grid-cols-13;

  .slide-autoplay {
    @apply
    order-2
    lg:order-1
    overflow-hidden
    lg:col-start-1
    lg:col-end-6;
  }

  .info {
    padding-left: calc(20 * var(--r));
    padding-right: calc(20 * var(--r));
    @apply
    order-3
    lg:order-2
    lg:px-0
    lg:col-span-5;
    @media screen and (max-width: 1024px) {
      width: 100%;
      padding-left: calc(10 * var(--rm));
      padding-right: calc(10 * var(--rm));
    }
    p {
      @apply
      mb-2;
    }
  }

  .blocks {
      @apply
      order-1
      lg:order-3
      flex
      gap-6
      flex-wrap
      lg:flex-col
      px-1
      lg:px-0
      col-start-12
      col-span-2;
      padding-left: calc(20 * var(--r));
      padding-right: calc(20 * var(--r));
      @media screen and (max-width: 1024px) {
        padding-left: calc(10 * var(--rm));
        padding-right: calc(10 * var(--rm));
      }
      .info_block {
        @apply
        flex-1
        lg:flex-initial
        lg:w-full;
        h3 {
          @apply
          pb-2;
        }
        a {
          &:hover {
            @apply
            text-blue-700;
          }
        }
        @apply
        mb-3;
      }
  }
}

.about + footer {
  @apply
  lg:fixed
  bottom-0
  w-full;
}

</style>
