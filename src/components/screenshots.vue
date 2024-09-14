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
    <div class="screenshot" v-for="screenshotItem in screenshot.data">
    <img :src="screenshotItem.attributes.url ">
  </div>
</div>
  
</template>

<style>

</style>
