<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close', 'logout'])
const currentTab = ref('profile')
const loading = ref(true)

const user = ref({ name: '', email: '', role: 'User' })
const orders = ref([])

onMounted(async () => {
  await fetchData()
})

async function fetchData() {
  const token = localStorage.getItem('token')
  if (!token) return emit('logout')
  loading.value = true
  try {
    const pRes = await axios.get('http://localhost:3000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = pRes.data
    const oRes = await axios.get('http://localhost:3000/api/orders/myorders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    orders.value = oRes.data
    if (orders.value.length > 0) currentTab.value = 'orders'
  } catch (err) {
    console.error("Fetch Error:", err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="acc-wrapper">
    <header class="acc-header-banner">
      <button class="btn-back" @click="emit('close')">← Back to Store</button>
      <h1 class="acc-title">Account Settings</h1>
    </header>

    <div class="acc-main-container">
      <div class="acc-tabs-group">
        <button 
          :class="['tab-item', currentTab === 'profile' ? 'is-active' : '']" 
          @click="currentTab = 'profile'"
        >
          👤 Profile
        </button>
        <button 
          :class="['tab-item', currentTab === 'orders' ? 'is-active' : '']" 
          @click="currentTab = 'orders'"
        >
          📦 Orders ({{ orders.length }})
        </button>
      </div>

      <div class="acc-white-card">
        <div v-if="loading" style="text-align:center; padding:20px;">Loading...</div>
        <div v-else class="acc-inner-content">
          
          <div v-if="currentTab === 'profile'" class="profile-data">
            <div class="field-box">
              <label>FULL NAME</label>
              <div class="value-text">{{ user.name || user.username }}</div>
            </div>
            <div class="field-box">
              <label>EMAIL ADDRESS</label>
              <div class="value-text">{{ user.email }}</div>
            </div>
            <div class="field-box">
              <label>ACCOUNT ROLE</label>
              <div><span class="role-badge">{{ user.role }}</span></div>
            </div>
          </div>

          <div v-if="currentTab === 'orders'" class="orders-data">
            <div v-if="orders.length === 0" class="empty-orders">
               <p>No orders found.</p>
            </div>
            <div v-else class="order-scroll-area">
              <div v-for="order in orders" :key="order._id" class="order-card-mini">
                <div style="display:flex; justify-content:space-between; font-weight:bold;">
                  <span>#{{ order._id.slice(-6) }}</span>
                  <span>{{ order.totalPrice.toLocaleString() }} บาท</span>
                </div>
              </div>
            </div>
          </div>

          <button class="btn-logout" @click="emit('logout')">LOGOUT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.acc-wrapper { width: 100%; min-height: 100vh; background: #EAEAEA; }
.acc-header-banner { background: #9EDAFF; padding: 40px 20px; text-align: center; position: relative; }
.btn-back { position: absolute; top: 15px; left: 15px; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; background: #fff; }
.acc-title { font-size: 32px; margin: 0; color: #fff; }
.acc-main-container { width: 90%; max-width: 450px; margin: -20px auto 0; position: relative; z-index: 10; }
.acc-tabs-group { display: flex; gap: 2px; }
.tab-item { flex: 1; padding: 12px; border: none; cursor: pointer; background: #BDD7E7; font-weight: bold; border-radius: 8px 8px 0 0; }
.tab-item.is-active { background: #fff; color: #333; }
.acc-white-card { background: #fff; padding: 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.field-box { margin-bottom: 20px; text-align: center; }
.field-box label { display: block; font-size: 11px; color: #BBB; font-weight: bold; }
.value-text { font-size: 18px; font-weight: bold; color: #333; }
.role-badge { background: #9EDAFF; padding: 2px 10px; border-radius: 15px; font-size: 11px; color: #fff; }
.btn-logout { width: 100%; padding: 12px; background: #FF5C5C; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 15px; }
.order-card-mini { padding: 12px; border: 1px solid #EEE; border-radius: 6px; margin-bottom: 8px; }
.empty-orders { text-align: center; color: #999; padding: 20px; }
</style>