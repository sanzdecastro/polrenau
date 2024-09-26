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
  
  created() {
    const apiUrl = import.meta.env.VITE_STRAPI_URL;
    const authToken = import.meta.env.VITE_AUTH_TOKEN;
    this.fetchAbout(apiUrl, authToken);
    
  },
  methods: {
      ...mapActions(useStore, ['fetchAbout']),
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
  md:grid
  grid-cols-13;

  .slide-autoplay {
    @apply
    order-2
    md:order-1
    overflow-hidden
    md:col-start-1
    md:col-end-6;
  }

  .info {
    @apply
    order-3
    md:order-2
    px-1
    md:px-0
    md:col-span-5;
    p {
      @apply
      mb-2;
    }
  }

  .blocks {
      @apply
      order-1
      md:order-3
      flex
      gap-6
      flex-wrap
      md:flex-col
      px-1
      md:px-0
      col-start-12
      col-span-2;
      .info_block {
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
  md:fixed
  bottom-0
  w-full;
}

</style>
