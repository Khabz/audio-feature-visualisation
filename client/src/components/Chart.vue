<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ selectedTrack.primary_artist }} - {{ selectedTrack.name }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <column-chart
            :data="[['danceability', features.danceability], ['energy', features.energy], 
            ['speechiness', features.speechiness], ['acousticness', features.acousticness],
            ['instrumentalness', features.instrumentalness], ['liveness', features.liveness],
            ['valence', features.valence]]"
            :colors="[['#6BD62C', '#FFDA35', '#FF5B32', '#D21FC3', '#1BD176', '#D2B21F', '#5DEA77']]"
          ></column-chart>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["features", "selectedTrack"],
  name: "Chart",
  components: {}
};
</script>