<script setup>
import { computed } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  search: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'open-product'])

const filteredProducts = computed(() => {
  return props.products.filter(product =>
    product.title.toLowerCase().includes(props.search.toLowerCase())
  )
})
</script>

<template>
  <main class="see-all-page">
    <div class="top-bar">
      <button class="back-btn" @click="emit('close')">← Back to Home</button>
      <h2>All Products</h2>
      <p class="count">{{ filteredProducts.length }} products</p>
    </div>

    <section class="products-grid">
      <div
        v-for="product in filteredProducts"
        :key="product._id" 
        class="product-card"
        @click="emit('open-product', product)" 
      >
        <img :src="product.imageUrl" :alt="product.title" class="card-img" />
        
        <div class="card-info">
          <p class="card-title">{{ product.title }}</p>
          <p class="card-price">{{ product.price?.toLocaleString() }} บาท</p>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="empty-state">
        ไม่มีสินค้าในขณะนี้
      </div>
    </section>
  </main>
</template>

<style scoped>
.see-all-page { padding: 20px; background: #9EDAFF; min-height: 100vh; }
.top-bar { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
.back-btn { background: #ffffff; border: 1px solid #ccc; padding: 8px 14px; cursor: pointer; border-radius: 6px; font-weight: bold; color: #000; }
.count { margin-left: auto; font-size: 0.9rem; color: #333; font-weight: bold; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }

/* 1. ให้ Card เป็น Flex Column จะได้ดัน Info ให้เต็มพื้นที่ได้ */
.product-card { 
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd; 
  border-radius: 8px; 
  overflow: hidden; 
  background: #ffffff; /* เปลี่ยนเป็นสีขาวให้คลีนขึ้นเหมือนรูปตัวอย่าง */
  cursor: pointer; 
  transition: transform 0.15s ease, box-shadow 0.15s ease; 
}
.product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); }
.card-img { width: 100%; height: 180px; object-fit: cover; background: #eee; }

/* 2. จัด Card Info ให้ใช้ Flex ดันคอนเทนต์ขึ้น-ลง */
.card-info { 
  padding: 12px 8px; 
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* ยืดให้เต็มพื้นที่ส่วนที่เหลือ */
  justify-content: space-between; /* ดันชื่อกับราคาให้ห่างกัน บน-ล่าง */
}

/* 3. จัดชื่อให้อยู่ซ้ายบน */
.card-title { 
  margin: 0 0 12px 0; 
  font-weight: bold; 
  text-align: left; 
  color: #64748b; /* สีเทาอมฟ้า ให้ดูสบายตาขึ้น */
  line-height: 1;
}

/* 4. จัดราคาให้อยู่ขวาล่าง */
.card-price { 
  margin: 0; 
  color: #000000; 
  font-weight: bold; 
  text-align: right; 
  font-size: 1.1rem;
}

.empty-state { grid-column: 1 / -1; text-align: center; color: #777; padding: 40px 0; font-size: 1.2rem; }
</style>