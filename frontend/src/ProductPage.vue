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
      <button class="back-btn" @click="emit('close')">← Back to Home</button>

      <section class="product-detail">
        <div class="main-visual">
          <img :src="product.imageUrl" :alt="product.title" class="main-image" />
          
          <div class="product-info-block">
            <div class="text-info">
              <h2 class="product-title">{{ product.title }}</h2>
              <p class="product-details">{{ product.description }}</p>
            </div>
            
            <div class="purchase-block">
              <p class="price">{{ product.price?.toLocaleString() }} ฿</p>
              <div class="action-buttons">
                <button class="add-to-cart-btn" @click="emit('add-to-cart', product)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="loading">ไม่พบข้อมูลสินค้า</div>
  </main>
</template>

<style scoped>
.product-page-content { background: linear-gradient(180deg, #dff4ff 0%, #f9fbff 100%); min-height: 100vh; color: #0f172a; padding: 30px 0 50px; }
.content-container { max-width: 1100px; margin: 0 auto; padding: 0 16px; }
.product-wrapper { background: #fff; border-radius: 20px; border: 1px solid #d7e8f7; box-shadow: 0 16px 35px rgba(0, 0, 0, 0.08); padding: 26px; }
.back-btn { border: none; padding: 8px 14px; background: #f3f9ff; color: #1f2937; border-radius: 8px; cursor: pointer; margin-bottom: 18px; }
.main-visual { display: flex; justify-content: center; align-items: flex-start; gap: 40px; }
.main-image { width: 400px; height: 400px; object-fit: cover; border: 1px solid #CCC; }
.product-info-block { width: 250px; display: flex; flex-direction: column; justify-content: flex-end; padding: 10px; background-color: #F3F4F6; border: 1px solid #CCC; min-height: 200px; margin-top: auto; }
.product-title { font-size: 1.4rem; font-weight: bold; margin: 0; }
.purchase-block { margin-top: 20px; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; border-top: 1px solid #AAA; padding-top: 10px; }
.price { font-size: 1.2rem; font-weight: bold; }
.add-to-cart-btn { background-color: #9EDAFF; color: white; border: none; border-radius: 4px; padding: 8px 15px; font-weight: bold; cursor: pointer; }
.order-now-btn { border: none; border-radius: 8px; padding: 8px 15px; background: #ff6b6b; color: white; font-weight: bold; cursor: pointer; }
.thumbnail-gallery { display: flex; justify-content: center; gap: 10px; margin-top: 20px; }
.thumbnail-item { width: 70px; height: 70px; border: 1px solid #CCC; }
.thumbnail-item img { width: 100%; height: 100%; object-fit: cover; }
.reviews-section, .related-products-section { border-top: 2px solid #000; padding-top: 20px; margin-top: 40px; }
.product-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
.product-card { border: 1px solid #EEE; padding: 10px; background: #F9FAFB; }
.product-card-image { width: 100%; height: 120px; object-fit: cover; }
.see-all-btn { background: #1F69E2; color: #FFF; border: none; padding: 5px 15px; cursor: pointer; }
</style>