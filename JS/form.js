  const form = document.querySelector('.gameboy-form');
  const screen = document.getElementById('gameboyScreen');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    screen.classList.add('tv-off');

    setTimeout(() => {
      screen.innerHTML = `
        <div class="screen-inner">
          <h2>Message Sent</h2>
          <p class="screen-subtitle">Transmission complete.</p>
        </div>
      `;
      screen.classList.remove('tv-off');
    }, 700);
  });
