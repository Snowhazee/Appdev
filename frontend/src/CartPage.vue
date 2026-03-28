<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  cartItems: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'remove-item', 'go-checkout'])

const cartData = computed(() => props.cartItems)

// ✅ แค่บอก App.vue ให้เปลี่ยนหน้าไป CheckoutPage
function proceedToCheckout() {
  if (cartData.value.length === 0) return alert('Your cart is empty')
  emit('go-checkout') 
}

const totalAmount = computed(() => {
  return cartData.value.reduce((total, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
      : item.price
    return total + (Number(price || 0) * (item.quantity || 1))
  }, 0).toFixed(2)
})
</script>

<template>
  <div class="cart-page">
    <header class="cart-header">
      <button class="back-btn" @click="emit('close')">← Back</button>
      <h1>Your Cart</h1>
    </header>
    <main class="cart-content">
      <div v-if="cartData.length === 0" class="empty-cart">No items in cart.</div>
      <div v-else class="cart-items">
        <div v-for="item in cartData" :key="item._id || item.id" class="cart-item">
          <img :src="item.image || item.imageUrl" class="item-image" />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.price }} x {{ item.quantity || 1 }}</p>
          </div>
          <button class="remove-btn" @click="emit('remove-item', item._id || item.id)">Remove</button>
        </div>
        <div class="cart-summary">
          <h2>Total: {{ totalAmount }}฿</h2>
          <button class="checkout-btn" @click="proceedToCheckout">Proceed to Checkout</button>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
/* CSS เหมือนเดิมของคุณครับ */
.cart-page { font-family: Arial, sans-serif; min-height: 100vh; background: white; }
.cart-header { display: flex; align-items: center; justify-content: space-between; padding: 15px 30px; background: #9EDAFF; color: black; }
.page-title { margin: 0; font-size: 24px; }
.back-btn, .track-nav-btn { padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; border: none; }
.back-btn { background: #ffffff; color: #000000; border: 1px solid #ccc; }
.track-nav-btn { background: transparent; border: 1px solid black; }
.cart-content { padding: 40px 20px; text-align: center; }
.empty-cart { padding: 50px 20px; color: #777; }
.continue-btn { background: #1F69E2; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.cart-items { max-width: 800px; margin: 0 auto; }
.cart-item { display: flex; align-items: center; gap: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; }
.item-image { width: 90px; height: 90px; object-fit: cover; border-radius: 8px; }
.item-info { flex: 1; text-align: left; color: #000000; }
.item-info h3 { margin: 0 0 5px 0; font-size: 18px; }
.remove-btn { background: #ff4d4f; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
.cart-summary { margin-top: 30px; text-align: right; border-top: 2px solid #d8d8d8; padding-top: 20px; }
.checkout-btn { background: #1a4fa0; color: white; font-size: 16px; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
.checkout-btn:hover { background: #164082; }
.cart-summary h2 { color: #000000; margin-top: 0; margin-bottom: 20px; }
</style>