<template >
  
  <v-card
      class="mx-auto"
      max-width="1000"
    >
    <v-toolbar color="cyan-lighten-1">
        <v-btn icon="mdi-menu" variant="text"></v-btn>
  
        <v-toolbar-title style="color: white; font-size: larger; font-weight: bolder;">TodoApp</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
      </v-toolbar>
   <form class="input-form" @submit.prevent="addTodo">
    <v-responsive
    class="mx-auto"
    max-width="1000"
  >
    <v-text-field
      label="Add tods"
      placeholder="Add tods"
      type="text"
      v-model="newtodo"
    ></v-text-field>
    <v-select
    
  v-model="category"
  :items="['Work', 'Personal']" 
  label="Select Category"
  placeholder="Select category"
></v-select>
    <div class="add-btn">
    <v-btn
        class="ma-2"
        color="primary"
        :disabled="!newtodo"
        @click="addTodo">
        Add
        <v-icon
          icon="mdi-checkbox-marked-circle"
          end
        ></v-icon>
      </v-btn>
   </div>
  </v-responsive>
</form>
<v-responsive
    class="mx-auto"
    max-width="1000"
  >
  <v-card-text>
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search Todos"
        variant="solo"
        hide-details
        single-line
        v-model="searchterm"
      ><v-icon icon="fa:fas fa-search"></v-icon></v-text-field>
    </v-card-text>
</v-responsive>
  
<div class='filter-section'>
   <v-checkbox
            color="success"
            label="Done"
            value="success"
            v-model="filterDone"
            hide-details
          ></v-checkbox>
 <v-checkbox
 v-model="filterNotDone"
            color="red"
            label="Not Done"
            value="red"
            hide-details
          ></v-checkbox>
 </div>
 <v-card class="mx-auto" max-width="1000" style="margin-top: 20px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;" >
  
 <v-card-item  v-for="todo in filteredTodos " style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;" >
  <div class="category-color":style="{ backgroundColor: todo.category === 'Work' ? '#DAD7F9' : '#FAD0FB' }">

      <v-card-title>
        {{ todo.category }}
      </v-card-title>
      {{ console.log('Todo:', todo) }}
      <v-card-subtitle>
        {{formatDate(todo.date)}}
      </v-card-subtitle>
    

    <v-card-text style="font-size: 20px; font-weight: bold;">
      <span :style="{ 'text-decoration': todo.done ? 'line-through' : 'none' }">
      {{ todo.content}}
    </span>
      <div class="action-btns">
        <v-btn
        class="ma-2"
          @click="toggleDone(todo.id)"
        

        :color="todo.done ? 'green' : 'blue-lighten-2'"
        icon="mdi-thumb-up"
        variant="text"
      ></v-btn>
      <v-btn
        class="ma-2"
        color="red"
        @click="deleteTodo(todo.id)"
      >
        Delete
        <v-icon
          icon="mdi-cancel"
          end
        ></v-icon>
      </v-btn>
   
  </div>
    </v-card-text>
  </div>
  </v-card-item>
</v-card>
   
  
  
  </v-card>
  </template>
  <script setup>
  
  import {ref,onMounted, computed} from 'vue'
  import { collection,addDoc,deleteDoc,doc,updateDoc, query, orderBy } from 'firebase/firestore'
  import {db} from '@/firebase'
  import {useStore} from "vuex"
  
  
  
  const store=useStore();
  const searchterm=ref('')
  const category = ref('');
  
  
  const todoscollection=collection(db, 'todos')
  const todoscollectionquery = query(todoscollection, orderBy('date', "desc"))
  
  
  
  const filterDone = ref(false);
  const filterNotDone = ref(false);
  
  
  const filteredTodos = computed(() => {

  return store.state.todos.filter(todo=>{
   const isserarchMatch=todo.content.toLowerCase().includes(searchterm.value.toLowerCase());
   const isdonematch=filterDone.value? todo.done:true;
   const isnotdonematch=filterNotDone.value?!todo.done:true;
   return isserarchMatch&&isdonematch&&isnotdonematch;
  
  })
   
  });
  onMounted(()=>{
   store.dispatch('fetchTodos');
  })
  const newtodo=ref('');
  const addTodo=()=>{
    console.log("Category:", category.value);
  addDoc(collection(db,'todos'), {
   content: newtodo.value,
   done: false,
   date:Date.now(),
   category:category.value
   
  });
  newtodo.value=''
  category.value = ''
  }
  const deleteTodo=(id)=>{
   deleteDoc(doc(db,'todos',id));
  
  }
  const toggleDone=(id)=>{
  const todo=store.state.todos.find(todo=>todo.id===id)
  updateDoc(doc(db,'todos',id),{
   done:!todo.done
  })
  
  }
  const formatDate = (timestamp) => {
   // Adjust formatting options for your locale and preferences
   const options = {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit',
   hour: 'numeric',
   minute: '2-digit',
   hour12: true // Change to hour24 if needed
   };
   const date = new Date(timestamp);
   return date.toLocaleDateString('en-US', options); // Adjust locale as needed
  };
  </script>
