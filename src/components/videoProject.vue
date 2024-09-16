<script>
import { gsap } from "gsap";

export default {
  name: 'videoProject',
  props: {
    media: Object,
  },
  data() {
    return {
      isAutoplay: false,
    }
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
            duration: .5,
          }).to('.media-animation', {
            autoAlpha: 1,
            duration: 0.8,
          });
        },
  }
}
</script>

<template>
  <div class="media-container" :class="media.AspectRatio">
    <video controls :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay != true" class="media-animation" :poster=media.Media.data.attributes.previewUrl></video>
    <video autoplay playsinline controls loop controlsList="nodownload" :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay === true" class="media-animation"></video>
    <img :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.jpg' || media.Media.data.attributes.ext === '.png'" class="media-animation">
  </div>
</template>

<style>

</style>
