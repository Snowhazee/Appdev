<script setup>
import { ref, computed, onMounted } from 'vue'
import cartIcon from './assets/cart.png'
import accountIcon from './assets/account.png'
import heroImg from './assets/placeholder.jpg' 
import CartPage from './CartPage.vue'
import ProductPage from './ProductPage.vue'
import SeeAllPage from './SeeAllPage.vue'
import Login from './Login.vue'
import Register from './Register.vue'
import api from './services/api'

const selectedProduct = ref(null)
const currentPage = ref('home') // เปลี่ยนให้เริ่มที่ home เสมอเพื่อป้องกันข้อมูลสินค้าหาย
const search = ref('')
const cart = ref([])
const products = ref([])
const isLoggedIn = ref(!!localStorage.getItem('token'))

onMounted(async () => {
  try {
    const res = await api.get('/products')
    products.value = res.data
  } catch (err) {
    console.error("API ERROR:", err)
  }
})

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

function openProduct(product) {
  selectedProduct.value = product
  currentPage.value = 'product'
}

function changePage(page) {
  currentPage.value = page
}

function addToCart(product) {
  const productId = product._id || product.id
  const existingItem = cart.value.find(item => (item._id || item.id) === productId)
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
  alert('Added to cart!')
}

function removeFromCart(productId) {
  cart.value = cart.value.filter(item => (item._id || item.id) !== productId)
}

function handleAccount() {
  if (isLoggedIn.value) {
    changePage('account')
  } else {
    changePage('login')
  }
}
</script>

<template>
  <div class="container">
    <div class="app-wrapper"> 
      
      <template v-if="currentPage === 'home'">
        <header class="navbar">
          <h1 class="logo" @click="changePage('home')" style="cursor:pointer">Fahhh</h1>
          <div class="search-box">
            <input type="text" placeholder="Search product..." v-model="search" class="search" />
          </div>
          <div class="icons">
            <button class="icon-btn" @click="changePage('cart')">
              <img :src="cartIcon" alt="cart" />
              Cart ({{ cart.length }})
            </button>
            <button class="icon-btn" @click="handleAccount">
              <img :src="accountIcon" alt="account" />
              Account
            </button>
          </div>
        </header>

        <main class="main-content">
          <div class="hero-banner">
            <img :src="heroImg" alt="Hero Banner" />
          </div>

          <section class="section section-blue">
            <div class="section-inner">
              <div class="section-header">
                <h2>Featured Product</h2>
                <button class="see-all-btn" @click="changePage('seeall')">See All</button>
              </div>
              <div class="product-grid grid-4">
                <div class="product-card" v-for="product in filteredProducts.slice(0, 8)" :key="product._id">
                  <img :src="product.imageUrl" class="card-img clickable" @click="openProduct(product)" />
                  <div class="card-info">
                    <p class="card-title">{{ product.title }}</p>
                    <p class="card-price">{{ product.price?.toLocaleString() }} บาท</p>
                    <button @click="addToCart(product)" class="add-small-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </template>

      <CartPage 
        v-else-if="currentPage === 'cart'" 
        :cartItems="cart" 
        @remove-item="removeFromCart" 
        @close="changePage('home')" 
        @clear-cart="cart = []" 
      />

      <ProductPage 
        v-else-if="currentPage === 'product'" 
        :product="selectedProduct" 
        @add-to-cart="addToCart" 
        @close="changePage('home')" 
      />
      
      <Login v-else-if="currentPage === 'login'" @close="changePage('home')" @goRegister="changePage('register')" />
      <Register v-else-if="currentPage === 'register'" @back="changePage('login')" />
      <SeeAllPage v-else-if="currentPage === 'seeall'" :products="filteredProducts" :search="search" @close="changePage('home')" @open-product="openProduct" />

    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: #2c2c2c; 
}

.container {
  width: 100%;
}

.app-wrapper {
  max-width: 1280px; 
  margin: 0 auto;
  background: #EAEAEA; 
  width: 100%;
}

.navbar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  background: #9EDAFF;
  color: black;
}

.logo {
  font-weight: bold;
  font-size: 28px;
  margin: 0;
}

.search-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.search {
  width: 280px;
  padding: 10px 14px;
  border-radius: 0;
  border: 1px solid black;
  background: transparent;
  color: black;
}

.search::placeholder {
  color: #666;
}

.icons {
  margin-left: auto;
  display: flex;
  gap: 15px;
  align-items: center;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.icon-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.main-content {
  display: flex;
  flex-direction: column;
}

.hero-banner {
  width: 100%;
  height: 280px;
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.section {
  padding: 20px 0;
  width: 100%;
}

.section-blue { background-color: #BEE3FF; }
.section-white { background-color: #FFFFFF; }
.section-gray-dark {
  background-color: #b0b0b0; 
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: normal;
  color: black; 
}

.see-all-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 24px;
  cursor: pointer;
  font-size: 14px;
}

.see-all-btn:hover {
  background-color: #2563eb;
}

.grid-smaller {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 10px; 
}

.section-gray-dark .card-title {
  color: black;
}

.section-gray-dark .card-subtitle {
  color: #555;
}

.section-gray-dark .card-price {
  color: black;
}

.section-gray-dark .see-all-btn {
  background-color: black; 
  color: white;
}

.section-gray-dark .see-all-btn:hover {
  background-color: #333;
}

.product-grid {
  display: grid;
  gap: 15px;
}

.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-5 { grid-template-columns: repeat(5, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }

.best-seller-layout {
  display: flex;
  gap: 10px;
}

.bs-left {
  flex: 0.8; 
}

.bs-right {
  flex: 2.2; 
}

.section-white .bs-left img {
  width: 100%;
  height: 200px; 
  min-height: auto; 
  object-fit: cover;
}

.product-card {
  background: transparent;
  display: flex;
  flex-direction: column;
}

.card-img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.clickable {
  cursor: pointer;
  transition: transform 0.2s;
}

.clickable:hover {
  transform: scale(1.02);
}

.card-info {
  padding: 5px 0;
  text-align: left;
}

.card-title {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
}

.card-subtitle {
  margin: 2px 0;
  font-size: 12px;
  color: #555;
}

.card-price {
  margin: 5px 0 0 0;
  font-size: 14px;
}

.footer {
  background: #EAEAEA;
  color: #999;   
  text-align: center;
  padding: 20px 15px;
}

.footer h1 {
  color: black;
  margin: 0 0 10px 0;
  font-size: 28px;
}

.footer p {
  margin: 0;
  font-size: 12px;
}
</style>