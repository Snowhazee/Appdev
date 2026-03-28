<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'logout'])

const tab = ref('profile')

const user = ref({
  name: 'Fahhh',
  email: 'fah@gmail.com'
})

const orders = ref([
  { id: 1, name: 'Shorekeeper', price: '499$', status: 'Delivered' },
  { id: 2, name: 'Yinlin', price: '399$', status: 'Pending' }
])

function logout() {
  emit('logout')
}
</script>

<template>
  <div class="account">

    <button @click="emit('close')">← Back</button>

    <h1>Account</h1>

    <div class="tabs">
      <button @click="tab='profile'">Profile</button>
      <button @click="tab='orders'">Orders</button>
    </div>

    <div v-if="tab==='profile'">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>

    <div v-if="tab==='orders'">
      <div v-for="o in orders" :key="o.id">
        <p>{{ o.name }} - {{ o.price }} ({{ o.status }})</p>
      </div>
    </div>

    <button @click="logout">Logout</button>

  </div>
</template>