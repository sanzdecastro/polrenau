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
        ...mapState(useStore, ['loading', 'data', 'categoryType'])
  },
  data() {
    return {

    }
    
  },
  created() {

        // Accede a las variables de entorno
        const apiUrl = import.meta.env.VITE_STRAPI_URL;
        const authToken = import.meta.env.VITE_AUTH_TOKEN;
        this.fetchData(apiUrl, authToken);
        this.toTop();
        console.log(this.loading);
  },
  methods: {
        ...mapActions(useStore, ['fetchData', 'getClass', 'toTop']),
        
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
    
  <main class="project-loop">
    
    <div v-for="project in data.data"  :key="project.id" 
      :class="getClass(project.attributes.Preview)">
      <router-link  :to="`${project.attributes.slug}` ">
      <div class="grid" :class="
        project.attributes.Preview.Columns === 'col1' ? 'md:grid-cols-1' :
        project.attributes.Preview.Columns === 'col2' ? 'md:grid-cols-2' : 
        project.attributes.Preview.Columns === 'col3' ? 'md:grid-cols-3' : 
        project.attributes.Preview.Columns === 'col4' ? 'md:grid-cols-4' : 
        project.attributes.Preview.Columns === 'col5' ? 'md:grid-cols-5' : 
        project.attributes.Preview.Columns === 'col6' ? 'md:grid-cols-6' : 
        project.attributes.Preview.Columns === 'col7' ? 'md:grid-cols-7' : 
        project.attributes.Preview.Columns === 'col8' ? 'md:grid-cols-8' : 
        project.attributes.Preview.Columns === 'col9' ? 'md:grid-cols-9' : 
        project.attributes.Preview.Columns === 'col10' ? 'md:grid-cols-10' : 
        project.attributes.Preview.Columns === 'col11' ? 'md:grid-cols-11' : 
        project.attributes.Preview.Columns === 'col12' ? 'md:grid-cols-12' : 
        project.attributes.Preview.Columns === 'col13' ? 'md:grid-cols-13' : '' ">

        <div class="media" v-for="thumbnail in  project.attributes.Preview.Media" :key="project.id" :class="
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
          

          <videoPreview :thumbnail="thumbnail" :key="thumbnail.id"/>
          
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
  .project-loop {
    width: 100vw;

    @apply
    overflow-hidden
    grid
    gap-3
    grid-cols-6
    md:grid-cols-13;
    a {
      @apply
      block
      mb-14
      
      md:mb-0;
    }
  }
  .grid {
    @apply
    gap-3;
  }
  .project-details {
    @apply
    pl-1
    md:pl-0
    text-nowrap;
    h2 {
      
    }
    .client {
      @apply
      text-gray-400;
    }
  }
</style>