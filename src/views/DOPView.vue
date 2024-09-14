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
        console.log(this.loading);
  },
  methods: {
        ...mapActions(useStore, ['fetchCategory', 'getClass']),
  },
  
  watch: {
      // loading(value) {
      //   if (!value) {
      //     // La variable cambió a false
      //     this.$nextTick(() => {
      //       this.animateVideos();
      //     });
      //   }
      // }
  },
}
</script>

<template>
    
  <main class="project-loop">
    
    <div v-for="project in data.data" :key="project.id" 
      :class="getClass(project.attributes.Preview)">
      <router-link  :to="`${project.attributes.slug}` ">
      <div class="grid" :class="
        project.attributes.Preview.Columns === 'col1' ? 'grid-cols-1' :
        project.attributes.Preview.Columns === 'col2' ? 'grid-cols-2' : 
        project.attributes.Preview.Columns === 'col3' ? 'grid-cols-3' : 
        project.attributes.Preview.Columns === 'col4' ? 'grid-cols-4' : 
        project.attributes.Preview.Columns === 'col5' ? 'grid-cols-5' : 
        project.attributes.Preview.Columns === 'col6' ? 'grid-cols-6' : 
        project.attributes.Preview.Columns === 'col7' ? 'grid-cols-7' : 
        project.attributes.Preview.Columns === 'col8' ? 'grid-cols-8' : 
        project.attributes.Preview.Columns === 'col9' ? 'grid-cols-9' : 
        project.attributes.Preview.Columns === 'col10' ? 'grid-cols-10' : 
        project.attributes.Preview.Columns === 'col11' ? 'grid-cols-11' : 
        project.attributes.Preview.Columns === 'col12' ? 'grid-cols-12' : 
        project.attributes.Preview.Columns === 'col13' ? 'grid-cols-13' : '' ">

        <div v-for="thumbnail in  project.attributes.Preview.Media" :key="project.id" :class="
          thumbnail.Columns === 'col1' ? 'col-span-1' :
          thumbnail.Columns === 'col2' ? 'col-span-2' : 
          thumbnail.Columns === 'col3' ? 'col-span-3' : 
          thumbnail.Columns === 'col4' ? 'col-span-4' : 
          thumbnail.Columns === 'col5' ? 'col-span-5' : 
          thumbnail.Columns === 'col6' ? 'col-span-6' : 
          thumbnail.Columns === 'col7' ? 'col-span-7' : 
          thumbnail.Columns === 'col8' ? 'col-span-8' : 
          thumbnail.Columns === 'col9' ? 'col-span-9' : 
          thumbnail.Columns === 'col10' ? 'col-span-10' : 
          thumbnail.Columns === 'col11' ? 'col-span-11' : 
          thumbnail.Columns === 'col12' ? 'col-span-12' : 
          thumbnail.Columns === 'col13' ? 'col-span-13' : '' ">
          
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