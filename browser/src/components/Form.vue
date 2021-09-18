<template>
  <div class="trail-form">
    <v-icon class="float-right" @click="closeForm(index)">mdi-close</v-icon>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="draft.name"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="draft.url"
              label="URL"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="draft.thumbUrl"
              label="Thumbnail URL"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-img :src="draft.thumbUrl" max-width="250"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="draft.elevationGain"
              label="Elevation Gain"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="draft.length"
              label="Length"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="draft.description"
              label="Description"
              required
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    draft: Object,
    closeForm: Function,
    index:  Number,
  },
}
</script>

<style>
.trail-form {
  background-color: white;
  border: 1px;
  border-radius: 5px;
  margin-top: 2rem;
}
</style>