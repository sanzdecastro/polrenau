<script>
import { RouterLink, RouterView } from 'vue-router'
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
    ...mapState(useStore, ['loading', 'whiteHeader', 'visited', 'settings', 'data'])
  },
  async created() {
    const apiUrl = import.meta.env.VITE_STRAPI_URL;
    const authToken = import.meta.env.VITE_AUTH_TOKEN;
    this.fetchSettings(apiUrl, authToken);
    this.Lenis();
    this.storage();
    
  },
  methods: {
    ...mapActions(useStore, ['storage', 'fetchSettings', 'fetchCategory', 'fetchData']),

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

<template :class="loading ? 'loading' : ''">
  <header :class="{ white: whiteHeader, 'loadingHeader': loading, 'loaded': !loading }">
    <h1><RouterLink :to="{ name: 'home' }">Pol Renau Wehr</RouterLink></h1>
      <nav>
        <RouterLink v-for="item in settings.Menu" :to=item.MenuLink >{{ item.MenuText }}</RouterLink>
      </nav>
  </header>

  <Intro v-if="!visited"/>
  <Loading v-if="loading" :class="this.whiteHeader ? 'white' : ''"></Loading>
  <router-view :key="$route.params.title" v-slot="{ Component }" >
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

header {
  transition: all .6s ease-in-out;
  transition-delay: 0ms;
  opacity: 1;
  a {
    @apply
    block
    text-gray-400;
  }
}

header.loadingHeader {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


