<template>
  <div class="todolist_page bg-primary p-3">
    <div class="d-flex flex-row">
      <div class="d-grid d-md-flex">
        <img src="../assets/img/logo.png" alt="logo" class="img-fluid">
        <LanguageSwitch class="ms-3 mt-3 mt-md-0"/>
      </div>      
      <div class="ms-auto">
        <span class="d-none d-md-inline">
           {{ t('todo.header', { name: nickname }) }}
        </span>
        <a href="#" class="btn ms-2" @click="handleLogout">{{ t('common.logout') }}</a>
      </div>
    </div>
    <div class="container todolist">
      <div class="card input flex-row justify-content-between">
        <input type="text" class="input_text" :placeholder="t('todo.placeholder')" v-model="input" @keydown.enter="add" />
        <a href="#" class="btn_add" @click.prevent="add">+</a>
      </div>
      <div class="card card_list">
        <ul class="tab">
          <li :class="{ active: todoStore.currentFilter === 'all' }" @click="todoStore.currentFilter = 'all'">{{ t('todo.tabs.all') }}</li>
          <li :class="{ active: todoStore.currentFilter === 'unfinish' }" @click="todoStore.currentFilter = 'unfinish'">
            {{ t('todo.tabs.unfinish') }}
          </li>
          <li :class="{ active: todoStore.currentFilter === 'finish' }" @click="todoStore.currentFilter = 'finish'">
            {{ t('todo.tabs.finish') }}
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
                <a href="#" class="delete" @click.prevent="remove(item)">🗑</a>
              </div>
            </li>
          </ul>
          <div class="list_footer">
            <p>
              {{ t('todo.left', { count: todoStore.unfinishCount }) }}
            </p>
            <a href="#" @click.prevent="clearDone">
              {{ t('todo.clearCompleted') }}
            </a>
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
import { useI18n } from 'vue-i18n'
import { showToast } from '@/methods/Toast'
import Swal from 'sweetalert2'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
const { t } = useI18n()
const router = useRouter()
const todoStore = useTodoStore()
const userStore = useUserStore()
const input = ref('')
const nickname = ref(localStorage.getItem('nickname') || '')

onMounted(() => {
  todoStore.getTodos()
})
const add = async() => {
  const text = input.value.trim()
  if (!text) return
  try {
    await todoStore.addTodo(input.value)
    showToast('success', t('toast.addSuccess'))
    input.value = ''
  } catch {
    showToast('error', t('toast.addFail'))
  }  
}
const editHandler = async (item) => {
  const { value: newContent } = await Swal.fire({
    title: t('todo.edit.title'),
    input: 'text',
    inputValue: item.content,
    showCancelButton: true,
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    inputAttributes: {
      style: 'width: 85%; box-sizing: border-box;'
    },
    inputValidator: (value) => {
      if (!value.trim()) {
        return t('todo.edit.errors.empty')
      }
      if (value.trim() === item.content.trim()) {
        return t('todo.edit.errors.noChange')
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
    showToast('success', t('toast.editSuccess'))
  }
}
const remove = async(item)=>{
  try{
    await todoStore.delTodo(item)
    showToast('success', t('toast.delSuccess'))
  }catch{
    showToast('error', t('toast.delFail'))
  }
}
const clearDone = () => {
  todoStore.clearCompleted()
  showToast('success', t('toast.clearSuccess'))
}
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
