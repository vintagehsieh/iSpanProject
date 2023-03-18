<template>
  <div id="app">
    <v-calendar
      :attributes="attributes"
      :themes="themes"
      :popover="{ visibility: 'hover' }"
      is-dark
    ></v-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attributes: [
        {
          key: 'today',
          highlight: true,
          dates: new Date(),
          dot: {
            backgroundColor: 'red',
          },
          popover: {
            label: '今天的活動',
            content: '這是今天的活動內容',
          },
        },
      ],
      themes: [
        {
          id: 'notion-like',
          textColor: '#FFFFFF',
          backgroundColor: '#202124',
          borderColor: '#5B5B62',
          headerColor: '#4B4B4F',
          weekdaysColor: '#87878D',
          weeksColor: '#4B4B4F',
          arrowColor: '#87878D',
          todayColor: '#3887FF',
          highlightColor: '#3A3A3C',
          hoveredColor: '#3A3A3C',
          selectedColor: '#4B4B4F',
          navVisibility: 'hidden',
        },
      ],
    };
  },
};
</script>

<style scoped>
body {
  background-color: #202124;
}
</style>