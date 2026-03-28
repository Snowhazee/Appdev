<script setup>
import { ref } from 'vue'
// ✅ เปลี่ยนมาใช้ api.js ที่เราเซต baseURL ไว้แล้ว
import api from './services/api' 

const emit = defineEmits(['back', 'register-success'])

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("รหัสผ่านไม่ตรงกัน!")
    return
  }

  try {
    // ✅ ยิงไปที่ Render อัตโนมัติ ไม่ต้องใส่ URL เต็ม
    const res = await api.post('/auth/register', {
      name: username.value,
      email: email.value,
      password: password.value
    })

    alert("สมัครสมาชิกสำเร็จ!")
    emit('back') 
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "สมัครสมาชิกไม่สำเร็จ");
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
        <button class="back-button" @click="emit('back')">
          ← Back
        </button>

        <h1>REGISTER</h1>

        <label>USERNAME</label>
        <input v-model="username" type="text" placeholder="username" />

        <label>EMAIL</label>
        <input v-model="email" type="text" placeholder="email" />

        <label>PASSWORD</label>
        <input v-model="password" type="password" placeholder="password" />

        <label>CONFIRM PASSWORD</label>
        <input v-model="confirmPassword" type="password" placeholder="confirm password" />

        <button @click="handleRegister">REGISTER</button>

        <p>
          Already have account ?
          <span @click="emit('back')">Login</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style เดิมของคุณ (ดีอยู่แล้วครับ) */
.login-page { display: flex; height: 100vh; font-family: Arial; }
.left { flex: 1; background: #8db9d3; display: flex; align-items: center; justify-content: center; }
.logo { background: white; border-radius: 50%; padding: 50px; box-shadow: 0 0 0 10px #6f97d6; }
.logo h1 { font-size: 40px; color: black; }
.right { flex: 1; display: flex; align-items: center; justify-content: center; background: #f2f2f2; }
.card { width: 350px; background: #eee; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
.card h1 { text-align: center; margin-bottom: 20px; color: black; }
.card label { display: block; margin-top: 10px; }
.card input { width: 100%; padding: 8px; margin-top: 5px; }
.card button { margin-top: 20px; width: 100%; padding: 10px; background: #8db9d3; border: none; cursor: pointer; font-weight: bold; }
.back-button { background: transparent; border: none; cursor: pointer; margin-bottom: 10px; color: #666; }
.card span { color: #8db9d3; cursor: pointer; font-weight: bold; }
</style>