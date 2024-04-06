import { createStore } from "vuex";
import {ref,onMounted, computed} from 'vue'
import { collection, onSnapshot,addDoc,deleteDoc,doc,updateDoc, query, orderBy, limit } from 'firebase/firestore'
import {db} from '@/firebase'
export default createStore({
 state:{
    todos:[],
  },
  mutations:{
    SET_TODOS(state,todos){
state.todos=todos
 }
 },
  actions:{
    fetchTodos({commit})
    {
      const todoscollection=collection(db, 'todos')
     const todoscollectionquery = query(todoscollection, orderBy('date', "desc"));
      const unsuscribe= onSnapshot(todoscollectionquery, (querySnapshot) => {
        const todos = []
    querySnapshot.forEach((doc) => {
 const todo={
 id:doc.id,
content:doc.data().content,
 done:doc.data().done,
 date:doc.data().date,
 category:doc.data().category
 }
 todos.push(todo)
 });
 commit('SET_TODOS',todos)


 });
 },
 addTodo({commit},{newTodo,category})
 {
 addDoc(collection(db,'todos'),{
content:newTodo,
done:false,
 date:Date.now(),
 category:category
 })
 },
 deleteTodo({commit},id){
 deleteDoc(doc(collection(db,'todos'),id))
 },
 toggleDone({commit},id){
 const todo=store.state.todos.find(todo=>todo.id===id)
 if(todo){
 updateDoc(doc(collection(db,'todos'),id),{
done:!todo.done
 })
 }
 }

 }
})