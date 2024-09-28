<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import { data } from 'autoprefixer';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import videoProject from '@/components/videoProject.vue';
import screenshots from '@/components/screenshots.vue';
import relatedProjects from '@/components/relatedProjects.vue';
import RelatedProjectsRandom from '@/components/relatedProjectsRandom.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
  components: {
    videoProject,
    screenshots,
    relatedProjects,
    RelatedProjectsRandom
  },
  computed: {
        ...mapState(useStore, ['loading', 'project', 'randomRelated']),

        projectViewClasses() {
          // Verifica si los datos necesarios están presentes antes de llamar a getClass
          if (this.project && this.project.View) {
            return this.getClass(this.project.View);
          }
          return ''; // Devuelve una cadena vacía o una clase predeterminada si los datos no están disponibles
        }
  },
  data() {
    return {
      
    }
  },
  async created() {
    const apiUrl = import.meta.env.VITE_STRAPI_URL;
    const authToken = import.meta.env.VITE_AUTH_TOKEN;
    this.fetchProject(apiUrl, authToken, this.$route.params.title);
    this.fetchAll(apiUrl, authToken);
    this.toTop();
    
  },
  mounted(){
   
  },
  methods: {
      ...mapActions(useStore, ['fetchProject', 'getClass', 'setIsInInfoRoute', 'toTop', 'fetchAll']),
        
      isViewDefined(view) {
        return view && view.Columns !== undefined;
      },
      
      getViewColumns(view) {
        return this.isViewDefined(view) ? view.Columns : '';
      },

      getViewMedia(view) {
        return view && view.GridView !== undefined ? view.GridView : [];
      },

      getScreenshots(view) {
        return view && view.GridView !== undefined ? view.GridView : [];
      },

      pinnedSection() {
        gsap.to(".project-info", {
          scrollTrigger: {
            trigger: ".project-media",
            start: "bottom bottom", // Comienza cuando el borde inferior de .section-normal alcanza el borde inferior del viewport
            pin: true, // Activa el pinning
            pinSpacing: false, // Evita el espaciado adicional alrededor del elemento anclado
          },
        });
      },
      resetHeader(){
        gsap.to(".project-info", {
          scrollTrigger: {
            trigger: ".project-info",
            start: "top top", // Comienza cuando el borde inferior de .section-normal alcanza el borde inferior del viewport
            onEnter: () => {
              this.setIsInInfoRoute(false);
            },
            onLeaveBack: () => {
              this.setIsInInfoRoute(true);
            },
          },
        });
      }
  },
  watch: {
    loading(value) {
      if (!value) {
        // La variable cambió a false
        this.$nextTick(() => {
          this.resetHeader();
          this.toTop();
          setTimeout(() => {
            
            this.pinnedSection();
          }, 1000);
        });
      }
    }
  }
}
</script>

