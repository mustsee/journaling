<template>
    <v-container fluid
                 id="screen-3"
    >
        <v-layout row
                  wrap
                  fill-height
                  align-content-center
                  justify-center
                  class="text-xs-center"
        >
            <v-flex xs12 pa-4>
                <div class="headline">
                    How was your day ?
                </div>
            </v-flex>
            <v-flex xs12 pa-3>
                <v-btn
                        @click="validate(false)"
                        large
                        href="#screen-4"
                        :disabled="state.readOnly || !state.dayClicked"
                >
                    Bad
                </v-btn>
                <v-btn
                        @click="validate(true)"
                        large
                        href="#screen-4"
                        :disabled="state.readOnly || !state.dayClicked"
                >
                    Good
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import HBStore from './../store/habitTrackerStore';

  export default {
    data() {
      return {
        state: HBStore.state,
      }
    },
    methods: {
      validate(wasAGoodDay) {
        HBStore.saveHadAGoodDay(wasAGoodDay);
      }
    }
  }
</script>
