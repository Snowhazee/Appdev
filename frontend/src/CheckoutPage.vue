<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import axios from 'axios'

// 1. รับข้อมูลจากหน้าหลัก
const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'order-success'])

const step = ref(1)
const loading = ref(false)
const checkoutForm = reactive({
  name: '',
  phone: '',
  address: ''
})
const paymentMethod = ref('Credit Card')

// คำนวณราคาทั้งหมด
const totalPrice = computed(() => {
  return props.cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0
    const qty = Number(item.qty || item.quantity || 1)
    return acc + (price * qty)
  }, 0)
})

// ดึงข้อมูล User Profile มาใส่ฟอร์ม
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data) {
        checkoutForm.name = res.data.name || ''
        checkoutForm.address = res.data.address || ''
        checkoutForm.phone = res.data.phone || ''
      }
    }
  } catch (err) {
    console.error("Fetch profile failed:", err)
  }
})

const goNext = () => {
  if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }
  step.value = 2
}

const goBack = () => {
  step.value = Math.max(1, step.value - 1)
}

// 3. ส่ง Order ไปบันทึกใน Backend
const completeOrder = async () => {
  // ตรวจสอบเบื้องต้นว่ามีสินค้าในตะกร้าไหม
  if (props.cartItems.length === 0) {
    alert("ไม่มีสินค้าในตะกร้า");
    return;
  }

  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    
    // เตรียมข้อมูลส่งไป Backend (ตรวจสอบชื่อ field ให้ตรงกับ Model ของคุณ)
    const orderData = {
      products: props.cartItems.map(item => ({
        product: item._id || item.id, // ส่ง ID สินค้า
        quantity: Number(item.qty || item.quantity || 1) // ส่งจำนวน
      })),
      totalPrice: totalPrice.value,
      shippingAddress: checkoutForm.address,
      paymentMethod: paymentMethod.value
    };

    // ตรวจสอบว่ามี product ID ครบทุกตัวไหมก่อนส่ง
    const hasInvalidItem = orderData.products.some(p => !p.product);
    if (hasInvalidItem) {
      throw new Error("พบสินค้าบางรายการไม่มีรหัส (ID) กรุณาลองเพิ่มสินค้าใหม่");
    }

    // เรียก API โดยใช้ axios ตรงๆ (ระบุ URL เต็มเพื่อความชัวร์)
    const res = await axios.post('http://localhost:3000/api/orders', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 201 || res.status === 200) {
      alert("สั่งซื้อสำเร็จ!");
      emit('order-success'); 
    }
  } catch (err) {
    console.error("Checkout Error Detail:", err.response?.data || err.message);
    const errorMsg = err.response?.data?.message || err.message || "ข้อมูลสินค้าไม่ถูกต้อง";
    alert("สั่งซื้อไม่สำเร็จ: " + errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="checkout-page">
    <header class="checkout-header">
      <button class="back-btn" @click="emit('close')">← Back to Shop</button>
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
            <h2>ข้อมูลการจัดส่ง</h2>
            <div class="form-group">
              <label>ชื่อ-นามสกุล</label>
              <input v-model="checkoutForm.name" placeholder="ระบุชื่อผู้รับ" />
            </div>
            <div class="form-group">
              <label>เบอร์โทรศัพท์</label>
              <input v-model="checkoutForm.phone" placeholder="ระบุเบอร์โทร" />
            </div>
            <div class="form-group">
              <label>ที่อยู่จัดส่ง</label>
              <textarea v-model="checkoutForm.address" rows="4" placeholder="ระบุที่อยู่โดยละเอียด"></textarea>
            </div>
            <button class="next-btn" @click="goNext">ขั้นตอนถัดไป</button>
          </div>

          <div v-if="step === 2" class="step-card">
            <h2>เลือกช่องทางการชำระเงิน</h2>
            <div class="payment-option" :class="{selected: paymentMethod === 'Credit Card'}" @click="paymentMethod = 'Credit Card'">
              <input type="radio" value="Credit Card" v-model="paymentMethod" />
              <div class="payment-text">
                <strong>Credit Card</strong>
                <p>รองรับ Visa, Mastercard, JCB</p>
              </div>
            </div>

            <div class="payment-option" :class="{selected: paymentMethod === 'PayPal'}" @click="paymentMethod = 'PayPal'">
              <input type="radio" value="PayPal" v-model="paymentMethod" />
              <div class="payment-text">
                <strong>PayPal</strong>
                <p>ชำระผ่านบัญชี PayPal ของคุณ</p>
              </div>
            </div>

            <div class="checkout-actions">
              <button class="back-btn-step" @click="goBack" :disabled="loading">ย้อนกลับ</button>
              <button class="complete-btn" @click="completeOrder" :disabled="loading">
                {{ loading ? 'กำลังประมวลผล...' : 'ยืนยันการสั่งซื้อ' }}
              </button>
            </div>
          </div>
        </div>

        <aside class="summary-panel">
          <div class="summary-card">
            <h3>สรุปรายการสั่งซื้อ</h3>
            <div v-for="(item, index) in props.cartItems" :key="index" class="summary-item">
              <img :src="item.image || 'https://via.placeholder.com/80'" alt="Product" class="summary-image" />
              <div class="summary-item-info">
                <p class="summary-product">{{ item.name }}</p>
                <p class="summary-price">{{ item.price }} $ <span>x {{ item.qty || item.quantity || 1 }}</span></p>
              </div>
            </div>
            
            <div class="summary-details">
              <p><span>ค่าจัดส่ง:</span> <span class="free">ฟรี</span></p>
            </div>

            <div class="summary-total">
              <span>ยอดรวมทั้งสิ้น</span>
              <strong>{{ totalPrice }} $</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
.checkout-page { min-height: 100vh; background: #f8fafc; color: #1e293b; padding-bottom: 50px; }
.checkout-header { display: flex; align-items: center; gap: 15px; padding: 1rem 5%; background: #ffffff; border-bottom: 1px solid #e2e8f0; }
.back-btn { border: 1px solid #e2e8f0; background: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; }

.checkout-content { max-width: 1100px; margin: 30px auto; padding: 0 20px; }
.steps-indicator { display: flex; gap: 15px; margin-bottom: 30px; justify-content: center; }
.step-tab { border: 1px solid #e2e8f0; border-radius: 30px; padding: 10px 25px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
.step-tab.active { background: #0ea5e9; color: white; border-color: #0ea5e9; }

.checkout-body { display: flex; gap: 30px; align-items: flex-start; }
.main-panel { flex: 1.5; }
.summary-panel { flex: 1; position: sticky; top: 20px; }

.step-card, .summary-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 600; color: #475569; }
.form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; }

.next-btn, .complete-btn { width: 100%; margin-top: 25px; padding: 14px; background: #0f172a; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }
.complete-btn:disabled { background: #94a3b8; }

.payment-option { display: flex; gap: 15px; padding: 16px; border: 2px solid #e2e8f0; border-radius: 12px; margin-top: 12px; cursor: pointer; }
.payment-option.selected { border-color: #0ea5e9; background: #f0f9ff; }

.summary-item { display: flex; gap: 15px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9; }
.summary-image { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; }
.summary-product { font-weight: 700; margin: 0; }
.summary-total { display: flex; justify-content: space-between; font-size: 1.2rem; margin-top: 15px; padding-top: 15px; border-top: 2px solid #f1f5f9; }
.free { color: #10b981; font-weight: 700; }

.checkout-actions { display: flex; gap: 15px; }
.back-btn-step { flex: 0.5; margin-top: 25px; padding: 14px; background: #f1f5f9; border: none; border-radius: 8px; cursor: pointer; }

@media (max-width: 768px) {
  .checkout-body { flex-direction: column; }
  .summary-panel { width: 100%; position: static; }
}
</style>