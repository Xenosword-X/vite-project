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
    try {
      await axios.post(`${import.meta.env.VITE_API}/todos`, {
        todo: {
          content: todo
        }
      })
      showToast('success', '新增資料成功')
      getTodos()
    } catch (err) {
      console.error(err)
      showToast('error', '新增失敗，請稍後再試')
    }
  }
  // 編輯資料
  const editTodo = async (todo) => {
    try {
      await axios.put(`${import.meta.env.VITE_API}/todos/${todo.id}`, {
        todo: {
          content: todo.content
        }
      })
      showToast('success', '編輯資料成功')
      getTodos()
    } catch (err) {
      return console.log(err)
    }
  }
  // 刪除資料
  const delTodo = async (todo) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API}/todos/${todo.id}`)
      showToast('success', '刪除資料成功')
      getTodos()
    } catch (err) {
      return console.log(err)
    }
  }
  // 更新資料狀態
  const toggleTodo = async (todoid) => {
    const res = await axios.patch(`${import.meta.env.VITE_API}/todos/${todoid}/toggle`)
    getTodos()
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