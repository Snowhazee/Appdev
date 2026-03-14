async function checkBackend() {
  try {
    const res = await fetch('/');
    const text = await res.text();
    console.log('Backend response:', text);
  } catch (err) {
    console.error('Unable to reach backend:', err);
  }
}

checkBackend();