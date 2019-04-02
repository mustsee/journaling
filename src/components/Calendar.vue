<template>
    <v-container id="screen-2" fill-height>
            <full-calendar
                    :events="state.events"
                    :config="config"
                    @day-click="handleDayClick"
                    class="mouseOver"
            />
    </v-container>
</template>

<script>
  import moment from 'moment';
  import HBStore from './../store/habitTrackerStore';

  export default {
    data: () => ({
      state: HBStore.state,
      config: {
        defaultView: "month",
        header: {
          center: "",
          right: "title"
        },
        height: 600,
      },
    }),
    methods: {
      handleDayClick(date) {
        if (!this.state.habits.length) return;
        const currentDate = moment().format("YYYY-MM-DD");
        const clickDateFormatted = date.format();
        const clickDate = moment(date, "YYYY-MM-DD");

        if (clickDateFormatted > currentDate) {
          // Future
          HBStore.resetDayClickedOn();
          HBStore.setReadOnlyMode();
        } else if (clickDate.add(7, "days").format() < currentDate) {
          // Before one week - readable
          HBStore.dayClickedOn(clickDateFormatted);
          HBStore.setReadOnlyMode();
          location.href = '#screen-4';
        } else {
          // Today until one week - editable
          HBStore.dayClickedOn(clickDateFormatted);
          HBStore.removeReadOnlyMode();
          HBStore.saveDailyHabits();
          location.href = '#screen-3';
        }
      }
    },
    mounted() {
    }
  };
</script>

<style>
    .mouseOver:hover {
        cursor: pointer;
    }
    table th, td {
        border-color: #000 !important;
    }
</style>
