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

  // PDF Content Modal functionality
  const pdfContentModal = new bootstrap.Modal(document.getElementById('pdfContentModal'));
  const pdfContent = document.getElementById('pdfContent');
  const pdfLoading = document.getElementById('pdfLoading');
  const pdfFileName = document.getElementById('pdfFileName');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');

  // Sample PDF content data (in a real app, this would come from your backend)
  const pdfContentData = {
    'Desktop_Feedback_Issues.pdf': {
      title: 'Desktop Feedback Issues Report',
      content: `
        <h1>Desktop Feedback Issues Report</h1>
        <p><strong>Date:</strong> January 15, 2024</p>
        <p><strong>Report ID:</strong> DFI-2024-001</p>
        
        <h2>Executive Summary</h2>
        <p>This report outlines the key feedback issues identified in our desktop application during the Q4 2023 user testing phase. The analysis covers user experience, performance metrics, and recommended improvements.</p>
        
        <h2>Key Findings</h2>
        <ul>
          <li><strong>Navigation Issues:</strong> 45% of users reported difficulty finding specific features</li>
          <li><strong>Performance:</strong> Average load time increased by 2.3 seconds compared to previous version</li>
          <li><strong>UI/UX:</strong> 67% of users found the interface intuitive and user-friendly</li>
          <li><strong>Mobile Responsiveness:</strong> 23% of users experienced issues on smaller screens</li>
        </ul>
        
        <h2>Detailed Analysis</h2>
        
        <h3>1. Navigation Problems</h3>
        <p>The most common complaint was related to navigation structure. Users found it difficult to locate advanced features that were buried in sub-menus. The search functionality was praised but needs improvement in result relevance.</p>
        
        <blockquote>
          "I love the search feature, but sometimes it shows too many irrelevant results. It would be great if it could learn from my previous searches." - User Feedback #1247
        </blockquote>
        
        <h3>2. Performance Issues</h3>
        <p>Performance degradation was noted in several areas:</p>
        <ul>
          <li>Initial application startup time increased by 40%</li>
          <li>File upload operations took 3-5 seconds longer</li>
          <li>Real-time collaboration features experienced occasional lag</li>
        </ul>
        
        <h3>3. User Interface Feedback</h3>
        <p>Positive feedback was received regarding the overall design aesthetic, but several specific improvements were suggested:</p>
        
        <table>
          <thead>
            <tr>
              <th>UI Element</th>
              <th>Positive Feedback</th>
              <th>Negative Feedback</th>
              <th>Improvement Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Color Scheme</td>
              <td>85%</td>
              <td>15%</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>Button Placement</td>
              <td>72%</td>
              <td>28%</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Typography</td>
              <td>91%</td>
              <td>9%</td>
              <td>Low</td>
            </tr>
            <tr>
              <td>Icon Usage</td>
              <td>78%</td>
              <td>22%</td>
              <td>Medium</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Recommendations</h2>
        <ol>
          <li><strong>Implement Smart Search:</strong> Add machine learning capabilities to improve search result relevance</li>
          <li><strong>Optimize Performance:</strong> Focus on reducing startup time and improving file upload speeds</li>
          <li><strong>Enhance Mobile Experience:</strong> Prioritize mobile responsiveness improvements</li>
          <li><strong>Simplify Navigation:</strong> Restructure menu hierarchy to reduce clicks needed for common actions</li>
          <li><strong>Add User Onboarding:</strong> Create interactive tutorials for new users</li>
        </ol>
        
        <h2>Next Steps</h2>
        <p>The development team should prioritize these issues based on user impact and implementation complexity. A follow-up user testing session is recommended after implementing the high-priority improvements.</p>
        
        <p><em>Report generated by: User Experience Team<br>
        Contact: ux-team@company.com</em></p>
      `
    }
  };

  // Function to show PDF content
  function showPdfContent(fileName) {
    const data = pdfContentData[fileName];
    if (!data) {
      // Show error message if no data found
      pdfContent.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
          <h3 class="mt-3">Content Not Available</h3>
          <p class="text-muted">The content for "${fileName}" is not currently available.</p>
        </div>
      `;
      pdfContent.classList.add('show');
      pdfLoading.style.display = 'none';
      return;
    }

    // Update modal title
    pdfFileName.textContent = data.title || fileName;
    
    // Show loading initially
    pdfContent.classList.remove('show');
    pdfLoading.style.display = 'block';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      pdfContent.innerHTML = data.content;
      pdfContent.classList.add('show');
      pdfLoading.style.display = 'none';
    }, 800);
  }

  // Add click event listeners to all content buttons
  document.addEventListener('DOMContentLoaded', () => {
    const contentButtons = document.querySelectorAll('.table-content-btn');
    
    contentButtons.forEach(button => {
      // Get the filename from the table row
      const fileName = button.closest('tr').querySelector('td:first-child').textContent;
      
      // Click event
      button.addEventListener('click', (e) => {
        e.preventDefault();
        showPdfContent(fileName);
        pdfContentModal.show();
      });
      
      // Hover event (optional - shows a tooltip)
      button.addEventListener('mouseenter', () => {
        button.title = `Click to view content of ${fileName}`;
      });
    });
  });

  // Handle download button click
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      const currentFileName = pdfFileName.textContent;
      // In a real application, this would trigger a download
      alert(`Download functionality for "${currentFileName}" would be implemented here.`);
    });
  }

  // Reset modal content when modal is hidden
  document.getElementById('pdfContentModal').addEventListener('hidden.bs.modal', () => {
    pdfContent.classList.remove('show');
    pdfLoading.style.display = 'block';
    pdfContent.innerHTML = '';
  });
})();


