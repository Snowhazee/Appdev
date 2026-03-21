<script setup>
import { ref, computed } from 'vue'
import cartIcon from './assets/cart.png'
import accountIcon from './assets/account.png'
import AccountPage from './AccountPage.vue'
import CartPage from './CartPage.vue'

const showAccount = ref(false)
const showCart = ref(false)
const search = ref('')

function openAccount() {
  showAccount.value = true
  showCart.value = false
}
function closeAccount() {
  showAccount.value = false
}

function openCart() {
  showCart.value = true
  showAccount.value = false
}
function closeCart() {
  showCart.value = false
}

const products = ref([
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' },
  { id: 3, name: 'Keyboard' },
  { id: 4, name: 'Monitor' }
])

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div class="container">

    <template v-if="!showAccount && !showCart">
      <header class="navbar">
        <h1 class="logo">Fahhh</h1>

        <div class="search-box">
          <input
            type="text"
            placeholder="Search product..."
            v-model="search"
            class="search"
          />
        </div>

        <div class="icons">
          <button class="icon-btn" @click="openCart">
            <img :src="cartIcon" alt="cart" />
            Cart
          </button>

          <button class="icon-btn" @click="openAccount">
            <img :src="accountIcon" alt="account" />
            Account
          </button>
        </div>
      </header>

      <main class="products">
        <div
          class="card"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          {{ product.name }}
        </div>
      </main>

      <footer class="footer">
        <h1>Fahhh</h1>
        <p>Copy Right © Fahhh.com.</p>
      </footer>
    </template>

    <AccountPage 
      v-else-if="showAccount" 
      @close="closeAccount" 
    />

    <CartPage 
      v-else-if="showCart" 
      @close="closeCart" 
    />

  </div>
</template>

<style>
.container{
  font-family: Arial, sans-serif;
  background: white;
}

.navbar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  background: #9EDAFF;
  color: white;
}

.logo{
  font-weight: bold;
}

.search-box{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.search{
  width: 280px;
  padding: 10px 14px;
  border-radius: 0;
  border: 1px solid black;
  background: transparent;
  color: black;
}

.search::placeholder{
  color: #888;
}

.icons{
  margin-left: auto;
  display: flex;
  gap: 15px;
  align-items: center;
}

.icon-btn{
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-btn img{
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.icon-btn:hover{
  transform: scale(1.1);
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.card {
  padding: 20px;
  background: #f3f3f3;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.footer{
  background: #F5F5F5;
  color: #CDCBCB;   
  text-align: center;
  padding: 15px;
}

.footer h1{
  color: #CDCBCB;
}
</style>