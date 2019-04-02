<template>
    <v-container fluid
                 id="screen-0"
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
                    Enter your name
                </div>
            </v-flex>
            <v-flex xs12 md4 pa-3 align-self-center>
                <v-text-field color="#000"
                              label="Your name"
                              v-model="userName"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 pa-3>
                <v-btn
                        flat
                        large
                        href="#screen-1"
                        :disabled="!userName"
                >
                    Next
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import HBStore from '../store/habitTrackerStore';

  export default {
    data: () => ({
      state: HBStore.state,
    }),
    computed: {
      userName: {
        get() {
          return this.state.userName;
        },
        set(newValue) {
          HBStore.updateName(newValue);
        }
      }
    },
  }
</script>