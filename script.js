/* ===== VIEW-FIRST PDF LOGIC ===== */
document.querySelectorAll('.year-block').forEach(block => {
  const iframe = block.querySelector('.pdf-viewer iframe');
  const downloadBtn = block.querySelector('.pdf-download a');

  iframe.addEventListener('load', () => {
    downloadBtn.classList.add('enabled');
  });
});

/* ===== ANSWERS TOGGLE LOGIC ===== */
document.querySelectorAll('.year-block').forEach(block => {
  const btn = block.querySelector('.show-answers');
  const answers = block.querySelector('.answers-viewer');
  if (!btn || !answers) return;

  btn.addEventListener('click', () => {
    const isHidden = answers.hasAttribute('hidden');
    answers.toggleAttribute('hidden');
    btn.textContent = isHidden ? 'Hide Answers' : 'Show Answers';
  });
});

/* ===== SEARCH / FILTER BY YEAR ===== */
const searchInput = document.getElementById('yearSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll('.year-block').forEach(block => {
      const title = block.querySelector('h2').textContent.toLowerCase();
      block.style.display = title.includes(value) ? 'block' : 'none';
    });
  });
}

/* ===== BACK TO TOP BUTTON ===== */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backToTopBtn.style.display = 'block';
  else backToTopBtn.style.display = 'none';
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== ADMIN UPLOAD (FILESTACK) ===== */
const uploadBtn = document.getElementById('uploadAdminBtn');
const logoutBtn = document.getElementById('logoutAdminBtn');

let isAdmin = false; // Change to true after login logic (simple demo)

if (isAdmin && uploadBtn && logoutBtn) {
  uploadBtn.style.display = 'block';
  logoutBtn.style.display = 'block';

  const client = filestack.init('AfJtcERVSWKy85qASuvobz');

  uploadBtn.addEventListener('click', () => {
    client.picker({
      fromSources: ['local_file_system', 'url', 'googledrive', 'dropbox'],
      onUploadDone: res => {
        alert('Upload successful! File URL: ' + res.filesUploaded[0].url);
      }
    }).open();
  });

  logoutBtn.addEventListener('click', () => {
    isAdmin = false;
    uploadBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
    alert('Logged out from admin mode.');
  });
}