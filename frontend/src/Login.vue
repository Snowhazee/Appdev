<script setup>
import { ref } from 'vue'
// 1. นำเข้า api ที่เราเซต baseURL ไว้ที่ Render เรียบร้อยแล้ว
import api from './services/api' 

const emit = defineEmits(['back', 'login-success', 'go-register'])

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Please fill in all fields")
    return
  }

  isLoading.value = true
  try {
    // 2. เปลี่ยนจาก axios.post เป็น api.post และตัด URL ส่วนเกินออก
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    // เก็บ Token ลงเครื่อง (ตัว api.js ของเราจะดึงไปใช้ต่อเองในหน้าอื่นๆ)
    localStorage.setItem('token', res.data.token)
    
    alert("Login Successful! 🎉")
    emit('login-success') 
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data || err.message)
    const errorMsg = err.response?.data?.message || "Login failed!"
    alert(errorMsg)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="left">
      <div class="logo">
        <h1>Fahhh</h1>
      </div>
    </div>

    <div class="right">
      <div class="card">
        <button class="back-button" @click="emit('back')">← Back</button>

        <h1>LOGIN</h1>

        <label>EMAIL</label>
        <input 
          v-model="email" 
          type="email" 
          placeholder="your@email.com" 
          @keyup.enter="handleLogin"
        />

        <label>PASSWORD</label>
        <input 
          v-model="password" 
          type="password" 
          placeholder="••••••••••••" 
          @keyup.enter="handleLogin"
        />

        <button @click="handleLogin" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'LOGIN' }}
        </button>

        <p>
          Not have account ? 
          <span class="link" @click="emit('go-register')">Create one</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS ของคุณดีมากแล้วครับ ไม่ต้องแก้ไขอะไร */
.login-page { display: flex; height: 100vh; font-family: Arial, sans-serif; }
.left { flex: 1; background: #8db9d3; display: flex; align-items: center; justify-content: center; }
.logo { background: white; border-radius: 50%; padding: 50px; box-shadow: 0 0 0 10px #6f97d6; }
.logo h1 { font-size: 40px; color: black; margin: 0; }
.right { flex: 1; display: flex; align-items: center; justify-content: center; background: #f2f2f2; }
.card { width: 350px; background: #eee; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 8px; }
.card h1 { text-align: center; margin-bottom: 20px; color: black; }
.card label { display: block; margin-top: 15px; font-weight: bold; font-size: 14px; }
.card input { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.card button { margin-top: 25px; width: 100%; padding: 12px; background: #8db9d3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.3s; }
.card button:hover { background: #6f97d6; }
.card button:disabled { background: #ccc; cursor: not-allowed; }
.back-button { background: transparent; border: none; cursor: pointer; margin-bottom: 10px; color: #666; }
.link { color: #8db9d3; cursor: pointer; font-weight: bold; text-decoration: underline; }
.link:hover { color: #6f97d6; }
p { text-align: center; margin-top: 20px; font-size: 14px; }
</style>