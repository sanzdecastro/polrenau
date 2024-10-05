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
    // Función para hacer el lazy loading del video
    const lazyLoadVideos = () => {
      const lazyVideos = document.querySelectorAll("video.lazy-video");

      if ("IntersectionObserver" in window) {
        let lazyVideoObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const video = entry.target;
              const source = document.createElement("source");
              source.src = video.dataset.src; // Usamos el data-src para cargar el video
              video.appendChild(source);
              video.load(); // Cargar el video
              lazyVideoObserver.unobserve(video); // Dejar de observar una vez cargado
            }
          });
        });

        lazyVideos.forEach((lazyVideo) => {
          lazyVideoObserver.observe(lazyVideo); // Iniciar la observación de cada video
        });
      }
    };

    lazyLoadVideos();
  },
  computed: {
        ...mapState(useStore, ['loading'])
  },
  methods: {
    animateVideos() {
          var tl = gsap.timeline({})

          gsap.set('.media-container', {
            autoAlpha: 1,
          })

          gsap.set('.media-animation', {
            filter: "blur(15px)",
            scale: 1.4,
          })

          tl.to('.media-container', {
            autoAlpha: 1,
            duration: .8,
          }).to('.media-animation', {
            filter: "blur(0px)",
            scale: 1.1,
          });
        }
  },
  watch: {
      loading(value) {
        if (!value) {
          // La variable cambió a false
            this.animateVideos();
        }
      }
  }
}
</script>

<template>
  <div class="media-container pointer-events-none" :class="thumbnail.AspectRatio ? thumbnail.AspectRatio : aspectRatio">
    <video :poster="'https://res.cloudinary.com/dtsjetrtt/video/upload/q_auto/' + thumbnail.Media.data.attributes.hash + '.jpg'" class="media-animation lazy-video" loop muted autoplay playsinline  v-if="thumbnail.Media.data.attributes.ext === '.mp4'" >
      <!-- 1080p sources -->
      <source :src="'https://res.cloudinary.com/dtsjetrtt/video/upload/so_2/w_1080/' + thumbnail.Media.data.attributes.hash + '.webm'" type="video/webm" media="(min-width: 1080px)">
      <source :src="'https://res.cloudinary.com/dtsjetrtt/video/upload/so_2/w_1080/' + thumbnail.Media.data.attributes.hash + '.mp4'" type="video/mp4" media="(min-width: 1080px)">
      <!-- 720p sources -->
      <source :src="'https://res.cloudinary.com/dtsjetrtt/video/upload/so_2/w_720/' + thumbnail.Media.data.attributes.hash + '.webm'" type="video/webm" media="(min-width: 720px)">
      <source :src="'https://res.cloudinary.com/dtsjetrtt/video/upload/so_2/w_720/' + thumbnail.Media.data.attributes.hash + '.mp4'" type="video/mp4" media="(min-width: 720px)">
      <!-- 480p sources -->
      <source :src="'https://res.cloudinary.com/dtsjetrtt/video/upload/so_2/w_480/' + thumbnail.Media.data.attributes.hash + '.webm'" type="video/webm" media="(max-width: 480px)">
      <source :src="'https://res.cloudinary.com/dtsjetrtt/video/upload/so_2/w_480/' + thumbnail.Media.data.attributes.hash + '.mp4'" type="video/mp4" media="(max-width: 480px)">
    </video>
    <img loading="lazy" class="media-animation" :src="thumbnail.Media.data.attributes.url" v-if="thumbnail.Media.data.attributes.ext === '.jpg' || thumbnail.Media.data.attributes.ext === '.png'" >
  </div>
</template>

<style>

</style>
