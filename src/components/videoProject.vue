<script>
import { gsap } from "gsap";
// import videojs from 'video.js';

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
    this.animateVideos();
    // this.player = videojs(this.$refs.videoPlayer, {
    //   controls: true,
    //   autoplay: this.media.autoplay,
    //   preload: 'none',
    //   loop: true,
    //   sources: [{
    //     src: this.media.Media.data.attributes.url,
    //     type: 'video/mp4'
    //   }]
    // });
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

          gsap.set('.legend', {
            autoAlpha: 0,
          })

          tl.to('.media-container', {
            autoAlpha: 1,
            duration: .5,
          }).to('.media-animation', {
            autoAlpha: 1,
            duration: 0.8,
          }).to('.legend', {
            autoAlpha: 1,
            duration: 0.4,
          },'<');
        },
  }
}
</script>

<template>
  
  <div class="media-container" :class="media.AspectRatio">
    <!-- <video  ref="videoPlayer" class="vjs-matrix video-js " :poster=media.Media.data.attributes.previewUrl></video> -->
    <video controls :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay != true" class="media-animation" :poster=media.Media.data.attributes.previewUrl></video>
    <video autoplay playsinline controls loop controlsList="nodownload" :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay === true" class="media-animation"></video>
    <img :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.jpg' || media.Media.data.attributes.ext === '.png'" class="media-animation">
  </div>
  <div v-if="media.Leyenda !== null" class="legend">{{ media.Leyenda }}</div>
</template>

<style>
.legend {
  @apply
  pt-1
  text-gray-400;
}

.only-one {
  .col-span-full {
    .media-container {
      height: 100vh;
      .vjs-matrix.video-js {
        width: 100%;
        height: 100%;
      }
    }
  }
}


.vjs-matrix.video-js {
  color: white;
  height: 100%;
  @apply
  flex
  items-center
  justify-center;
  & > video {
    height: auto;
  }
  .vjs-tech {
    @apply
    relative;
  }
}

/* Change the border of the big play button. */
.vjs-matrix .vjs-big-play-button {
  border-color: white;
}

.vjs-matrix .vjs-control-bar {
  background-color: transparent;
}
/* Change the color of various "bars". */
.vjs-matrix .vjs-volume-level,
.vjs-matrix .vjs-play-progress,
.vjs-matrix .vjs-slider-bar {
  background: white;
}

</style>
