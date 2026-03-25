<script setup>
import { ref } from 'vue'
import heroImage from './assets/placeholder.jpg'

const emit = defineEmits(['close'])

const thumbnailPlaceholders = ref(
  Array.from({ length: 8 }, (_, i) => ({
    id: i,
    image: heroImage
  }))
)

const relatedProductPlaceholders = ref([
  { id: 1, title: 'Shorekeeper', subtitle: '1/7 Scale Figure', price: '499 $', image: heroImage },
  { id: 2, title: 'Changli', subtitle: '1/7 Scale Figure', price: '499 $', image: heroImage },
  { id: 3, title: 'Yinlin', subtitle: 'Action Figure', price: '399 $', image: heroImage },
  { id: 4, title: 'Jiyan', subtitle: 'Action Figure', price: '399 $', image: heroImage },
  { id: 5, title: 'Rover', subtitle: 'Nendoroid', price: '199 $', image: heroImage }
])
</script>

<template>
  <main class="product-page-content">
    <div class="content-container">
      
      <button class="back-btn" @click="emit('close')">← Back to Home</button>

      <section class="product-detail">
        <div class="main-visual">
          <img :src="heroImage" alt="Hero Image" class="main-image" />
          <div class="product-info-block">
            <div class="text-info">
              <h2 class="product-title">Jinhsi 1/7 Scale</h2>
              <p class="product-details">Premium PVC Figure</p>
            </div>
            <div class="purchase-block">
              <p class="price">499 $</p>
              <button class="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
        
        <div class="thumbnail-gallery">
          <div v-for="thumb in thumbnailPlaceholders" :key="thumb.id" class="thumbnail-item">
            <img :src="thumb.image" :alt="'Thumbnail ' + (thumb.id + 1)" />
          </div>
        </div>
      </section>

      <section class="reviews-section">
        <div class="product-review-header">
          <h3>Product Review</h3>
          <div class="rating-stars">
            <span v-for="n in 5" :key="n" class="star empty">☆</span>
          </div>
          <p class="customer-name">Customer: Pongsaton</p>
        </div>

        <div class="add-review-block">
          <h3>ADD Review</h3>
          <div class="rating-stars">
            <span v-for="n in 5" :key="n" class="star empty">☆</span>
          </div>
          <textarea placeholder="Write your review here..."></textarea>
        </div>
      </section>

      <section class="related-products-section">
        <div class="section-header">
          <h3>Related Products</h3>
          <button class="see-all-btn" @click="$emit('open-see-all')">See All</button>
        </div>
        <div class="product-grid">
          <div v-for="product in relatedProductPlaceholders" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.title" class="product-card-image" />
            <div class="product-card-info">
              <p class="card-title">{{ product.title }}</p>
              <p class="card-subtitle">{{ product.subtitle }}</p>
              <p class="card-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<style scoped>
.product-page-content {
  background-color: #FFF;
  color: #000;
  padding: 20px 0;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.back-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  color: #555;
  padding: 0;
}

.back-btn:hover {
  color: #000;
  text-decoration: underline;
}

.product-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.main-visual {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
}

.main-image {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border: 1px solid #CCC;
}

.product-info-block {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  background-color: #F3F4F6;
  border: 1px solid #CCC;
  min-height: 200px;
  margin-top: auto;
}

.product-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 5px 0;
}

.product-details {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

.purchase-block {
  margin-top: 20px;
  text-align: right;
  border-top: 1px solid #AAA;
  padding-top: 10px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.add-to-cart-btn {
  background-color: #9EDAFF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #7abfe5;
}

.thumbnail-gallery {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.thumbnail-item {
  width: 70px;
  height: 70px;
  border: 1px solid #CCC;
  overflow: hidden;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviews-section {
  border-top: 2px solid #000;
  padding-top: 20px;
  margin-bottom: 40px;
}

.product-review-header, .add-review-block {
  margin-bottom: 20px;
}

h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.rating-stars {
  font-size: 1.3rem;
  color: #CCC;
  margin-bottom: 5px;
}

.customer-name {
  font-size: 0.8rem;
  color: #777;
  margin: 0;
}

textarea {
  width: 100%;
  max-width: 300px;
  height: 80px;
  padding: 5px;
  border: 1px solid #CCC;
  border-radius: 4px;
  margin-top: 10px;
}

.related-products-section {
  border-top: 2px solid #000;
  padding-top: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.see-all-btn {
  background-color: #1F69E2;
  color: #FFF;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 0.9rem;
  cursor: pointer;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

.product-card {
  border: 1px solid #EEE;
  border-radius: 4px;
  padding: 10px;
  background-color: #F9FAFB;
}

.product-card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.product-card-info {
  margin-top: 10px;
  font-size: 0.8rem;
}

.card-title {
  font-weight: bold;
  margin: 0 0 2px 0;
}

.card-subtitle {
  color: #555;
  margin: 0 0 2px 0;
}

.card-price {
  font-weight: bold;
  margin: 0;
}
</style>