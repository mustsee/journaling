<template>
    <v-app>
        <v-content class="bg-color">
            <login :style="{display: 'block', height: screenHeight}" />
            <habits-list :style="{height: screenHeight}" />
            <calendar :style="{height: screenHeight}" />
            <how-was-your-day :style="{height: screenHeight}" />
            <habits-done :style="{height: screenHeight}" />
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
        screenHeight: '',
      }
    },
    mounted() {
      if (this.state.userName) this.showUserNameScreen = 'none';
      window.scrollTo(0,0);
      this.screenHeight = window.innerHeight + 'px';
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
</style>
