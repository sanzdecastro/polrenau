<script>
import { gsap } from "gsap";

export default {
  name: 'relatedProjectsRandom',
  props: {
    related: Array,
  },
  created() {

  },
  methods: {

  }
}
</script>

<template>

    <div class="related-projects">
      <span class="related-projects_title">Otros proyectos de Pol Renau Wehr</span>
      <div v-for="related in related" class="related-projects_related">
        
        <router-link  :to="`${related.attributes.slug}` " :key="related.attributes.slug">
          <div class="media-container" :class="related.attributes.Preview.Media[0].AspectRatio">
          
            <video loop muted autoplay playsinline
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

  .related-projects_title {
    padding-top: calc(34 * var(--r));
    @apply
    !col-start-1
    lg:!col-start-4
    col-end-7;
  }
  .project-details {
    @apply
    mt-2;
  }
}

</style>
