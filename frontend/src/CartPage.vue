<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'remove', 'track-order', 'checkout'])

function goBack() {
  emit('close')
}

function removeItem(productId) {
  emit('remove', productId)
}

function calculateTotal() {
  return props.cart.reduce((total, item) => {
    const priceString = String(item.price).replace(/[^0-9.-]+/g, "")
    const price = parseFloat(priceString) || 0
    return total + (price * (item.quantity || 1))
  }, 0).toFixed(2)
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
        <button class="track-nav-btn" @click="emit('track-order')">
          Track Order
        </button>
      </div>
    </header>

    <main class="cart-content">
      <div v-if="cart.length === 0" class="empty-cart">
        <p>No items in cart.</p>
        <button class="continue-btn" @click="goBack">Go Shopping</button>
      </div>
      
      <div v-else class="cart-items">
        <div v-for="item in cart" :key="item.id || item._id" class="cart-item">
          <img v-if="item.image || item.imageUrl" :src="item.image || item.imageUrl" :alt="item.title" class="item-image" />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="item-price">{{ item.price }}</p>
            <p class="item-qty">Qty: {{ item.quantity || 1 }}</p>
          </div>
          <button class="remove-btn" @click="removeItem(item.id || item._id)">Remove</button>
        </div>
        
        <div class="cart-summary">
          <h2>Total: {{ calculateTotal() }}</h2>
          <button class="checkout-btn" @click="emit('checkout')">Proceed to Checkout</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cart-page {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background: white;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;          
  padding: 0 20px;       
  background: #9EDAFF;
  color: black;
}

.header-left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.page-title {
  flex: 1;
  text-align: center;
  font-size: 30px;        
  margin: 0;
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.back-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  color: black;
  font-weight: bold;
}

.back-btn:hover {
  background: #eee;
}

.track-nav-btn {
  background: transparent;
  border: 1px solid black;
  color: black;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.track-nav-btn:hover {
  background: black;
  color: white;
}

.cart-content {
  padding: 40px 20px;
  text-align: center;
}

.empty-cart {
  padding: 50px 20px;
  color: #777;
}

.continue-btn {
  background: #1F69E2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.cart-items {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #fdfdfd;
}

.cart-item:hover {
  background-color: #f9f9f9;
}

.item-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

.item-info {
  flex: 1;
  text-align: left;
}

.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}

.item-price {
  margin: 0;
  color: #555;
  font-weight: bold;
}

.item-qty {
  margin: 5px 0 0 0;
  font-size: 0.9rem;
  color: #777;
}

.remove-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #ff7875;
}

.cart-summary {
  margin-top: 30px;
  text-align: right;
  border-top: 2px solid #EEE;
  padding-top: 20px;
}

.cart-summary h2 {
  margin: 0 0 15px 0;
}

.checkout-btn {
  background: #3b82f6;
  color: white;
  font-size: 16px;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #2563eb;
}
</style>