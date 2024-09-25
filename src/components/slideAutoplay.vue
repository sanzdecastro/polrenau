<script>
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default {
  name: 'slideAutoplay',
  props: {
    media: Object,
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {

  },
  setup() {
    return {
        modules: [Autoplay, EffectFade],
      };
  },
  mounted() {
   
  },
  methods: {
    
  }
}
</script>

<template>
   <swiper
      :modules="modules"
          :slides-per-view="1"
          :effect="'fade'"
          :space-between="0"
          :scrollbar="{ draggable: true }"
          :autoplay="{
            delay: 3000, // Tiempo entre slides (en ms)
            disableOnInteraction: false 
          }"
        >
        
        <swiper-slide v-for="(image, index) in media.data" :key="index">
          <img :src="image.attributes.url">
        </swiper-slide>
      </swiper>
</template>

<style>

</style>
