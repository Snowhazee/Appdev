<script setup>
const emit = defineEmits(['close'])
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
        <button class="back-button" type="button" @click="emit('close')">
          ← Back
        </button>

        <h1>LOGIN</h1>

        <label>EMAIL</label>
        <input type="text" placeholder="email" />

        <label>PASSWORD</label>
        <input type="password" placeholder="password" />

        <button>LOGIN</button>

        <p>Not have account ? <span>Create one</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  font-family: Arial;
}

.left {
  flex: 1;
  background: #8db9d3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  background: white;
  border-radius: 50%;
  padding: 50px;
  box-shadow: 0 0 0 10px #6f97d6;
}

.logo h1 {
  font-size: 40px;
  color: black;
}

.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2f2f2;
}

.card {
  width: 350px;
  background: #eee;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.card h1 {
  text-align: center;
  margin-bottom: 20px;
  color: black;
}

.card label {
  display: block;
  margin-top: 10px;
}

.card input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.card button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #8db9d3;
  border: none;
  cursor: pointer;
}

.back-button {
  background: transparent;
  border: none;
  color: #4a4a4a;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 0;
  text-align: left;
}

.back-button:hover {
  text-decoration: underline;
}

.card span {
  color: #8db9d3;
  cursor: pointer;
}
</style>