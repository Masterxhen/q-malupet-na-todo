<template>
  <q-page style="padding: 50px">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); width: 400px; height:900px;"
    >
    <q-parallax
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        :height="600"
      />

      <q-card-section>
        <q-input dark v-model="text" label="Text" />
      </q-card-section>

      <q-card-section>
        <!-- 1st way vue conditionals -->
        <!-- <q-btn v-if="!edit" icon="note_add" class="full-width" label="Add todo" v-on:click="addTodo" stack glossy color="primary" />
        <q-btn v-else icon="note_add" class="full-width" label="Update todo" v-on:click="updateList" stack glossy color="green" /> -->
        <!-- 2nd way vue conditionals -->
        <q-btn icon="note_add" class="full-width" :label="!edit ? 'Add Todo' : 'Update Todo' " @click="!edit ? addTodo() : updateList() " stack glossy :color="!edit ? 'primary' : 'green' " />
        <q-btn v-if="edit" icon="note_add" class="full-width" label="Clear" v-on:click="clear" stack glossy color="primary" />
      </q-card-section>
    </q-card>

    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); width: 400px; height:300px;"
    >
      <q-card-section>
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="(list, index) in lists" :key="index">
            <q-item-section>{{ index + 1 }} : {{list}}</q-item-section>
            <q-item-section avatar>
              <q-btn color="green" round @click="editList(list, index)" icon="edit" />
            </q-item-section>
            <q-item-section avatar>
              <q-btn color="red" round @click="delList(index)" icon="delete" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
// 1st way using vue:
// import Vue from 'vue'

export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      lists: ['hi', 'hello'],
      index: null,
      edit: false
    }
  },
  methods: {
    addTodo() {
      // to add todo
      this.lists.push(this.text)
      this.text = ''
      // after adding, goto lodi
      this.$router.push('/lodi')
    },
    delList(index){
      this.lists.splice(index, 1)
    },
    editList(data, index){
      this.edit = true
      this.text = data
      this.index = index
      // string concatination
      this.$router.push('/lodi/' +(index + 1))
      // string caret
      // this.$router.push(`/lodi/${index}`)
    },
    clear() {
      this.edit = false
      this.text = ''
    },
    updateList(){
      // this.lists[index] = data (incorrect)
      // Vue.set(this.lists, this.index, this.text)
      this.$set(this.lists, this.index, this.text)
      this.clear()
    }
  }
}
</script>
