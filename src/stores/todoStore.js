import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref([])
  const currentFilter = ref('all')
  const filteredTodos = computed(() => {
    if (currentFilter.value === 'finish') return todos.value.filter(t => t.checked)
    if (currentFilter.value === 'unfinish') return todos.value.filter(t => !t.checked)
    return todos.value
  })
  const unfinishCount = computed(() => todos.value.filter(t => !t.checked).length)
  // 取得全部資料
  const getTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/todos`)
      todos.value = res.data.todos.map(item => ({
        id: item.id,
        content: item.content,
        checked: !!item.completed_at
      }))
    } catch (err) {
      return console.log(err)
    }
  }
  // 新增資料
  const addTodo = async (todo) => {
    if (!todo.trim()) return    
      await axios.post(`${import.meta.env.VITE_API}/todos`, {
        todo: {
          content: todo
        }
      })      
    await getTodos()
    return true
  }
  // 編輯資料
  const editTodo = async (todo) => {    
    await axios.put(`${import.meta.env.VITE_API}/todos/${todo.id}`, {
      todo: {
        content: todo.content
      }
    })      
    await getTodos()
    return true
  }
  // 刪除資料
  const delTodo = async (todo) => {    
    await axios.delete(`${import.meta.env.VITE_API}/todos/${todo.id}`)
    await getTodos()
    return true
  }
  // 更新資料狀態
  const toggleTodo = async (todoid) => {
    await axios.patch(`${import.meta.env.VITE_API}/todos/${todoid}/toggle`)
    await getTodos()
    return true
  }
  const clearCompleted = () => {
    const completed = todos.value.filter(item => item.checked)
    let count = 0
    completed.forEach(item => {
      axios.delete(`${import.meta.env.VITE_API}/todos/${item.id}`)
        .then(() => {
          count++
          if (count === completed.length) getTodos()
        })
    })
  }
  return {
    todos,
    currentFilter,
    filteredTodos,
    unfinishCount,
    getTodos,
    addTodo,
    editTodo,
    toggleTodo,
    delTodo,
    clearCompleted
  }
})