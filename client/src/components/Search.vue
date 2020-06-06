<template>
  <div class="search">
    <h1 class="text-center">Audio Feature Visualisation</h1>
    <section class="search_box mt-5">
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Search for a music track to get it's features...</h5>
        </div>
        <form @submit.prevent="searchTrack()" class="input-group mb-3 mt-3">
          <input v-model="searchQuery" type="text" class="form-control" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">Search</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      searchQuery: "",
      results: []
    };
  },
  methods: {
    searchTrack: function() {
      let searchQuery = this.searchQuery;
      axios
        .get(`http://localhost:5000/search/?term=${searchQuery}`)
        .then(res => {
          res.data.tracks.items.map(track => {
            const data = {
              id: track.id,
              name: track.name,
              primary_artist: track.artists[0].name,
              image: track.album.images[2].url
            };
            this.results.push(data)
          });
        });
    }
  }
};
</script>

<style scoped>
.search_box {
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
}
</style>