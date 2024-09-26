<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import { gsap } from "gsap";

import videoPreview from '@/components/videoPreview.vue';

export default {
  components: {
    videoPreview
  },
  computed: {
        ...mapState(useStore, ['loading', 'data'])
  },
  created() {

        // Accede a las variables de entorno
        const apiUrl = import.meta.env.VITE_STRAPI_URL;
        const authToken = import.meta.env.VITE_AUTH_TOKEN;
        this.fetchCategory(apiUrl, authToken, "dop");
        this.toTop();
        console.log(this.loading);
  },
  methods: {
        ...mapActions(useStore, ['fetchCategory', 'getClass', 'toTop']),

        animateTitles(){
          var tl = gsap.timeline({})

          const title = document.querySelectorAll("h2");
          const client = document.querySelectorAll(".client");

          gsap.set(title, {
            xPercent: -10,
            autoAlpha: 0,
          })

          gsap.set(client, {
            xPercent: -10,
            autoAlpha: 0,
          })

          tl.to(title, {
            delay: .5,
            xPercent: 0,
            autoAlpha: 1,
            ease: "power1.out"
          }).to(client, {
            xPercent: 0,
            autoAlpha: 1,
            ease: "power1.out"
          }, "<25%")
        }
  },
  
  watch: {
      loading(value) {
        if (!value) {
          // La variable cambió a false
          this.$nextTick(() => {
            this.animateTitles();
          });
        }
      }
  },
}
</script>

<template>
    
  <main class="project-loop dop">
    
    <div v-for="project in data.data" :key="project.id" 
      :class="getClass(project.attributes.Preview)">
      <router-link  :to="`${project.attributes.slug}` ">
      <div class="grid" :class="
       project.attributes.Preview.Columns === 'col1' ? 'lg:grid-cols-1 grid-cols-2' :
        project.attributes.Preview.Columns === 'col2' ? 'lg:grid-cols-2 grid-cols-2' : 
        project.attributes.Preview.Columns === 'col3' ? 'lg:grid-cols-3 grid-cols-3' : 
        project.attributes.Preview.Columns === 'col4' ? 'lg:grid-cols-4 grid-cols-3' : 
        project.attributes.Preview.Columns === 'col5' ? 'lg:grid-cols-5 grid-cols-3' : 
        project.attributes.Preview.Columns === 'col6' ? 'lg:grid-cols-6 grid-cols-4' : 
        project.attributes.Preview.Columns === 'col7' ? 'lg:grid-cols-7 grid-cols-4' : 
        project.attributes.Preview.Columns === 'col8' ? 'lg:grid-cols-8 grid-cols-4' : 
        project.attributes.Preview.Columns === 'col9' ? 'lg:grid-cols-9 grid-cols-4' : 
        project.attributes.Preview.Columns === 'col10' ? 'lg:grid-cols-10 grid-cols-5' : 
        project.attributes.Preview.Columns === 'col11' ? 'lg:grid-cols-11 grid-cols-6' : 
        project.attributes.Preview.Columns === 'col12' ? 'lg:grid-cols-12 grid-cols-6' : 
        project.attributes.Preview.Columns === 'col13' ? 'lg:grid-cols-13 grid-cols-6' : '' ">

        <div v-for="thumbnail in  project.attributes.Preview.Media" :key="project.id" :class="
          thumbnail.Columns === 'col1' ? 'lg:col-span-1 col-span-2' :
          thumbnail.Columns === 'col2' ? 'lg:col-span-2 col-span-2' : 
          thumbnail.Columns === 'col3' ? 'lg:col-span-3 col-span-2' : 
          thumbnail.Columns === 'col4' ? 'lg:col-span-4 col-span-3' : 
          thumbnail.Columns === 'col5' ? 'lg:col-span-5 col-span-3' : 
          thumbnail.Columns === 'col6' ? 'lg:col-span-6 col-span-3' : 
          thumbnail.Columns === 'col7' ? 'lg:col-span-7 col-span-4' : 
          thumbnail.Columns === 'col8' ? 'lg:col-span-8 col-span-4' : 
          thumbnail.Columns === 'col9' ? 'lg:col-span-9 col-span-4' : 
          thumbnail.Columns === 'col10' ? 'lg:col-span-10 col-span-5' : 
          thumbnail.Columns === 'col11' ? 'lg:col-span-11 col-span-5' : 
          thumbnail.Columns === 'col12' ? 'lg:col-span-12 col-span-6' : 
          thumbnail.Columns === 'col13' ? 'lg:col-span-13 col-span-6' : '' ">
          
          <!-- <div class="media-container" :class="thumbnail.AspectRatio">
            <video loop controls :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.mp4'" class="video-animation"></video>
            <img :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.jpg' || thumbnail.Media.data.attributes.ext === '.png'">
          </div> -->
          <videoPreview :thumbnail="thumbnail"/>
          
        </div>
        
          <div class="project-details">
            <h2>{{ project.attributes.Titulo }}</h2>
            <div class="client">{{ project.attributes.Client }}</div>
          </div>
        
      </div>
      </router-link>
    </div>
  </main>
</template>

<style>

</style>