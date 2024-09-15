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

gsap.registerPlugin(ScrollTrigger);

export default {
  components: {
    videoProject,
    screenshots,
    relatedProjects
  },
  computed: {
        ...mapState(useStore, ['loading','data']),

        projectViewClasses() {
          // Verifica si los datos necesarios están presentes antes de llamar a getClass
          if (this.data && this.data.View) {
            return this.getClass(this.data.View);
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
    this.toTop();
    },
  methods: {
      ...mapActions(useStore, ['fetchProject', 'getClass', 'setIsInInfoRoute', 'toTop']),
        
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
      },
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
    <section class="project-view" :class="{ 'only-one': data.View && data.View.GridView && data.View.GridView.length === 1 }">
     
        <div class="project-media flex md:grid"  :class="
          getViewColumns(data.View) === 'col1' ? 'md:grid-cols-1' :
          getViewColumns(data.View) === 'col2' ? 'md:grid-cols-2' : 
          getViewColumns(data.View) === 'col3' ? 'md:grid-cols-3' : 
          getViewColumns(data.View) === 'col4' ? 'md:grid-cols-4' : 
          getViewColumns(data.View) === 'col5' ? 'md:grid-cols-5' : 
          getViewColumns(data.View) === 'col6' ? 'md:grid-cols-6' : 
          getViewColumns(data.View) === 'col7' ? 'md:grid-cols-7' : 
          getViewColumns(data.View) === 'col8' ? 'md:grid-cols-8' : 
          getViewColumns(data.View) === 'col9' ? 'md:grid-cols-9' : 
          getViewColumns(data.View) === 'col10' ? 'md:grid-cols-10' : 
          getViewColumns(data.View) === 'col11' ? 'md:grid-cols-11' : 
          getViewColumns(data.View) === 'col12' ? 'md:grid-cols-12' : 
          getViewColumns(data.View) === 'col13' ? 'md:grid-cols-13' : '' ">
            <div class="grid media-section" :class="projectViewClasses">
              <div v-for="media in getViewMedia(data.View)" :class="
                  media.Columns === 'col1' ? 'col-span-full md:col-span-1' :
                  media.Columns === 'col2' ? 'col-span-full md:col-span-2' : 
                  media.Columns === 'col3' ? 'col-span-full md:col-span-3' : 
                  media.Columns === 'col4' ? 'col-span-full md:col-span-4' : 
                  media.Columns === 'col5' ? 'col-span-full md:col-span-5' : 
                  media.Columns === 'col6' ? 'col-span-full md:col-span-full' : 
                  media.Columns === 'col7' ? 'col-span-full md:col-span-7' : 
                  media.Columns === 'col8' ? 'col-span-full md:col-span-8' : 
                  media.Columns === 'col9' ? 'col-span-full md:col-span-9' : 
                  media.Columns === 'col10' ? 'col-span-full md:col-span-10' : 
                  media.Columns === 'col11' ? 'col-span-full md:col-span-11' : 
                  media.Columns === 'col12' ? 'col-span-full md:col-span-12' : 
                  media.Columns === 'col13' ? 'col-span-full md:col-span-13' : '' ">

                  <videoProject :media="media"/>

              </div>
            </div>
        </div>
        <div class="project-info">

          <div class="project-info_title">
            <h1>{{data.Titulo}}</h1>
            <p>{{data.Client}}</p>
          </div>

          <div class="project-info_desc">
            <p>{{data.Description}}</p>
          </div>

          <div class="project-info_year">
            <p>{{data.Year}}</p>
          </div>

          <screenshots v-if="data.Screenshots" :screenshot="data.Screenshots"/>
            
          <relatedProjects v-if="data.Related" :related="data.Related"/>
          
        </div>

  </section>
  </main>
  
</template>

<style>

  .project-view {
    .pin-spacer {
      z-index: 0!important;
    }
    &.only-one {
      .project-media {
        @apply
        !pt-0
        !px-0;
        .media-section {
          @apply
          justify-center
          items-center;
        }
      }
    }
  }

  .project-media {
    min-height: 100vh;
    @apply
    -z-10
    bg-black
    text-white;
    padding-bottom: calc(106 * var(--r));

    @media screen and (max-width: 768px) {
      padding-bottom: calc(60 * var(--rm));
    }
  }


  .project-info {
    min-height: 50vh;
    z-index: 1;
    position: relative;
    @apply
    bg-slate-50
    grid
    grid-cols-13
    gap-0;

    & > div {
      padding: calc(20 * var(--r));
    }
  }

  .project-info_title {
    @apply 
    col-start-2
    col-end-4;
  }

  .project-info_desc {
    @apply 
    col-start-4
    col-end-8;
    p {
      
      padding-bottom: calc(76 * var(--r));
      
    }
  }

  .project-info_year {
    @apply 
    text-right
    col-start-8
    col-end-8;
  }

  .project-info .project-info_screenshots {
    @apply 
    grid
    grid-cols-3
    gap-3
    col-start-4
    col-span-11;
    padding-bottom: calc(76 * var(--r));
  }

  .project-info_screenshots p{
    @apply 
    col-span-full;
  }

  .project-info_screenshots .screenshot{
    @apply 
    w-full;
  }

  .related-projects {
    min-height: 100vh;
    @apply 
    flex
    bg-gray-200
    gap-3
    col-start-1
    col-span-13
    grid
    grid-cols-13;
  }

  .related-projects :nth-child(even) {
    @apply
    col-start-4
    col-span-5;
  }

  .related-projects :nth-child(odd) {
    @apply
    col-start-9
    col-span-5;
  }

  .view + footer {
    margin-top: 0px;
    @apply
    bg-gray-200;
  }

</style>