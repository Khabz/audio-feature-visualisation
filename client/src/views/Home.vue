<template>
  <div class="home">
    <h1 class="text-center mt-3">Audio Feature Visualisation</h1>
    <section class="search_box mt-5 bg-primary">
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1 text-center">Search for a music track to get it's features...</h5>
        </div>
        <div class="input-group mb-3 mt-3">
          <input v-model.lazy="searchQuery" type="text" class="form-control" />
        </div>
      </div>
    </section>
    <div v-if="searchResults.length > 0" class="container mt-5">
      <div class="row">
        <div
          v-for="(track, index) in searchResults"
          :key="index"
          class="col-md-4"
          @click="audioFeature(track)"
        >
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ track.primary_artist }}</h5>
              <h6 class="card-subtitle text-muted">{{ track.name }}</h6>
            </div>
            <img
              class="text-center"
              style="height: 200px; width: 100%; display: block;"
              :src="track.image"
              alt="Card image"
            />
          </div>
        </div>
      </div>
    </div>
    <Chart :features="features" :selectedTrack="selectedTrack"  />
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '../components/Chart'
export default {
  name: "Home",
  components: {
    Chart
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      features: {
        danceability:null,
        energy: null,
        speechiness: null,
        acousticness: null,
        instrumentalness: null,
        liveness: null,
        valence: null
      },
      selectedTrack: null
    };
  },
  watch: {
    searchQuery: function(value) {
      console.log(value);
      this.searchResults = [];
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
      this.selectedTrack = track
      fetch(`http://localhost:5000/features?id=${track.id}`).then(res => {
        res.json().then(data => {
          console.log(data)
          this.features.danceability = data.danceability
          this.features.energy = data.energy
          this.features.speechiness = data.speechiness
          this.features.acousticness = data.acousticness
          this.features.instrumentalness = data.instrumentalness
          this.features.liveness = data.liveness
          this.features.valence = data.valence
          console.log("I want to open a modal, But this fucker is refusing")
          window.$("#staticBackdrop").modal("show")
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
