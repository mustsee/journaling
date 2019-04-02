class HabitTrackerStore {
  constructor() {

    this.state = {
      userName: '',
      habits: [],
      doneHabits: [],
      dayClicked: '',
      events: [],
      readOnly: true,
    };

    if (localStorage.getItem('HBStore')) {
      this.state = {
        ...this.state,
        ...JSON.parse(localStorage.getItem('HBStore')),
      };
    }
  }

  saveDailyHabits() {
    let isDateAlreadyInLocalStorage = false;
    this.state.events.map((event) => {
      if (event.start === this.state.dayClicked) {
        event.habits = this.state.habits;
        isDateAlreadyInLocalStorage = true;
      }
    });
    if(!isDateAlreadyInLocalStorage) {
      let event = {
        start: this.state.dayClicked,
        allDay: true,
        rendering: "background",
        color: "inherit",
        doneHabits: this.state.doneHabits,
        habits: this.state.habits
      };
      this.state.events = [
        ...this.state.events,
        event,
      ];
    }
    this.storeInLocalStore();
  }

  addDoneHabit(doneHabit) {
    this.state.events.map((event) => {
      if (event.start === this.state.dayClicked) {
        event.doneHabits = [
          ...event.doneHabits,
          doneHabit,
        ]
      }
    });
    this.storeInLocalStore();
  }

  removeDoneHabit(undoHabit) {
    this.state.events.map((event) => {
      if (event.start === this.state.dayClicked) {
        event.doneHabits = event.doneHabits.filter((doneHabit) => {
          return doneHabit !== undoHabit;
        });
      }
    });
    this.storeInLocalStore();
  }

  saveHadAGoodDay(wasAGoodDay) {
    let isDateAlreadyInLocalStorage = false;
    this.state.events.map((event) => {
      if (event.start === this.state.dayClicked) {
        event.color = wasAGoodDay ? '#0FF' : "#f11";
        isDateAlreadyInLocalStorage = true;
      }
    });
    if(!isDateAlreadyInLocalStorage) {
      let event = {
        start: this.state.dayClicked,
        allDay: true,
        rendering: "background",
        color: wasAGoodDay ? '#0FF' : "#f11",
        doneHabits: [],
        habits: [],
      };
      this.state.events = [
        ...this.state.events,
        event,
      ];
    }
    this.storeInLocalStore();
  }

  setReadOnlyMode() {
    this.state.readOnly = true;
    this.storeInLocalStore();
  }

  removeReadOnlyMode() {
    this.state.readOnly = false;
    this.storeInLocalStore();
  }

  resetDayClickedOn() {
    this.state.dayClicked = '';
    this.storeInLocalStore();
  }

  dayClickedOn(date) {
    this.state.dayClicked = date;
    this.storeInLocalStore();
  }

  addHabit(newHabit) {
    this.state.habits = [
      ...this.state.habits,
      newHabit
    ];
    this.storeInLocalStore();
  }

  updateName(name) {
    this.state.userName = name;
    this.storeInLocalStore();
  }

  storeInLocalStore() {
    localStorage.setItem('HBStore', JSON.stringify(this.state));
  }
}

let HBStore = new HabitTrackerStore();

export default HBStore;