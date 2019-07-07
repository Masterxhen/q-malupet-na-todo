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
          <q-item clickable v-ripple v-for="list in lists" :key="list.id">
            <q-item-section>{{list.id}}:{{list.text}}</q-item-section>
            <q-item-section avatar>
              <q-btn color="green" round @click="editList(list.text, list.id)" icon="edit" />
            </q-item-section>
            <q-item-section avatar>
              <q-btn color="red" round @click="delList(list.id)" icon="delete" />
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
// import io from 'socket.io-client'
export default {
  name: 'PageIndex',
  data () {
    return {
      text: '',
      lists: [],
      index: null,
      edit: false
    }
  },
  mounted () {
    // this.socket.on('get_todos', (data) =>{
    //   this.lists = data
    // })
    this.$bind('lists', this.$db.collection('todos'))
  },
  methods: {
    addTodo() {
      // to add todo
      // this.lists.push(this.text)
      // this.text = ''
      // // after adding, goto lodi
      // this.$router.push('/lodi')
      // this.socket.emit('add_todo', this.text)
      if (this.text > 0) {
        this.$db.collection("todos").add({
          text: this.text
        }).then(() => {
          this.text = ''
        })
      } else {
        alert("di pwede number")
      }
      // custom id
      // this.$db.collection("todos").doc('User101').set({
      //   text: this.text
      // }).then(() => {
      //   this.text = ''
      // })

    },
    delList(index){
      // this.lists.splice(index, 1)
      // this.socket.emit('delete_todo', index)
      this.$db.collection("todos").doc(index).delete()
    },
    editList(data, index){
      this.edit = true
      this.text = data
      this.index = index
      // string concatination
      // this.$router.push('/lodi/' +(index + 1))
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
      // this.$set(this.lists, this.index, this.text)
      let data = {
        id: this.index,
        text: this.text
      }
      // this.socket.emit('update_todo', data)
      this.$db.collection("todos").doc(this.index).update({
        text: this.text
      }).then(() => {
        this.text = ''
      })
      this.clear()
    }
  }
}
</script>
