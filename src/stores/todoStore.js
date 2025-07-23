import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { showToast } from '@/methods/Toast'

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
  const getTodos = () => {
    return axios.get(`${import.meta.env.VITE_API}/todos`)
      .then(res => {
        todos.value = res.data.todos.map(item => ({
          id: item.id,
          content: item.content,
          checked: !!item.completed_at
        }))
      })
      .catch(err => console.log(err))
  }
  // 新增資料
  const addTodo = (todo) => {
    if (!todo.trim()) return
    axios.post(`${import.meta.env.VITE_API}/todos`, {
      todo: {
        content: todo
      }
    })
      .then(res => {
        showToast('success', '新增資料成功')
        getTodos()
      })
      .catch(err => console.log(err))
  }
  // 編輯資料
  const editTodo = (todo) => {
    return axios.put(`${import.meta.env.VITE_API}/todos/${todo.id}`, {
      todo: {
        content: todo.content
      }
    })
      .then(res => {
        showToast('success', '編輯資料成功')
        getTodos()
      })
      .catch(err => console.log(err))
  }
  // 刪除資料
  const delTodo = (todo) => {
    return axios.delete(`${import.meta.env.VITE_API}/todos/${todo.id}`)
      .then(res => {
        showToast('success', '刪除資料成功')
        getTodos()
      })
      .catch(err => console.log(err))
  }
  // 更新資料狀態
  const toggleTodo = (todoid) => {
    return axios.patch(`${import.meta.env.VITE_API}/todos/${todoid}/toggle`)
      .then(res => {
        getTodos()
      })
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
    showToast('success', '已刪除所有完成項目')
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