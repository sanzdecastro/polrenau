<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import { data } from 'autoprefixer';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


export default {
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
        ...mapState(useStore, ['loading','data']),

  },
  setup() {
    return {
        modules: [Autoplay],
      };
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

    <div class="slide">
      <swiper
      :modules="modules"
          :slides-per-view="1"
          :space-between="0"
          :scrollbar="{ draggable: true }"
          :autoplay="{
            delay: 3000, // Tiempo entre slides (en ms)
            disableOnInteraction: false 
          }"
        >
        
        <swiper-slide v-for="(image, index) in data.Images.data" :key="index">
          <img :src="image.attributes.url">
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="info">
      <div v-for="info in data.Info" >
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

  .slide {
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
