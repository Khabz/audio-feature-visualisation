<template>
  <div class="home">
    <h1 class="text-center mt-3">Audio Feature Visualisation</h1>
    <section class="search_box mt-5">
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Search for a music track to get it's features...</h5>
        </div>
        <div class="input-group mb-3 mt-3">
          <input v-model.lazy="searchQuery" type="text" class="form-control" />
        </div>
      </div>
    </section>
    <div v-if="searchResults.length > 0" class="container mt-5">
      <div class="row">
        <div v-for="(track, index) in searchResults" :key="index" class="col-md-4" @click="audioFeature(track)">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ track.primary_artist }}</h5>
              <h6 class="card-subtitle text-muted">{{ track.name }}</h6>
            </div>
            <img
              style="height: 200px; width: 100%; display: block;"
              :src="track.image"
              alt="Card image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      searchQuery: "",
      searchResults: []
    };
  },
  watch: {
    searchQuery: function(value) {
      console.log(value);
      this.searchResults = []
      fetch(`http://localhost:5000/search?term=${value}`).then(res => {
        res.json().then(data => {
          data.tracks.items.map(track => {
            const data = {
              id: track.id,
              name: track.name,
              primary_artist: track.artists[0].name,
              image: track.album.images[2].url
            };
            this.searchResults.push(data);
          });
        });
      });
    }
  },
  methods: {
    audioFeature: function(track) {
      fetch(`http://localhost:5000/features?id=${track.id}`).then(res => {
            res.json().then(data => {
                console.log(data)
            });
        })
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
