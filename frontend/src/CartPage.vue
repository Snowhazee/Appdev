<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'remove'])

function goBack() {
  emit('close')
}

function removeItem(productId) {
  emit('remove', productId)
}

function calculateTotal() {
  return props.cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''))
    return total + (price * (item.quantity || 1))
  }, 0).toFixed(2)
}
</script>

<template>
  <div class="cart-page">
    <header class="cart-header">
      <button class="back-btn" @click="goBack">← Back</button>
      <h1>Your Cart</h1>
    </header>

    <main class="cart-content">
      <div v-if="cart.length === 0" class="empty-cart">
        <p>No items in cart.</p>
      </div>
      <div v-else class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="item-image" />
          <div class="item-info">
            <h3>{{ item.title }} <span class="quantity-badge">(x{{ item.quantity || 1 }})</span></h3>
            <p class="item-subtitle">{{ item.subtitle }}</p>
            <p class="item-price">{{ item.price }}</p>
          </div>
          <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
        </div>
        <div class="cart-total">
          <h3>Total: ${{ calculateTotal() }}</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cart-page {
  font-family: Arial, sans-serif;
  height: 100vh;
  background: white;
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #9EDAFF;
  color: white;
}

.back-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  color: black;
}

.cart-content {
  padding: 20px;
  text-align: center;
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;
}

.cart-items {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info {
  flex: 1;
  text-align: left;
}

.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.quantity-badge {
  font-size: 0.85rem;
  color: #666;
  font-weight: normal;
}

.item-subtitle {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  margin: 0;
  font-weight: bold;
  color: #333;
}

.item-quantity {
  min-width: 100px;
  text-align: center;
}

.item-quantity p {
  margin: 0;
  font-weight: bold;
}

.remove-btn {
  padding: 8px 15px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.remove-btn:hover {
  background: #e34f4f;
}

.cart-total {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
  text-align: right;
}

.cart-total h3 {
  font-size: 1.3rem;
  margin: 0;
}
</style>
