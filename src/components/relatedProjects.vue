<script>
import { gsap } from "gsap";

export default {
  name: 'relatedProjects',
  props: {
    related: Object,
  },
  created() {

  },
  methods: {

  }
}
</script>

<template>

    <div class="related-projects">
      <span class="title">Related projects</span>
      <div v-for="related in related.data" class="related-projects_related">
        
        <router-link  :to="`${related.attributes.slug}` " :key="related.attributes.slug">
          <div class="media-container" >
          
            <video loop muted autoplay 
              :src="related.attributes.Preview.Media[0].Media.data.attributes.url" 
              v-if="related.attributes.Preview.Media[0].Media.data.attributes.ext === '.mp4'">
            </video>
            <img :src="related.attributes.Preview.Media[0].Media.data.attributes.url" 
            v-if="related.attributes.Preview.Media[0].Media.data.attributes.ext === '.jpg' || related.attributes.Preview.Media[0].Media.data.attributes.ext === '.png'">
          
          </div>
          <div class="project-details">
            <h3>{{ related.attributes.Titulo }}</h3>
            <p class="client">{{ related.attributes.Client }}</p>
          </div>
        </router-link>
        
        
      </div>
    </div>
  
</template>

<style>
.related-projects {
  .title {
    padding-top: calc(34 * var(--r));
    @apply
    inline-block
    !col-start-4
    !col-span-11;
  }
  .project-details {
    @apply
    mt-2;
  }
}

</style>