<template>

  <main class="view">
    <section class="project-view" :class="{ 'only-one': project.View && project.View.GridView && project.View.GridView.length === 1 }">
     
        <div class="project-media flex lg:grid"  :class="
          getViewColumns(project.View) === 'col1' ? 'lg:grid-cols-1' :
          getViewColumns(project.View) === 'col2' ? 'lg:grid-cols-2' : 
          getViewColumns(project.View) === 'col3' ? 'lg:grid-cols-3' : 
          getViewColumns(project.View) === 'col4' ? 'lg:grid-cols-4' : 
          getViewColumns(project.View) === 'col5' ? 'lg:grid-cols-5' : 
          getViewColumns(project.View) === 'col6' ? 'lg:grid-cols-6' : 
          getViewColumns(project.View) === 'col7' ? 'lg:grid-cols-7' : 
          getViewColumns(project.View) === 'col8' ? 'lg:grid-cols-8' : 
          getViewColumns(project.View) === 'col9' ? 'lg:grid-cols-9' : 
          getViewColumns(project.View) === 'col10' ? 'lg:grid-cols-10' : 
          getViewColumns(project.View) === 'col11' ? 'lg:grid-cols-11' : 
          getViewColumns(project.View) === 'col12' ? 'lg:grid-cols-12' : 
          getViewColumns(project.View) === 'col13' ? 'lg:grid-cols-13' : '' ">
            <div class="grid media-section" :class="projectViewClasses">
              <div v-for="media in getViewMedia(project.View)" :class="
                  media.Columns === 'col1' ? 'col-span-full lg:col-span-1' :
                  media.Columns === 'col2' ? 'col-span-full lg:col-span-2' : 
                  media.Columns === 'col3' ? 'col-span-full lg:col-span-3' : 
                  media.Columns === 'col4' ? 'col-span-full lg:col-span-4' : 
                  media.Columns === 'col5' ? 'col-span-full lg:col-span-5' : 
                  media.Columns === 'col6' ? 'col-span-full lg:col-span-6' : 
                  media.Columns === 'col7' ? 'col-span-full lg:col-span-7' : 
                  media.Columns === 'col8' ? 'col-span-full lg:col-span-8' : 
                  media.Columns === 'col9' ? 'col-span-full lg:col-span-9' : 
                  media.Columns === 'col10' ? 'col-span-full lg:col-span-10' : 
                  media.Columns === 'col11' ? 'col-span-full lg:col-span-11' : 
                  media.Columns === 'col12' ? 'col-span-full lg:col-span-12' : 
                  media.Columns === 'col13' ? 'col-span-full lg:col-span-13' : '' ">

                  <videoProject v-if="!loading" :media="media" :key="media.id"/>

              </div>
            </div>
        </div>
        <div class="project-info">

          <div class="project-info_title">
            <h1>{{project.Titulo}}</h1>
            <p>{{project.Client}}</p>
          </div>

          <div class="project-info_desc">
            <p>{{project.Description}}</p>
          </div>

          <div class="project-info_year">
            <p>{{project.Year}}</p>
          </div>

          <screenshots v-if="project.Screenshots && project.Screenshots.data !== null" :screenshot="project.Screenshots"/>
            
          <relatedProjects v-if="project.Related && project.Related.data.length !== 0" :related="project.Related"/>
          
          <RelatedProjectsRandom v-else :related="this.randomRelated"/>
           
            <!-- <div class="related-projects">
              <span class="related-projects_title">Related projects</span>
              <div class="related-projects_related">
                
                <router-link  :to="`${this.related1.attributes.slug}` " :key="this.related1.attributes.slug">
                  <div class="media-container" :class="this.related1.attributes.Preview.Media[0].AspectRatio">
                  
                    <video loop muted autoplay playsinline
                      :src="this.related1.attributes.Preview.Media[0].Media.data.attributes.url" 
                      v-if="this.related1.attributes.Preview.Media[0].Media.data.attributes.ext === '.mp4'">
                    </video>
                    <img :src="this.related1.attributes.Preview.Media[0].Media.data.attributes.url" 
                    v-if="this.related1.attributes.Preview.Media[0].Media.data.attributes.ext === '.jpg' || this.related1.attributes.Preview.Media[0].Media.data.attributes.ext === '.png'">
                  
                  </div>
                  <div class="project-details">
                    <h3>{{ this.related1.attributes.Titulo }}</h3>
                    <p class="client">{{ this.related1.attributes.Client }}</p>
                  </div>
                </router-link>
                
                
              </div>
            </div> -->
          

        </div>

  </section>
  </main>
  
</template>

<style>

  .project-view {
    width: 100vw;
    overflow: hidden;
    .pin-spacer {
      z-index: 0!important;
    }
    &.only-one {
      .project-media {
        padding-bottom: calc(0 * var(--r))!important;
        @apply
        !pt-0
        !px-0;
        
        .media-section {
          min-height: 100vh;
          @apply
          justify-center
          items-center;
        }
      }
    }
    .project-media {
      min-height: 100vh;
      @apply
      items-center
      justify-center
      -z-10
      bg-black
      text-white;
      padding-bottom: calc(106 * var(--r));

      @media screen and (max-width: 1024px) {
        padding-bottom: calc(60 * var(--rm));
      }
    }
  }

 


  .project-info {
    min-height: 50vh;
    position: relative;
    width: 100vw;
    @apply
    z-20
    overflow-hidden
    bg-slate-50
    grid
    grid-cols-6
    lg:grid-cols-13
    gap-0;

    & > div {
      padding: calc(20 * var(--r));
    }
  }

  .project-info_title {
    @apply 
    mb-10
    lg:mb-0
    order-1
    lg:order-none
    col-start-1
    col-end-6
    
    lg:col-start-2
    lg:col-end-4;
    p {
      @apply
      text-gray-400;
    }
  }

  .project-info_desc {
    @apply 
    mb-10
    lg:mb-0
    order-3
    lg:order-none
    col-span-full
    lg:col-start-4
    lg:col-end-8;
    p {
      white-space: pre-line;
      padding-bottom: calc(76 * var(--r));
      
    }
  }

  .project-info_year {
    @apply 
    order-2
    lg:order-none
    text-right
    col-start-8
    col-end-8;
  }



  .related-projects {
    min-height: 85vh;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: max-content;
    @apply 
    order-5
    lg:order-none
    col-start-1
    col-span-8
    grid
    
    bg-gray-200
    gap-3
    lg:col-start-1
    lg:col-span-13
    lg:grid
    lg:grid-cols-13;

   
  }

  .related-projects :nth-child(even) {
    @apply
    col-start-1
    col-end-4
    lg:col-start-4
    lg:col-span-5;
  }

  .related-projects :nth-child(odd) {
    @apply
    col-start-4
    
    col-end-7
    lg:col-start-9
    lg:col-span-5;
  }

  .view + footer {
    margin-top: 0px;
    @apply
    relative
    bg-gray-200;
  }

</style>