<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])

const trackingId = ref('')
const trackingResult = ref(null)
const isLoading = ref(false)

const steps = [
  { label: 'Order Placed', time: 'Nov 05, 10:00 AM' },
  { label: 'Shipped', time: 'Nov 07, 02:30 PM' },
  { label: 'Delivered', time: 'Expected Nov 12' }
]

function trackOrder() {
  if (!trackingId.value.trim()) {
    alert('Please enter an Order ID')
    return
  }

  isLoading.value = true
  trackingResult.value = null 

  setTimeout(() => {
    trackingResult.value = {
      id: trackingId.value.toUpperCase(),
      carrier: 'Fahhh Express (FAH-USA)',
      estDelivery: 'Nov 12, 2026',
      currentStatusIndex: 1, // 0 = Placed, 1 = Shipped, 2 = Delivered
      statusText: 'Arriving Tomorrow',
      lastUpdate: 'Package departed from sorting facility - Bangkok Hub'
    }
    isLoading.value = false
  }, 1500)
}
</script>

<template>
  <div class="tracking-page">
    <header class="tracking-header">
      <button class="back-btn" @click="emit('close')">← Back</button>
      <h1 class="logo">Fahhh</h1>
      <div class="header-space"></div>
    </header>

    <main class="tracking-content">
      <div class="tracking-container">
        
        <section class="search-section card">
          <h1 class="page-title">Order Tracking</h1>
          <p class="subtitle">Enter your Order ID below to see the current status of your package.</p>
          
          <div class="input-group">
            <label>Order ID</label>
            <div class="input-wrapper">
              <input 
                type="text" 
                v-model="trackingId" 
                placeholder="e.g., FAH123456789"
                @keyup.enter="trackOrder"
              />
              <button class="track-btn" @click="trackOrder" :disabled="isLoading">
                {{ isLoading ? 'Tracking...' : 'Track' }}
              </button>
            </div>
          </div>
        </section>

        <transition name="fade">
          <section v-if="trackingResult" class="result-section">
            
            <div class="status-alert card">
              <div class="alert-icon">🚚</div>
              <div class="alert-text">
                <h3>{{ trackingResult.statusText }}</h3>
                <p>{{ trackingResult.lastUpdate }}</p>
              </div>
              <div class="alert-date text-right">
                <p class="label">Est. Delivery</p>
                <p class="value highlight">{{ trackingResult.estDelivery }}</p>
              </div>
            </div>

            <div class="result-details card">
              <div class="details-header">
                <div>
                  <p class="label">Order ID</p>
                  <p class="value">#{{ trackingResult.id }}</p>
                </div>
                <div class="text-right">
                  <p class="label">Carrier</p>
                  <p class="value">{{ trackingResult.carrier }}</p>
                </div>
              </div>

              <div class="stepper-wrapper">
                <div class="stepper-progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: (trackingResult.currentStatusIndex / (steps.length - 1)) * 100 + '%' }"
                  ></div>
                </div>
                
                <div class="stepper-steps">
                  <div 
                    v-for="(step, index) in steps" 
                    :key="index" 
                    class="step"
                    :class="{ 
                      'completed': index < trackingResult.currentStatusIndex,
                      'active': index === trackingResult.currentStatusIndex
                    }"
                  >
                    <div class="step-dot-wrapper">
                      <div class="step-dot">
                        <span v-if="index < trackingResult.currentStatusIndex">✓</span>
                      </div>
                    </div>
                    <div class="step-info">
                      <p class="step-label">{{ step.label }}</p>
                      <p class="step-time">{{ step.time }}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </transition>

        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Fetching your order details...</p>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.tracking-page {
  background-color: #A2D9FF; 
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: black;
  padding-bottom: 50px;
}

.tracking-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background: white;
  border-bottom: 1px solid #eee;
}
.logo { font-size: 28px; font-weight: bold; margin: 0; cursor: pointer; flex: 1; text-align: center; }
.back-btn { background: #eee; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px; font-weight: bold; }
.back-btn:hover { background: #ddd; }
.header-space { flex: 1; }

.tracking-content { padding: 40px 20px; }
.tracking-container { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

.card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.page-title { margin: 0 0 10px 0; font-size: 32px; font-weight: bold; text-align: center;}
.subtitle { color: #555; text-align: center; margin-bottom: 30px; }

.input-group label { display: block; font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #333;}
.input-wrapper { display: flex; gap: 10px; }
.input-wrapper input {
  flex: 1;
  padding: 15px;
  border: 1px solid #CCC;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}
.input-wrapper input:focus { outline: none; border-color: #1F69E2; } /* สีน้ำเงินเข้ม */

.track-btn {
  background: #3b82f6; 
  color: white;
  border: none;
  padding: 0 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.track-btn:hover { background: #2563eb; }
.track-btn:disabled { background: #ccc; cursor: not-allowed; }

.result-section { display: flex; flex-direction: column; gap: 20px; }

.status-alert { display: flex; align-items: center; gap: 20px; border-left: 5px solid #1F69E2; }
.alert-icon { font-size: 40px; }
.alert-text { flex: 1; }
.alert-text h3 { margin: 0 0 5px 0; font-size: 20px; color: #1F69E2; }
.alert-text p { margin: 0; color: #555; font-size: 14px; }

.details-header { display: flex; justify-content: space-between; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
.label { font-size: 12px; color: #777; margin: 0 0 3px 0; }
.value { font-size: 16px; font-weight: bold; margin: 0; }
.highlight { color: #1F69E2; }
.text-right { text-align: right; }

.stepper-wrapper { position: relative; padding: 0 20px; }

.stepper-progress-bar {
  position: absolute;
  top: 15px; /* กึ่งกลางจุด dot */
  left: 30px;
  right: 30px;
  height: 4px;
  background: #eee;
  z-index: 1;
  border-radius: 2px;
}
.progress-fill { height: 100%; background: #3b82f6; border-radius: 2px; transition: width 0.5s ease; }

.stepper-steps { display: flex; justify-content: space-between; position: relative; z-index: 2; }
.step { flex: 1; text-align: center; display: flex; flex-direction: column; align-items: center;}
.step:first-child { align-items: flex-start; text-align: left; }
.step:last-child { align-items: flex-end; text-align: right; }

.step-dot-wrapper { width: 34px; height: 34px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;}
.step-dot {
  width: 14px; height: 14px;
  background: #ccc;
  border-radius: 50%;
  transition: all 0.3s;
  display: flex; align-items: center; justify-content: center; color: white; font-size: 10px;
}

.step-info { max-width: 120px; }
.step-label { margin: 0 0 3px 0; font-size: 14px; font-weight: bold; color: #777; }
.step-time { margin: 0; font-size: 11px; color: #999; }

.step.completed .step-dot { background: #3b82f6; width: 24px; height: 24px; font-size: 14px;}
.step.completed .step-label { color: black; }

.step.active .step-dot {
  background: white;
  border: 4px solid #3b82f6;
  width: 20px; height: 20px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
.step.active .step-label { color: #1F69E2; }
.step.active .step-time { color: #3b82f6; font-weight: bold; }

.loading-state { text-align: center; padding: 40px; color: white; }
.spinner {
  width: 40px; height: 40px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  margin: 0 auto 15px;
  animation: spin 1s linear infinite;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>