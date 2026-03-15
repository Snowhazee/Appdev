<script setup>
import { ref, computed } from 'vue'

const search = ref('')

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

    <header class="navbar">
      <h2>My Shop</h2>

      <input
        type="text"
        placeholder="Search product..."
        v-model="search"
        class="search"
      />
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

  </div>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #222;
  color: white;
  align-items: center;
}

.search {
  padding: 8px;
  border-radius: 5px;
  border: none;
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
}
</style>
