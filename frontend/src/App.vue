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
import AccountPage from './AccountPage.vue'
import CheckoutPage from './CheckoutPage.vue' 
import api from './services/api' // ✅ ตรวจสอบว่า Path นี้ถูกต้อง

const selectedProduct = ref(null)
const currentPage = ref('home')
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

function onLoginSuccess() {
  isLoggedIn.value = true
  currentPage.value = 'home'
}

function handleLogout() {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  currentPage.value = 'home'
}

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    (product.title || '').toLowerCase().includes(search.value.toLowerCase())
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
    cart.value.push({ ...product, quantity: 1, name: product.title }) 
  }
  alert('Added to cart!')
}

function removeFromCart(productId) {
  cart.value = cart.value.filter(item => (item._id || item.id) !== productId)
}

function handleAccount() {
  if (isLoggedIn.value) {
    currentPage.value = 'account'
  } else {
    currentPage.value = 'login'
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
              {{ isLoggedIn ? 'Account' : 'Login' }} 
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

      <CheckoutPage v-else-if="currentPage === 'checkout'" :cartItems="cart" @close="currentPage = 'home'" @order-success="() => { cart = []; currentPage = 'account'; }" />
      <CartPage v-else-if="currentPage === 'cart'" :cartItems="cart" @remove-item="removeFromCart" @close="changePage('home')" @clear-cart="cart = []" @go-checkout="currentPage = 'checkout'" />
      <ProductPage v-else-if="currentPage === 'product'" :product="selectedProduct" @add-to-cart="addToCart" @close="changePage('home')" />
      <Login v-else-if="currentPage === 'login'" @back="changePage('home')" @go-register="changePage('register')" @login-success="onLoginSuccess" />
      <Register v-else-if="currentPage === 'register'" @back="changePage('login')" />
      <AccountPage v-else-if="currentPage === 'account'" @close="changePage('home')" @logout="handleLogout" />
      <SeeAllPage v-else-if="currentPage === 'seeall'" :products="filteredProducts" :search="search" @close="changePage('home')" @open-product="openProduct" />

    </div>
  </div>
</template>

<style>
/* Style เดิมที่ใช้ร่วมกัน */
body { margin: 0; padding: 0; font-family: Arial, sans-serif; background: #2c2c2c; }
.container { width: 100%; }
.app-wrapper { max-width: 1280px; margin: 0 auto; background: #EAEAEA; width: 100%; min-height: 100vh; }
.navbar { position: relative; display: flex; align-items: center; padding: 20px; background: #9EDAFF; color: black; }
.logo { font-weight: bold; font-size: 28px; margin: 0; }
.search-box { position: absolute; left: 50%; transform: translateX(-50%); }
.search { width: 280px; padding: 10px 14px; border: 1px solid black; background: transparent; }
.icons { margin-left: auto; display: flex; gap: 15px; align-items: center; }
.icon-btn { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: bold; }
.icon-btn img { width: 24px; height: 24px; }
.main-content { display: flex; flex-direction: column; }
.hero-banner { width: 100%; height: 280px; }
.hero-banner img { width: 100%; height: 100%; object-fit: cover; }
.section { padding: 20px 0; width: 100%; }
.section-blue { background-color: #BEE3FF; }
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.product-grid { display: grid; gap: 15px; }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.product-card { display: flex; flex-direction: column; background: white; padding: 10px; border-radius: 8px; }
.card-img { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; border-radius: 4px; }
.clickable { cursor: pointer; transition: 0.2s; }
.clickable:hover { transform: scale(1.02); }
.add-small-btn { margin-top: 10px; padding: 8px; cursor: pointer; background: #0ea5e9; color: white; border: none; border-radius: 4px; font-weight: bold; }
</style>