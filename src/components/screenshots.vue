<script>
import { gsap } from "gsap";

export default {
  name: 'screenshots',
  props: {
    screenshot: Object,
  },
  created() {

  },
  methods: {

  }
}
</script>

<template>
  
   <div class="project-info_screenshots">
    <p>Screenshots</p>
    <div class="screenshots">
      <div class="screenshot" v-for="screenshotItem in screenshot.data">
        <picture>
          <source :srcset="screenshotItem.attributes.formats.small.url" media="(max-width: 600px)">
          <source :srcset="screenshotItem.attributes.formats.medium.url" media="(max-width: 1024px)">
          <img :src="screenshotItem.attributes.formats.medium.url" alt="Descripción de la imagen">
        </picture>
      </div>
    </div>
    
</div>
  
</template>

<style>
.project-info {
  .project-info_screenshots {
    @apply
    mb-10
    lg:mb-0
    overflow-y-hidden
    lg:grid
    grid-cols-3
    gap-3
    order-4
    lg:order-none
    col-start-1
    col-span-8
    lg:col-start-4
    lg:col-span-11
    flex
    flex-col;
    padding-bottom: calc(76 * var(--r));
    p {
      @apply 
      col-span-full;
    }
    .screenshots {
      @apply
      lg:col-span-3
      lg:grid
      grid-cols-3
      gap-3
      w-fit
      overflow-scroll
      lg:overflow-hidden
      flex;
      .screenshot {
        width: 75vw;
        @apply 
        lg:w-full;
      }
    }
    
  }
}

</style>
