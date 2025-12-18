document.addEventListener('DOMContentLoaded', () => {
  const lights = {
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    green: document.getElementById('green')
  };

  const btn = document.getElementById('toggleBtn');
  let currentLight = 'red';
  let isAutomated = false;
  let interval = null;

  function setLight(color) {
    Object.values(lights).forEach(l => { if (l) l.classList.remove('active'); });
    if (lights[color]) lights[color].classList.add('active');
    currentLight = color;
    // Update status text
    const status = document.getElementById('statusText');
    if (status) {
      if (color === 'red') status.textContent = 'Stop';
      else if (color === 'yellow') status.textContent = 'Ready';
      else if (color === 'green') status.textContent = 'Go';
      // Add a small color accent matching the light
      status.className = 'status-text ' + color;
    }
  }

  function cycle() {
    if (currentLight === 'red') setLight('green');
    else if (currentLight === 'green') setLight('yellow');
    else setLight('red');
  }

  if (btn) {
    btn.addEventListener('click', () => {
      isAutomated = !isAutomated;
      if (isAutomated) {
        btn.innerText = 'Stop Automation';
        btn.style.background = 'rgba(239, 68, 68, 0.2)';
        interval = setInterval(cycle, 2000);
      } else {
        btn.innerText = 'Start Automation';
        btn.style.background = 'rgba(255, 255, 255, 0.1)';
        if (interval) { clearInterval(interval); interval = null; }
      }
    });
  }

  // allow clicking lights to set them manually
  Object.values(lights).forEach(l => {
    if (l) l.addEventListener('click', () => setLight(l.id));
  });

  // initial state
  setLight('red');
});
