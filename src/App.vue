<template>
    <v-app>
        <v-content class="bg-color">
            <login class="fullHeight" :style="{display: 'block'}"/>
            <habits-list class="fullHeight" />
            <calendar class="fullHeight "/>
            <how-was-your-day class="fullHeight" />
            <habits-done class="fullHeight" />
        </v-content>
    </v-app>
</template>

<script>
  import Login from './components/Login';
  import HabitsList from './components/HabitsList';
  import Calendar from './components/Calendar';
  import HowWasYourDay from './components/HowWasYourDay';
  import HabitsDone from './components/HabitsDone';
  import HBStore from './store/habitTrackerStore';

  export default {
    name: 'App',
    components: {
      Login, HabitsList, Calendar, HowWasYourDay, HabitsDone
    },
    data() {
      return {
        showUserNameScreen: 'block',
        state: HBStore.state,
      }
    },
    mounted() {
      if (this.state.userName) this.showUserNameScreen = 'none';
      window.scrollTo(0,0);
    }
  }
</script>

<style>
    html {
        scroll-behavior: smooth;
        user-select: none;
    }

    button {
        overflow: hidden;
    }

    .bg-color {
        background-color: hsl(51, 100%, 59%);
    }
    .fullHeight {
        height: 100vh;
    }
</style>
