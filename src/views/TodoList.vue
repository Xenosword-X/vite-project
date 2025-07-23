<template>
  <div class="todolist_page bg-primary p-3">
    <div class="d-flex flex-row">
      <img src="../assets/img/logo.png" alt="logo" class="img-fluid">
      <div class="ms-auto">
        <span class="d-none d-md-inline">{{ nickname }} 的代辦</span>
        <a href="#" class="btn ms-2" @click="handleLogout">登出</a>
      </div>
    </div>
    <div class="container todolist">
      <div class="card input flex-row justify-content-between">
        <input type="text" class="input_text" placeholder="新增待辦事項" v-model="input" @keydown.enter="add" />
        <a href="#" class="btn_add" @click.prevent="add">+</a>
      </div>
      <div class="card card_list">
        <ul class="tab">
          <li :class="{ active: todoStore.currentFilter === 'all' }" @click="todoStore.currentFilter = 'all'">全部</li>
          <li :class="{ active: todoStore.currentFilter === 'unfinish' }" @click="todoStore.currentFilter = 'unfinish'">
            待完成
          </li>
          <li :class="{ active: todoStore.currentFilter === 'finish' }" @click="todoStore.currentFilter = 'finish'">
            已完成
          </li>
        </ul>
        <div class="cart_content">
          <ul class="list">
            <li v-for="item in todoStore.filteredTodos" :key="item.id">
              <label class="checkbox">
                <input type="checkbox" class="checkedMark" v-model="item.checked"
                  @change="todoStore.toggleTodo(item.id)" />
                <span>{{ item.content }}</span>
              </label>
              <div class="actions">
                <a href="#" class="edit" @click.prevent="editHandler(item)">✎</a>
                <a href="#" class="delete" @click.prevent="todoStore.delTodo(item)">🗑</a>
              </div>
            </li>
          </ul>
          <div class="list_footer">
            <p>{{ todoStore.unfinishCount }} 個待完成項目</p>
            <a href="#" @click.prevent="todoStore.clearCompleted">清除已完成項目</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useUserStore } from '@/stores/UserStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()
const todoStore = useTodoStore()
const userStore = useUserStore()
const input = ref('')
const nickname = ref(localStorage.getItem('nickname') || '')

onMounted(() => {
  todoStore.getTodos()
})
const add = () => {
  todoStore.addTodo(input.value)
  input.value = ''
}
const editHandler = async (item) => {
  const { value: newContent } = await Swal.fire({
    title: '請輸入新的代辦內容',
    input: 'text',
    inputValue: item.content,
    showCancelButton: true,
    confirmButtonText: '確定修改',
    cancelButtonText: '取消',
    inputValidator: (value) => {
      if (!value.trim()) {
        return '內容不得為空值'
      }
      if (value.trim() === item.content.trim()) {
        return '內容未修改'
      }
      return null
    }
  })
  if (newContent && newContent.trim() !== item.content.trim()) {
    const newItem = {
      ...item,
      content: newContent.trim()
    }
    todoStore.editTodo(newItem)
  }
}
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
