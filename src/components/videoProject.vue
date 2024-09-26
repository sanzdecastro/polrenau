<script>
import { gsap } from "gsap";
import videojs from 'video.js';

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
    
    this.$nextTick(() => {
      setTimeout(() => {
        this.animateVideos();
      }, 300);
      this.player = videojs(this.$refs.videoPlayer, {
        controls: true,
        autoplay: this.media.autoplay,
        preload: 'none',
        loop: true,
        sources: [{
          src: this.media.Media.data.attributes.url,
          type: 'video/mp4'
        }]
      });
      this.player.on('click', () => {
        this.togglePlay();
      });
      //  // Evento touchstart para dispositivos móviles
      // this.player.on('touchstart', () => {
      //   this.togglePlay();
      // });

      // // Evento touchend para dispositivos móviles
      // this.player.on('touchend', () => {
      //   this.togglePlay();
      // });
  })
    
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
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
        playVideo() {
      if (this.player) {
        this.player.play();
      }
    },

    
  },

}
</script>

<template>
  
  <div class="media-container" :class="media.AspectRatio">
    <video v-if="media.Poster.data !== null && media.Media.data.attributes.ext === '.mp4'" ref="videoPlayer" class="vjs-matrix video-js media-animation" :poster=media.Poster.data.attributes.url playsinline></video>
    <video v-if="media.Poster.data === null && media.Media.data.attributes.ext === '.mp4'" ref="videoPlayer" class="vjs-matrix video-js media-animation"></video>
    <!-- <video ref="videoPlayer" controls :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay != true && media.Poster.data === null" class="media-animation"></video>
    <video ref="videoPlayer" controls :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay != true && media.Poster.data != null" class="media-animation" :poster="media.Poster.data.attributes.url"></video>
    <video ref="videoPlayer" autoplay playsinline controls loop controlsList="nodownload" :src="media.Media.data.attributes.url" v-if="media.Media.data.attributes.ext === '.mp4' && media.autoplay === true" class="media-animation"></video> -->
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
      height: 100%;
      .vjs-matrix.video-js {
        width: 100%;
        height: 100%;
      }
    }
  }
}


.vjs-matrix.video-js {
  color: white;
  width: 100%;
  height: 100%;
  @apply
  flex
  items-center
  justify-center;
  & > video {
    @apply
    object-cover;
    @media screen and (max-width: 768px) {
      object-fit: contain;
    }
  }
  .vjs-tech {
    @apply
    relative;
  }
}

.vjs-poster {
  @apply
  flex
  justify-center
  items-center;
  img {
    @apply
    h-full
    w-full
    object-cover;
  }
}

/* Change the border of the big play button. */
.vjs-matrix.vjs-paused .vjs-big-play-button {
  border: none;
  @apply
  top-0
  left-0
  flex
  items-center
  justify-center
  w-full
  h-full
  border-none
  bg-transparent;
  &:hover {
    @apply
    bg-transparent;
  }
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

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  @apply
  relative;
}

</style>
