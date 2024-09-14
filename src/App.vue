<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/fetchStore.js';
import Lenis from 'lenis'
import { gsap } from "gsap";
import Intro from './components/Intro.vue';
import Loading from './components/loading.vue';

export default {
  name: "App",
  components: {
    Intro,
    Loading
  },
  computed: {
    ...mapState(useStore, ['loading', 'whiteHeader', 'visited'])
  },
  created() {
    this.Lenis();
    this.storage();
  },
  methods: {
    ...mapActions(useStore, ['storage']),

    Lenis() {
      const lenis = new Lenis()

      lenis.on('scroll', (e) => {
        console.log(e)
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }
  }
}
</script>

<template :class="loading ? 'loading' : 'loaded'">
  <header :class="this.whiteHeader ? 'white' : ''">
    <h1><RouterLink :to="{ name: 'home' }">Pol Renau Wehr</RouterLink></h1>
      <nav>
        <RouterLink :to="{ name: 'home' }" :key="name">Projects</RouterLink>
        <RouterLink :to="{ name: 'services' }" :key="name">Services</RouterLink>
        <RouterLink :to="{ name: 'about' }" :key="name">About</RouterLink>
      </nav>
   
  </header>

  <Intro v-if="!visited"/>
  <Loading v-if="loading" :class="this.whiteHeader ? 'white' : ''"></Loading>
  <router-view :key="$route.params.title" v-slot="{ Component }">
    <!-- :key="$route.fullPath" -->
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <footer :class="loading ? 'loading' : ''">
    <a class="mail" href="mailto:info@polrenau.com">Mail</a>
    <a class="phone" href="phone:+34695554421">(+34) 695 55 44 21</a>
    <p>Pol Renau © 2024</p>
  </footer>

</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


