<script setup>
// ไม่ต้อง onMounted หรือ Fetch ซ้ำ เพราะ App.vue ส่งมาให้แล้ว
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'add-to-cart'])
</script>

<template>
  <main class="product-page-content">
    <div v-if="product" class="product-wrapper">
      <div class="header-action">
        <button class="back-btn" @click="emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </button>
      </div>

      <section class="product-detail">
        <div class="main-visual">
          <div class="image-container">
            <img :src="product.imageUrl" :alt="product.title" class="main-image" />
          </div>
          
          <div class="product-info-block">
            <div class="text-info">
              <h2 class="product-title">{{ product.title }}</h2>
              <p class="product-details">{{ product.description }}</p>
            </div>
            
            <div class="purchase-block">
              <p class="price">{{ product.price?.toLocaleString() }} ฿</p>
              <button class="add-to-cart-btn" @click="emit('add-to-cart', product)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <div v-else class="loading-state">
      <p>ไม่พบข้อมูลสินค้า</p>
      <button class="back-btn" @click="emit('close')">กลับหน้าหลัก</button>
    </div>
  </main>
</template>

<style scoped>
/* พื้นหลังของหน้า */
.product-page-content { 
  background-color: #9EDAFF; /* พื้นหลังสีเทาอ่อน สบายตา */
  min-height: 89vh; 
  color: #1e293b; 
  padding: 40px 20px; 
  font-family: 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center; /* ให้อยู่ตรงกลางจอ */
}

/* กล่องสีขาวหลักที่คลุมสินค้า */
.product-wrapper { 
  background: #ffffff; 
  border-radius: 16px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); /* เงาบางๆ ให้ดูลอยขึ้นมา */
  width: 100%;
  max-width: 1000px; /* จำกัดความกว้างสูงสุดให้พอดี */
  padding: 40px; 
  position: relative;
}

/* ปุ่ม Back to Home */
.header-action {
  margin-bottom: 30px;
}
.back-btn { 
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e2e8f0; 
  padding: 10px 16px; 
  background: #ffffff; 
  color: #475569; 
  border-radius: 8px; 
  font-weight: 500;
  cursor: pointer; 
  transition: all 0.2s ease;
}
.back-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* จัดเลย์เอาต์ซ้าย-ขวา */
.main-visual { 
  display: flex; 
  align-items: stretch; 
  gap: 50px; /* ระยะห่างระหว่างรูปกับข้อความ */
}

/* ฝั่งรูปภาพ */
.image-container {
  flex: 1; /* ให้ยืดกินพื้นที่ 50% */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc; /* พื้นหลังรองรับรูปภาพ */
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  padding: 20px;
}
.main-image { 
  width: 100%; 
  max-width: 400px; /* ไม่ให้รูปใหญ่เกินไป */
  object-fit: contain; /* ให้รูปแสดงเต็มใบโดยไม่ถูกตัด */
}

/* ฝั่งข้อมูลสินค้า */
.product-info-block { 
  flex: 1; /* ให้ยืดกินพื้นที่ 50% */
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; /* ดันข้อความไว้บน ปุ่มไว้ล่าง */
}

.text-info {
  margin-bottom: 40px;
}

.product-title { 
  font-size: 2rem; 
  font-weight: 700; 
  color: #0f172a; /* สีดำเข้ม */
  margin: 0 0 16px 0; 
  line-height: 1.3;
}

.product-details {
  font-size: 1.1rem;
  color: #64748b; /* สีเทากลางๆ ให้อ่านง่าย */
  line-height: 1.6;
  margin: 0;
}

/* ส่วนราคาและปุ่ม (อยู่ด้านล่างสุด) */
.purchase-block { 
  border-top: 1px solid #e2e8f0; 
  padding-top: 24px; 
}

.price { 
  font-size: 2.5rem; 
  font-weight: 800; 
  color: #000000; 
  margin: 0 0 20px 0; 
}

.add-to-cart-btn { 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%; /* ปุ่มกว้างเต็มพื้นที่กล่อง */
  background-color: #38bdf8; /* สีฟ้าน่ากด */
  color: white; 
  border: none; 
  border-radius: 8px; 
  padding: 16px; 
  font-size: 1.1rem;
  font-weight: bold; 
  cursor: pointer; 
  transition: background-color 0.2s;
}
.add-to-cart-btn:hover {
  background-color: #0ea5e9; /* ตอนชี้เมาส์ให้สีเข้มขึ้น */
}

.loading-state {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
}

/* Responsive เผื่อหน้าจอมือถือ */
@media (max-width: 768px) {
  .product-wrapper {
    padding: 20px;
  }
  .main-visual {
    flex-direction: column; /* เรียงเป็นแนวตั้งบนมือถือ */
    gap: 30px;
  }
  .image-container, .product-info-block {
    width: 100%;
  }
  .product-title {
    font-size: 1.5rem;
  }
  .price {
    font-size: 2rem;
  }
}
</style>