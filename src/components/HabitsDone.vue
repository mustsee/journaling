<template>
  <div class="screen-4-wrapper" id="screen-4">
    <div class="dailyQuestion">
      <v-flex xs12 pt-5 pb-3>
        <div class="title">
          Hey {{ userName }}, don't shy away. <br>
          <div style="margin-top: 5px">What did you today ?</div>
        </div>
      </v-flex>
    </div>
    <div class="pickHabitDoneWrapper">
      <div class="leftPart">
        <v-flex v-for="i in 10" xs12>
          <v-btn
                  small
                  v-show="habitName(i)"
                  @click="addDoneHabit(i)"
                  :disabled="state.readOnly"
          >
            <span class="buttonClass">{{ habitName(i) }}</span>
          </v-btn>
        </v-flex>
      </div>
      <div class="rightPart">
        <v-flex v-for="i in 10" xs12>
            <v-btn
                    small
                    v-show="doneHabitName(i)"
                    @click="removeDoneHabit(i)"
            >
              <span class="buttonClass">{{ doneHabitName(i) }}</span>
            </v-btn>
        </v-flex>
      </div>
    </div>
    <div class="doneDailyHabitButton">
      <v-flex xs12 pa-2>
        <v-btn v-if="!state.readOnly"
                large
                flat
                @click="resetInformations()"
                href="#screen-2"
        >
          Done day
        </v-btn>
        <v-btn v-else
               large
               flat
               href="#screen-2"
        >
          Back to calendar
        </v-btn>
      </v-flex>
    </div>
  </div>
</template>

<script>
  import HBStore from './../store/habitTrackerStore';
  import delay from 'nanodelay';

  export default {
    data() {
      return {
        newHabit: '',
        state: HBStore.state,
      }
    },
    computed: {
      userName() {
        const {userName} = this.state;
        return userName ? userName : 'Stranger';
      },
    },
    methods: {
      addDoneHabit(i) {
        const doneHabit = this.state.habits[i-1];
        HBStore.addDoneHabit(doneHabit);
      },
      removeDoneHabit(i) {
        let day = this.state.dayClicked;
        let event = this.state.events.filter((event) => event.start === day);
        const undoHabit = event[0].doneHabits[i-1];
        HBStore.removeDoneHabit(undoHabit);
      },
      habitName(i) {
        const habit = this.state.habits[i-1];
        let day = this.state.dayClicked;
        let event = this.state.events.filter((event) => event.start === day);
        if (event[0] && event[0].doneHabits.includes(habit)) return false;
        else if (this.state.habits[i-1]) return this.state.habits[i-1].toUpperCase();
        else return false;
      },
      doneHabitName(i) {
        let day = this.state.dayClicked;
        let event = this.state.events.filter((event) => event.start === day);
        if (event[0] && event[0].doneHabits[i-1]) {
          return event[0].doneHabits[i-1].toUpperCase();
        }
      },
      resetInformations() {
        // Pourquoi je ne peux pas changer les states des 3 d'un coup.
        delay(1000).then(() => {
          HBStore.resetDayClickedOn();
          HBStore.setReadOnlyMode();
        });
      }
    }
  }
</script>

<style>
  .screen-4-wrapper {
    display: flex;
    flex-direction: column;
  }
  .dailyQuestion {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    margin: 0 10px;
    flex: 1;
  }
  .pickHabitDoneWrapper {
    display: flex;
    flex-wrap: wrap;
    flex: 4;
  }
  .pickHabitDoneWrapper .leftPart {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .pickHabitDoneWrapper .rightPart {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .doneDailyHabitButton {
    display: flex;
    text-align: center;
    align-items: center;
    flex: 0.6;
  }
  button {
    max-width: 40vw !important;
  }
  .buttonClass {
    max-width: 35vw;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
  }
</style>