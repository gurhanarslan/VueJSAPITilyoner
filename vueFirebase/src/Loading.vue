<template>
  <h1>Loading</h1>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: 'Loading...',
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    load(promise) {
      this.loading = true;
      const loadingFalse = () => {
        this.loading = false;
      };
      promise.then(
        loadingFalse,
        loadingFalse,
      );
      return promise;
    },
  },
};
</script>

<style>

</style>