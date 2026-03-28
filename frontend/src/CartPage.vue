<script setup>
import { computed, defineProps, defineEmits } from 'vue'
// นำเข้า api เฉพาะกรณีที่ต้องการส่ง checkout ไป backend จริงๆ
import api from './services/api.js'

// 1. รับข้อมูลตะกร้าส่งตรงมาจาก App.vue
const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// 2. ใช้ computed เพื่อให้ cartData อัปเดตตามตัวแปรใน App.vue เสมอ
const cartData = computed(() => props.cartItems)

const emit = defineEmits(['close', 'track-order', 'remove-item', 'clear-cart'])

// สั่งลบสินค้าโดยส่ง ID กลับไปให้ App.vue จัดการตัวแปรต้นทาง
async function removeItem(productId) {
  emit('remove-item', productId)
  // หากต้องการลบใน DB ด้วย สามารถเปิดใช้ api ได้:
  // try { await api.delete(`/cart/${productId}`) } catch(err) { console.error(err) }
}

// checkout ส่งข้อมูลที่มีในตะกร้าไปที่ Backend
async function checkout() {
  if (cartData.value.length === 0) return
  
  try {
    const res = await api.post('/checkout', { products: cartData.value })
    console.log('Checkout success:', res.data)
    alert('Order placed successfully!')
    emit('clear-cart') // ล้างตะกร้าใน App.vue หลังสั่งซื้อสำเร็จ
  } catch (err) {
    console.error('Checkout failed:', err)
    alert('Failed to checkout. Please try again.')
  }
}

// คำนวณราคารวม
const totalAmount = computed(() => {
  return cartData.value.reduce((total, item) => {
    // แปลงราคาจาก String (เช่น "$100") เป็น Number
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
      : item.price
    return total + (price * (item.quantity || 1))
  }, 0).toFixed(2)
})

function goBack() {
  emit('close')
}

function trackOrder() {
  emit('track-order')
}
</script>

<template>
  <div class="cart-page">
    <header class="cart-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">← Back</button>
      </div>
      <h1 class="page-title">Your Cart</h1>
      <div class="header-right">
        <button class="track-nav-btn" @click="trackOrder">
          Track Order
        </button>
      </div>
    </header>

    <main class="cart-content">
      <div v-if="loading" class="empty-cart">
        <p>Processing...</p>
      </div>

      <div v-else-if="cartData.length === 0" class="empty-cart">
        <p>No items in cart.</p>
        <button class="continue-btn" @click="goBack">Go Shopping</button>
      </div>

      <div v-else class="cart-items">
        <div v-for="item in cartData" :key="item._id || item.id" class="cart-item">
          <img 
            :src="item.image || item.imageUrl || 'https://via.placeholder.com/90'" 
            :alt="item.title" 
            class="item-image" 
          />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="item-price">{{ item.price }}</p>
            <p class="item-qty">Qty: {{ item.quantity || 1 }}</p>
          </div>
          <button class="remove-btn" @click="removeItem(item._id || item.id)">Remove</button>
        </div>

        <div class="cart-summary">
          <h2>Total: ${{ totalAmount }}</h2>
          <button class="checkout-btn" @click="checkout">Proceed to Checkout</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cart-page { font-family: Arial, sans-serif; min-height: 100vh; background: white; }
.cart-header { display: flex; align-items: center; justify-content: space-between; padding: 15px 30px; background: #9EDAFF; color: black; }
.page-title { margin: 0; font-size: 24px; }
.back-btn, .track-nav-btn { padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
.back-btn { border: none; background: white; }
.track-nav-btn { background: transparent; border: 1px solid black; }
.cart-content { padding: 40px 20px; text-align: center; }
.empty-cart { padding: 50px 20px; color: #777; }
.continue-btn { background: #1F69E2; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.cart-items { max-width: 800px; margin: 0 auto; }
.cart-item { display: flex; align-items: center; gap: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; }
.item-image { width: 90px; height: 90px; object-fit: cover; border-radius: 8px; }
.item-info { flex: 1; text-align: left; }
.remove-btn { background: #ff4d4f; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
.cart-summary { margin-top: 30px; text-align: right; border-top: 2px solid #EEE; padding-top: 20px; }
.checkout-btn { background: #3b82f6; color: white; font-size: 16px; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
</style>