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


    
  </div>
</template>

<style>
.about {
  @apply
  gap-3
  flex;

  .slide-autoplay {
    @apply
    overflow-hidden
    flex-1;
  }

  .info {
    @apply
    flex-1;
    p{
    @apply
    mb-2;
  }
  }

  
}
</style>
