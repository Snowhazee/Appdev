<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

function goBack() {
  emit('close')
}
</script>

<template>
  <div class="cart-page">
    <header class="cart-header">
      <button class="back-btn" @click="goBack">← Back</button>
      <h1>Your Cart</h1>
    </header>

    <main class="cart-content">
      <p>No items in cart.</p>
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
</style>