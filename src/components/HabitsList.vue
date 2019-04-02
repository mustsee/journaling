<template>
    <div class="screen-2-wrapper" id="screen-1">
        <div class="newHabit">
            <v-flex xs12 pt-5 pb-3>
                <div class="title">
                    Hello {{ userName }}, list the daily habits you want to follow
                </div>
            </v-flex>
            <v-flex xs12 md4 pa-2>
                <v-text-field color="#000" label="New habit" v-model="newHabit" :disabled="state.habits.length === 10"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 pa-2>
                <v-btn
                        @click="addHabit"
                        flat
                        medium
                        :disabled="!newHabit || state.habits.length === 10"
                >
                    Add habit
                </v-btn>
            </v-flex>
        </div>
        <div class="habitsListWrapper">
            <v-flex v-for="i in 10" xs6>
                <v-list style="background-color: inherit">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title class="text-xs-center">
                                {{ habitName(i) }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </div>
        <div class="calendarButton">
            <v-flex xs12 pa-2>
                <v-btn
                        large
                        flat
                        href="#screen-2"
                        :disabled="!state.habits.length"
                >
                    To calendar
                </v-btn>
            </v-flex>
        </div>
    </div>
</template>

<script>
  import HBStore from '../store/habitTrackerStore';

  export default {
    data() {
      return {
        newHabit: '',
        state: HBStore.state,
      }
    },
    computed: {
      userName() {
        if (this.state.userName) return this.state.userName;
        else return 'stranger';
      },
    },
    methods: {
      addHabit() {
        HBStore.addHabit(this.newHabit);
        this.newHabit = '';
      },
      habitName(i) {
        if (this.state.habits[i-1]) return `${i} - ${this.state.habits[i-1]}`;
        else return '';
      }
    },
  }
</script>

<style>
    .screen-2-wrapper {
        display: flex;
        flex-direction: column;
    }
    .newHabit {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        margin: 0 10px;
        flex: 2;
    }
    .newHabit .title {
        margin: 0 30px;
    }
    .habitsListWrapper {
        display: flex;
        flex-wrap: wrap;
        flex: 3;
    }
    .calendarButton {
        display: flex;
        text-align: center;
        align-items: center;
        flex: 1;
    }
</style>