<template>
  <div>
    <h2>Filter by date-time</h2>
    <date-picker :dateInput="dateInput" @date-applied="selectedDate" />
  </div>
</template>

<script>
import DatePicker from "vue-time-date-range-picker/dist/vdprDatePicker";

const addDaysToDate = (date, days) => {
  var temp = new Date(date);
  temp.setDate(temp.getDate() + days);
  return temp;
};

export default {
  components: {
    DatePicker,
  },
  props: ["selectedDateTime"],
  data() {
    const now = new Date();
    return {
      dateInput: {
        placeholder: "Select Date",
      },
    };
  },
  methods: {
    selectedDate(startDate, endDate) {
      const startEndDateTime = { startDate, endDate };
      this.$emit("setSelectedDateTimeToTodo", startEndDateTime);
    },
  },
};
</script>
