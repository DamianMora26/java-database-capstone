function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  const pathname = window.location.pathname;
  const isRoot = pathname.endsWith("/") || pathname.endsWith("index.html");
  let logoPath = isRoot ? "./assets/images/logo/logo.png" : "../assets/images/logo/logo.png";

  footer.innerHTML = `
    <footer class="footer" style="background-color: #f1f5f9; padding: 25px 40px; margin-top: auto; border-top: 1px solid #e2e8f0;">
      <div class="footer-container" style="display: flex; justify-content: space-between; align-items: flex-start; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 20px;">
        <div class="footer-logo" style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${logoPath}" alt="Hospital CMS Logo" style="height: 30px;">
            <strong style="color: #015c5d; font-size: 18px;">Hospital CMS</strong>
          </div>
          <p style="font-size: 13px; color: #64748b;">© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
        </div>
        <div class="footer-links" style="display: flex; gap: 50px;">
          <div class="footer-column" style="display: flex; flex-direction: column; gap: 6px;">
            <h4 style="color: #1e293b; margin-bottom: 5px;">Company</h4>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">About</a>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Careers</a>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Press</a>
          </div>
          <div class="footer-column" style="display: flex; flex-direction: column; gap: 6px;">
            <h4 style="color: #1e293b; margin-bottom: 5px;">Support</h4>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Account</a>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Help Center</a>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Contact Us</a>
          </div>
          <div class="footer-column" style="display: flex; flex-direction: column; gap: 6px;">
            <h4 style="color: #1e293b; margin-bottom: 5px;">Legals</h4>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Terms & Conditions</a>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Privacy Policy</a>
            <a href="#" style="text-decoration: none; color: #64748b; font-size: 14px;">Licensing</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

window.renderFooter = renderFooter;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderFooter);
} else {
  renderFooter();
}
