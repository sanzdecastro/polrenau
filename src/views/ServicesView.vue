<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import { data } from 'autoprefixer';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import videoPreview from '@/components/videoPreview.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    videoPreview
  },
  computed: {
        ...mapState(useStore, ['loading','data']),

  },
  setup() {
      return {
        pagination: {
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '<p>' + (index + 1) + '</p>' + '</span>';
          },
        },
        modules: [Pagination, EffectFade, Autoplay, Navigation],
        
      };
    },
  data() {
    return {
      
    }
  },
  created() {
    const apiUrl = import.meta.env.VITE_STRAPI_URL;
    const authToken = import.meta.env.VITE_AUTH_TOKEN;
    this.fetchServices(apiUrl, authToken);
    this.toTop();
  },
  methods: {
      ...mapActions(useStore, ['fetchServices', 'toTop']),

      
      onViewAnimation() {
        const examples = document.querySelectorAll('.examples');

        examples.forEach((example, index) => {
          const tl = gsap.timeline({})
          
          gsap.set(example, {
            autoAlpha: 0,
          })
          ScrollTrigger.create({
            trigger: example,
            start: "top bottom",
            onEnter: () => {
              tl.to(example, {
                autoAlpha: 1,
              })
            }
          });
        });
      }
  },
  watch: {
      loading(value) {
        if (!value) {
          // La variable cambió a false
          this.$nextTick(() => {
            this.onViewAnimation();
          });
        }
      }
  }
}
</script>

<template>

  <main class="services-page grid grid-cols-6 lg:grid-cols-13">
    <section class="services-view lg:col-start-2 grid grid-cols-6 col-span-6 lg:col-span-12 lg:grid-cols-12">
     
        <div class="examples" v-for="service in data.data" :class="
          service.attributes.Columns === 'col1' ? 'col-span-6 col-start-1 lg:col-span-1' :
          service.attributes.Columns === 'col2' ? 'col-span-6 col-start-1 lg:col-span-2' : 
          service.attributes.Columns === 'col3' ? 'col-span-6 col-start-1 lg:col-span-1' : 
          service.attributes.Columns === 'col4' ? 'col-span-6 col-start-1 lg:col-span-6' : 
          service.attributes.Columns === 'col5' ? 'col-span-6 col-start-1 lg:col-span-5' : 
          service.attributes.Columns === 'col6' ? 'col-span-6 col-start-1 lg:col-span-6' : 
          service.attributes.Columns === 'col7' ? 'col-span-6 col-start-1 lg:col-span-7' : 
          service.attributes.Columns === 'col8' ? 'col-span-6 col-start-1 lg:col-span-8' : 
          service.attributes.Columns === 'col9' ? 'col-span-6 col-start-1 lg:col-span-9' : 
          service.attributes.Columns === 'col10' ? 'col-span-6 col-start-1 lg:col-span-10' : 
          service.attributes.Columns === 'col11' ? 'col-span-6 col-start-1 lg:col-span-11' : 
          service.attributes.Columns === 'col12' ? 'col-span-6 col-start-1 lg:col-span-12' : 
          service.attributes.Columns === 'col13' ? 'col-span-6 col-start-1 lg:col-span-13' : '' ">
          <div class="info px-1 lg:px-0">
            <h2>{{ service.attributes.Titulo }}</h2>
            <p>{{ service.attributes.Description }}</p>
          </div>
           
          <swiper
            :modules="modules"
            :effect="'fade'"
            :pagination="pagination"
            :slides-per-view="1"
            :space-between="0"
            :autoplay="{
              delay: 3000, // Tiempo entre slides (en ms)
              disableOnInteraction: false 
            }"
            :navigation
            :scrollbar="{ draggable: true }"
          >
            <swiper-slide class="" v-for="slide in service.attributes.Slides">
              <div></div>
              <videoPreview :class="service.attributes.AspectRatio" :thumbnail="slide"/>
              <router-link class="link px-1 lg:px-0" v-if="slide.proyecto && slide.proyecto.data && slide.proyecto.data.attributes"  :to="`${slide.proyecto.data.attributes.slug}` ">
                &#8599; {{ slide.DescriptionMedia }}
              </router-link>
 
            </swiper-slide>
          </swiper>
        </div>

    </section>
  </main>
  
</template>

<style>
.services-view {
  row-gap: calc(0 * var(--r));
}
.examples {
  margin-bottom: calc(134 * var(--r));
  
  @apply
  flex
  flex-col;

  .info {
   @apply
   flex-auto;
    @media screen and (max-width: 1024px) {
      padding-left: calc(10 * var(--rm));
      padding-right: calc(10 * var(--rm));
    }
    h2 {
      @apply
      block;
      margin-bottom: calc( 8 * var(--r));
    }
    p {
      max-width: 80%;
      margin-bottom: calc( 19 * var(--r));
      @apply
      text-gray-400;
    }
    
  }
  .swiper {
    gap:6px;
    @apply
    h-fit
    flex
    flex-col
    w-full;
    .swiper-pagination {
      
       @apply
       absolute
       top-0
       left-0
       p-2
       pt-3
       lg:py-4
       text-gray-400
       text-left
       h-fit
       flex

       pointer-events-auto;

       .swiper-pagination-bullet.swiper-pagination-bullet-active {
        @apply
        opacity-100
        text-black
        bg-white
        opacity-70;
       }
       .swiper-pagination-bullet {
        @apply
        p-2
        flex
        justify-center
        items-center
        opacity-100
        border
        border-solid
        border-gray-200
        text-gray-200
        opacity-50
        bg-opacity-0
        bg-transparent;
        
        
       }
    }
    .swiper-wrapper {
      @apply
      h-full;
     .swiper-slide-visible {
      @apply
      z-10;
     }
      .swiper-slide {
        @apply
        bg-slate-50
        cursor-grab
        flex
        flex-col
        justify-start
        gap-1;
        .link {
          
          @media screen and (max-width: 1024px) {
            padding-left: calc(10 * var(--rm));
            padding-right: calc(10 * var(--rm));
          }
          @apply
          bg-slate-50
          flex
          h-fit
          text-gray-400;
          &:hover, &:active {
            @apply
            text-blue-700;
          }
        }
        .media-container {
          margin-bottom: calc( 4 * var(--r));

        
          img {
          @apply
          w-full
          h-full
          object-cover;
          }
          video {
            @apply
            max-w-none
            w-full;
          }
        }
      } 
    }
    
  }
}



</style>