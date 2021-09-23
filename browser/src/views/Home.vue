<template>
  <div class="home-page">
    <v-data-table
      class="trail-table"
      :items="trails"
      :headers="tableHeaders"
      :search="search"
      @click:row="clickRow"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search all fields"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.url="{ item }">
        <td>
          <a :href="item.url" target="_blank">{{ item.url }}</a>
          <v-icon small>mdi-open-in-new</v-icon>
        </td>
      </template>
      <template v-slot:item.thumbUrl="{ item }">
        <td>
          <v-img
            :src="item.thumbUrl"
            max-width="300"
          ></v-img>
        </td>
      </template>
    </v-data-table>

    <v-btn
      class="toggle-btn"
      fixed
      right
      rounded
      raised
      :color="toggleBtnColor"
      @click="toggleForm"
    >
      {{ showForm ? 'Cancel' : 'Add new trails' }}
    </v-btn>

    <div v-if="showForm === true">
      <v-btn
        class="sticky-submit"
        rounded
        fixed
        right
        raised
        color="success"
        @click="submitDrafts"
      >
        Save Trails
      </v-btn>
      <div v-for="(draft, index) in trailsToSave">
        <Form :draft="draft" :close-form="closeForm" :index="index" />
      </div>
      <v-btn @click="trailsToSave.push({})">Add another trail</v-btn>
    </div>

    <v-snackbar v-model="showSnackbar">
      Trails Saved!
    </v-snackbar>

  </div>
</template>

<script>
  import Form from '../components/Form.vue';

  export default {
    name: 'Home',
    components: {
      Form,
    },
    data: function() {
      return {
        trails: [],
        tableHeaders: [
          { value: 'thumbUrl' },
          { text: 'Name', value: 'name' },
          { text: 'URL', value: 'url' },
          { text: 'Length', value: 'length' },
          { text: 'Elevation Gain', value: 'elevationGain' },
          { text: 'Description', value: 'description' },
        ],
        search: '',
        showForm: false,
        showSnackbar: false,
        trailsToSave: [],
      };
    },
    methods: {
      clickRow: function(x) {
        console.log('row clicked', x)
      },
      toggleForm: function() {
        this.showForm = !this.showForm;
        // whenever we toggle, clear all stashed drafts
        this.trailsToSave = [];
        if (this.showForm) {
          // if we toggled on, add a new form to start
          this.trailsToSave.push({});
        }
      },
      closeForm: function(arrIndex) {
        this.trailsToSave.splice(arrIndex, 1);
        // if we close out the only open form, toggle the button text back to init
        if (this.trailsToSave.length === 0) this.showForm = false;
      },
      submitDrafts: async function() {
        try {
          const { data } = await this.$http.post('/api/trails', {trails: this.trailsToSave})
          this.trails.push(...data);
          this.showSnackbar = true;
        } catch (err) {
          console.error('Save failed', err);
        }
        this.toggleForm();
      },
    },
    computed: {
      toggleBtnColor: function() {
        return this.showForm ? 'normal' : 'primary';
      },
    },
    created: async function() {
      try {
        const { data } = await this.$http.get('/api/trails');
        this.trails = data;
      } catch (err) {
        console.error('Could not get trails', err);
      }
    },
  }
</script>

<style>
.home-page {
  margin: 5rem;
}

.trail-table {
  padding: 1rem;
}

.sticky-submit {
  margin-top: 1rem;
  position: fixed;
  bottom: 60px
}

.toggle-btn {
  position: fixed;
  bottom: 20px;
}
</style>