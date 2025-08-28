(() => {
  const fileInput = document.getElementById('fileInput');
  const fileInput2 = document.getElementById('fileInput2');
  const contentArea = document.getElementById('contentArea');
  const addBtn = document.getElementById('btn-add');
  const questionInput = document.getElementById('question');
  const uploadArea = document.getElementById('uploadArea');
  const uploadProgress = document.getElementById('uploadProgress');

  if (fileInput && contentArea) {
    fileInput.addEventListener('change', () => {
      const files = Array.from(fileInput.files || []);
      const names = files.map(f => `• ${f.name}`).join('\n');
      contentArea.textContent = names || 'No file chosen';
    });
  }

  if (addBtn && questionInput) {
    addBtn.addEventListener('click', () => {
      const value = questionInput.value.trim();
      if (!value) return;
      const pill = document.createElement('span');
      pill.className = 'badge text-bg-light border me-2 mb-2';
      pill.textContent = value;
      contentArea.appendChild(pill);
      questionInput.value = '';
      questionInput.focus();
    });
  }

  // Support second file input and drag-drop with a faux progress bar
  function handleFiles(files) {
    const list = Array.from(files || []);
    const names = list.map(f => `• ${f.name}`).join('\n');
    if (contentArea) {
      contentArea.textContent = names || contentArea.textContent || 'No file chosen';
    }
    if (uploadProgress) {
      const bar = uploadProgress.querySelector('.progress-bar');
      uploadProgress.style.display = list.length ? '' : 'none';
      let pct = 0;
      const id = setInterval(() => {
        pct += 10;
        if (!bar) return clearInterval(id);
        bar.style.width = `${pct}%`;
        if (pct >= 100) {
          clearInterval(id);
          setTimeout(() => {
            uploadProgress.style.display = 'none';
            bar.style.width = '0%';
          }, 400);
        }
      }, 120);
    }
  }

  if (fileInput2) {
    fileInput2.addEventListener('change', () => handleFiles(fileInput2.files));
  }

  if (uploadArea) {
    ;['dragenter','dragover'].forEach(evt => uploadArea.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.add('dragover');
    }));
    ;['dragleave','drop'].forEach(evt => uploadArea.addEventListener(evt, e => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.remove('dragover');
    }));
    uploadArea.addEventListener('drop', e => {
      const dt = e.dataTransfer;
      if (dt && dt.files) handleFiles(dt.files);
    });
  }

  // Auto-show pricing modal on page load
  const pricingModal = new bootstrap.Modal(document.getElementById('pricingModal'));
  pricingModal.show();

  // Handle pricing modal button clicks
  const guestBtn = document.querySelector('#pricingModal .btn-primary:first-of-type');
  const googleBtn = document.querySelector('#pricingModal .btn-primary:last-of-type');
  
  if (guestBtn) {
    guestBtn.addEventListener('click', () => {
      pricingModal.hide();
    });
  }
  
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      // You can add Google sign-in logic here
      pricingModal.hide();
    });
  }
})();


