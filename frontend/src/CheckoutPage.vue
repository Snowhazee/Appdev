<script setup>
import { ref, reactive } from 'vue'
import heroImage from './assets/placeholder.jpg'
const emit = defineEmits(['close'])

const step = ref(1)
const checkoutForm = reactive({
  name: '',
  phone: '',
  address: ''
})
const paymentMethod = ref('Credit Card')

const goNext = () => {
  if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
    alert('Please fill in all fields: Name, Phone, and Address')
    return
  }
  step.value = 2
}

const goBack = () => {
  step.value = Math.max(1, step.value - 1)
}

const completeOrder = () => {
  if (!paymentMethod.value) {
    alert('Please select a payment method')
    return
  }
  alert(`Order completed successfully!\nName: ${checkoutForm.name}\nPhone: ${checkoutForm.phone}\nAddress: ${checkoutForm.address}\nPayment: ${paymentMethod.value}`)
  emit('close')
}
</script>

<template>
  <main class="checkout-page">
    <header class="checkout-header">
      <button class="back-btn" @click="emit('close')">← Back</button>
      <h1>Checkout</h1>
    </header>
    <section class="checkout-content">
      <div class="steps-indicator">
        <button class="step-tab" :class="{active: step === 1}" @click="step = 1">1. Customer Info</button>
        <button class="step-tab" :class="{active: step === 2}" @click="step = 2">2. Payment</button>
      </div>
      <div class="checkout-body">
        <div class="main-panel">
          <div v-if="step === 1" class="step-card">
            <h2>Customer Info</h2>
            <label>Name</label>
            <input v-model="checkoutForm.name" placeholder="Enter your name" />
            <label>Phone</label>
            <input v-model="checkoutForm.phone" placeholder="Phone number" />
            <label>Address</label>
            <textarea v-model="checkoutForm.address" placeholder="Enter shipping address"></textarea>
            <button class="next-btn" @click="goNext">Next</button>
          </div>

          <div v-if="step === 2" class="step-card">
            <h2>Select Payment Method</h2>
            <div class="payment-option">
              <label>
                <input type="radio" value="Credit Card" v-model="paymentMethod" />
                <div>
                  <strong>Credit Card</strong>
                  <p>Safe money transfer using your bank account. Visa, Maestro, Discover, American Express.</p>
                </div>
              </label>
            </div>
            <div class="payment-option">
              <label>
                <input type="radio" value="PayPal" v-model="paymentMethod" />
                <div>
                  <strong>PayPal</strong>
                  <p>You will be redirected to PayPal website to complete your purchase securely.</p>
                </div>
              </label>
            </div>
            <div class="checkout-actions">
              <button class="back-btn-step" @click="goBack">Back</button>
              <button class="complete-btn" @click="completeOrder">Complete Order</button>
            </div>
          </div>
        </div>

        <aside class="summary-panel">
          <div class="summary-card">
            <h3>Order Summary</h3>
            <div class="summary-item">
              <img :src="heroImage" alt="Product" class="summary-image" />
              <div class="summary-item-info">
                <p class="summary-product">Jinhsi 1/7 Scale</p>
                <p class="summary-price">499 $</p>
              </div>
            </div>
            <p><strong>Shipping:</strong> Free</p>
            <div class="summary-total">
              <span>Total</span>
              <strong>499 $</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
.checkout-page {min-height:100vh;background:#f5f9ff;color:#1f2937;box-sizing:border-box;}
.checkout-header {display:flex;align-items:center;gap:15px;padding:16px 20px;background:#9edaff;}
.checkout-header h1 {margin:0;}
.back-btn {border:none;background:white;padding:8px 12px;border-radius:6px;cursor:pointer;}

.checkout-content {max-width:1050px;margin:20px auto;padding:0 20px 30px;box-sizing:border-box;}
.steps-indicator {display:flex;gap:12px;margin-bottom:22px;justify-content:center;}
.step-tab {border:1px solid #cbd5e1;border-radius:999px;padding:10px 16px;background:#f0f4f8;font-size:.95rem;font-weight:600;color:#64748b;cursor:pointer;min-width:160px;text-align:center;}
.step-tab.active {background:#22d3ee;color:#0f172a;border-color:#22d3ee;}

.checkout-body {display:flex;gap:22px;align-items:flex-start;box-sizing:border-box;}
.main-panel {flex:2.3;}
.summary-panel {flex:1;}

.summary-card {background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:16px;box-shadow:0 6px 16px rgba(15,23,42,.09);box-sizing:border-box;}
.summary-card h3 {margin:0 0 14px;color:#0f172a;}
.summary-item {display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.summary-image {width:80px;height:80px;object-fit:cover;border-radius:10px;border:1px solid #cbd5e1;}
.summary-item-info {display:flex;flex-direction:column;}
.summary-product {margin:0;font-weight:700;color:#0f172a;}
.summary-price {margin:2px 0 0;color:#334155;font-weight:600;}
.summary-total {display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px dashed #cbd5e1;}

.step-card {background:#fff;border:1px solid #d0d5dd;border-radius:12px;padding:18px;box-shadow:0 8px 18px rgba(0,0,0,.08);box-sizing:border-box;}
.step-card h2 {margin-top:0;}
.step-card label {margin-top:10px;display:block;font-weight:600;text-align:left;}
.step-card input, .step-card textarea {width:100%;margin-top:6px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;text-align:left;box-sizing:border-box;}
.step-card textarea {min-height:80px;resize:vertical;}

.payment-option {border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin-top:10px;box-sizing:border-box;display:flex;align-items:flex-start;padding-left:2px;}
.payment-option label {display:flex;gap:10px;align-items:center;width:100%;margin:0;}
.payment-option div {margin:0;}
.payment-option input[type='radio'] {margin-top:0;}
.payment-option strong {display:block;font-size:1.1rem;font-weight:700;margin-bottom:4px;color:#0f172a;}
.payment-option div p {margin:0;font-size:0.95rem;color:#475569;line-height:1.5;}

.checkout-actions {display:flex;justify-content:space-between;margin-top:18px;}
.back-btn-step,.next-btn,.complete-btn {border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-weight:bold;}
.next-btn,.complete-btn {background:#0369a1;color:white;}
.back-btn-step {background:#e5e7eb;color:#1f2937;}
</style>