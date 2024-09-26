<script>
import { gsap } from "gsap";
import { mapState } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';

export default {
  name: 'videoPreview',
  props: {
    thumbnail: Object
  },
  mounted() { 
    this.animateVideos();
  },
  computed: {
        ...mapState(useStore, ['loading'])
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
  },
  watch: {
      loading(value) {
        if (!value) {
          // La variable cambió a false
            this.animateVideos();
        }
      },
  }
}
</script>

<template>
  <div class="media-container pointer-events-none" :class="thumbnail.AspectRatio ? thumbnail.AspectRatio : aspectRatio">
    <video class="media-animation" loop muted autoplay playsinline :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.mp4'" ></video>
    <img class="media-animation" :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.jpg' || thumbnail.Media.data.attributes.ext === '.png'" >
  </div>
</template>

<style>

</style>
