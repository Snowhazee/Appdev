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
        :key="product.id"
        class="product-card"
        @click="emit('open-product')"
      >
        <img :src="product.image" :alt="product.title" class="card-img" />
        <div class="card-info">
          <p class="card-title">{{ product.title }}</p>
          <p class="card-subtitle">{{ product.subtitle }}</p>
          <p class="card-price">{{ product.price }}</p>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="empty-state">
        ไม่มีสินค้าในขณะนี้
      </div>
    </section>
  </main>
</template>

<style scoped>
.see-all-page {
  padding: 20px;
  background: #9EDAFF;
  min-height: 100vh;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.back-btn {
  background: transparent;
  border: 1px solid #666;
  padding: 6px 10px;
  cursor: pointer;
}

.count {
  margin-left: auto;
  font-size: 0.9rem;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #f8f8f8;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-info {
  padding: 12px;
}

.card-title {
  margin: 0 0 4px;
  font-weight: bold;
}

.card-subtitle {
  margin: 0 0 6px;
  color: #666;
  font-size: 0.9rem;
}

.card-price {
  margin: 0;
  color: #333;
  font-weight: bold;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  color: #777;
  padding: 30px 0;
}
</style>
