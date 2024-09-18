<script>
import { gsap } from "gsap";

export default {
  name: 'videoPreview',
  props: {
    thumbnail: Object,
    aspectRatio: String
  },
  mounted() {
    this.animateVideos()
  },
  methods: {
    animateVideos() {
          var tl = gsap.timeline({})

          gsap.set('.media-container', {
            autoAlpha: 0,
          })

          gsap.set('.media-animation', {
            autoAlpha: 0,
          })

          tl.to('.media-container', {
            autoAlpha: 1,
            delay: .5,
            duration: 1,
          }).to('.media-animation', {
            autoAlpha: 1,
            duration: 0.8,
          });
        }
  }
}
</script>

<template>
  <div class="media-container pointer-events-none" :class="thumbnail.AspectRatio ? thumbnail.AspectRatio : aspectRatio">
    <video loop muted autoplay playsinline :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.mp4'" class="media-animation"></video>
    <img :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.jpg' || thumbnail.Media.data.attributes.ext === '.png'" class="media-animation">
  </div>
</template>

<style>

</style>
