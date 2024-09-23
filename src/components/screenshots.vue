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
        <img :src="screenshotItem.attributes.url ">
      </div>
    </div>
    
</div>
  
</template>

<style>
.project-info {
  .project-info_screenshots {
    @apply
    mb-10
    md:mb-0
    overflow-y-hidden
    md:grid
    grid-cols-3
    gap-3
    order-4
    md:order-none
    col-start-1
    col-span-8
    md:col-start-4
    md:col-span-11
    flex
    flex-col;
    padding-bottom: calc(76 * var(--r));
    p {
      @apply 
      col-span-full;
    }
    .screenshots {
      @apply
      md:col-span-3
      md:grid
      grid-cols-3
      gap-3
      w-fit
      overflow-scroll
      md:overflow-hidden
      flex;
      .screenshot {
        width: 75vw;
        @apply 
        md:w-full;
      }
    }
    
  }
}

</style>
