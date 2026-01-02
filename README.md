<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Compliflow Issue Tracking System</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; text-align: center; border-radius: 0 0 20px 20px; box-shadow: 0 10px 30px rgba(102,126,234,0.3); animation: slideDown 1s ease-out; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-50px); } to { opacity: 1; transform: translateY(0); } }
h1 { font-size: 2.8rem; margin-bottom: 1rem; }
h2, h3 { color: #667eea; margin: 2rem 0 1rem; }
.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.glow-btn { background: rgba(255,255,255,0.9); color: #667eea; border: none; padding: 15px 30px; font-size: 1.1rem; font-weight: bold; border-radius: 50px; cursor: pointer; margin: 0 15px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 5px 15px rgba(0,0,0,0.2); position: relative; overflow: hidden; }
.glow-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transition: left 0.5s; }
.glow-btn:hover::before { left: 100%; }
.glow-btn:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 15px 35px rgba(102,126,234,0.4); }
.glow-btn:active { transform: translateY(-1px); }
.collapsible { background: linear-gradient(145deg, #ffffff, #e6e6e6); border: none; width: 100%; padding: 1.5rem; text-align: left; font-size: 1.2rem; font-weight: 600; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin: 1rem 0; }
.collapsible:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(102,126,234,0.3); }
.content { max-height: 0; overflow: hidden; transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); padding: 0 1.5rem; }
.content.show { max-height: 800px; padding: 1.5rem; }
ul { list-style: none; padding-left: 0; }
ul li { padding: 0.8rem 0; border-bottom: 1px solid #eee; position: relative; padding-left: 2rem; }
ul li::before { content: '✨'; position: absolute; left: 0; color: #667eea; font-weight: bold; }
code { background: #667eea20; padding: 0.2rem 0.5rem; border-radius: 5px; font-family: 'Courier New', monospace; color: #667eea; }
svg { width: 100%; height: 350px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); animation: float 6s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
.license { background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 2rem; text-align: center; border-radius: 12px; margin-top: 2rem; animation: bounceIn 1s; }
@keyframes bounceIn { 0% { opacity: 0; transform: scale(0.8); } 60% { opacity: 1; transform: scale(1.05); } 100% { transform: scale(1); } }
@media (max-width: 768px) { .glow-btn { margin: 10px 0; display: block; } h1 { font-size: 2rem; } }
</style>
</head>
<body>
<div class="container">
<div class="hero">
<h1>🛠️ Compliflow Issue Tracking System</h1>
<p>A modern, secure <strong>MERN stack</strong> application for tracking complaints and issues with real-time filtering and user management.<span style="font-size:0.8rem;display:block;margin-top:0.5rem;">Built with React 18, Node.js, MongoDB, Tailwind CSS & Framer Motion</span></p>
<button class="glow-btn" onclick="scrollTo('features')">🚀 Explore Features</button>
<button class="glow-btn" onclick="scrollTo('quickstart')">⚡ Quick Start</button>
<button class="glow-btn" onclick="scrollTo('architecture')">📐 Architecture</button>
</div>

<section id="features">
<h2>✨ Key Features</h2>
<button class="collapsible" onclick="toggleContent('features-list')">Click to reveal amazing features →</button>
<div id="features-list" class="content">
<ul>
<li>🔐 <strong>Secure Authentication</strong>: JWT-based login/registration with rate limiting</li>
<li>📝 <strong>Issue Management</strong>: Create, update, delete, and track issues with ownership controls</li>
<li>🔍 <strong>Smart Filtering</strong>: Filter by status, priority, category with real-time search</li>
<li>🎨 <strong>Modern UI</strong>: Responsive design with dark/light mode and smooth animations</li>
<li>🛡️ <strong>Enterprise Security</strong>: Input validation, CORS protection, security headers</li>
<li>📱 <strong>Mobile Ready</strong>: Fully responsive across all devices</li>
</ul>
</div>
</section>

<section id="userflow">
<h2>📊 User Flow Chart</h2>
<svg viewBox="0 0 900 300" preserveAspectRatio="xMidYMid meet">
<defs>
<marker id="arrowhead" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
<path d="M0,0 L0,10 L12,5 z" fill="#667eea"/>
</marker>
<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#667eea;stop-opacity:1"/>
<stop offset="100%" style="stop-color:#764ba2;stop-opacity:1"/>
</linearGradient>
</defs>
<!-- Nodes -->
<rect x="20" y="30" width="150" height="60" rx="15" fill="url(#grad1)" stroke="white" stroke-width="3"/>
<text x="95" y="55" text-anchor="middle" fill="white" font-size="14" font-weight="bold">1. Register/Login</text>
<text x="95" y="72" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="11">Create account or sign in</text>

<rect x="220" y="30" width="150" height="60" rx="15" fill="#4ecdc4" stroke="white" stroke-width="3"/>
<text x="295" y="55" text-anchor="middle" fill="white" font-size="14" font-weight="bold">2. Create Issues</text>
<text x="295" y="72" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="11">Add complaints w/ priority</text>

<rect x="420" y="30" width="150" height="60" rx="15" fill="#ffe66d" stroke="#f4b400" stroke-width="3"/>
<text x="495" y="55" text-anchor="middle" fill="#333" font-size="14" font-weight="bold">3. Manage/Filter</text>
<text x="495" y="72" text-anchor="middle" fill="#555" font-size="11">Update status & search</text>

<rect x="620" y="30" width="150" height="60" rx="15" fill="#ff6b6b" stroke="white" stroke-width="3"/>
<text x="695" y="55" text-anchor="middle" fill="white" font-size="14" font-weight="bold">4. Track Progress</text>
<text x="695" y="72" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="11">Monitor resolutions</text>

<!-- Arrows with animation -->
<line x1="170" y1="60" x2="220" y2="60" stroke="#667eea" stroke-width="4" marker-end="url(#arrowhead)">
<animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite"/>
</line>
<line x1="370" y1="60" x2="420" y2="60" stroke="#4ecdc4" stroke-width="4" marker-end="url(#arrowhead)">
<animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
</line>
<line x1="570" y1="60" x2="620" y2="60" stroke="#f4b400" stroke-width="4" marker-end="url(#arrowhead)">
<animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" begin="1s"/>
</line>
</svg>
<p style="text-align:center;margin-top:1rem;color:#666;">Interactive user journey with animated progress flow[file:1]</p>
</section>

<section id="quickstart">
<h2>⚡ Quick Start</h2>
<button class="collapsible" onclick="toggleContent('setup')">🚀 Setup in 3 minutes</button>
<div id="setup" class="content">
<div style="background:#f8f9fa;padding:1.5rem;border-radius:8px;margin:1rem 0;">
<strong>Prerequisites:</strong> Node.js 16+, MongoDB Atlas account[file:1]
</div>
<ol style="background:white;padding:1.5rem;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.08);">
<li><code>git clone repository-url && cd compliflow</code></li>
<li><strong>Backend:</strong> <code>cd backend && npm install && cp .env.example .env</code><br>Edit .env → <code>npm run dev</code></li>
<li><strong>Frontend:</strong> <code>cd ../frontend && npm install && npm run dev</code></li>
</ol>
<button class="glow-btn" style="width:100%;margin-top:1rem;" onclick="toggleContent('env')">📋 View .env Config</button>
<div id="env" class="content" style="margin-top:1rem;">
<strong>Backend .env:</strong><br>
<code>MONGODB_URI=mongodb+srv://.../compliflow</code><br>
<code>JWT_SECRET=your-super-secure-jwt-secret-key</code><br>
<strong>Frontend .env:</strong><br>
<code>VITE_API_BASE_URL=http://localhost:5000/api</code>[file:1]
</div>
</div>

<button class="collapsible" onclick="toggleContent('techstack')">🛠️ Tech Stack</button>
<div id="techstack" class="content">
<table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
<thead><tr style="background:#667eea;color:white;"><th>Frontend</th><th>Backend</th></tr></thead>
<tbody>
<tr><td>React 18 + Vite</td><td>Node.js + Express</td></tr>
<tr><td>Tailwind CSS</td><td>MongoDB + Mongoose</td></tr>
<tr><td>React Query</td><td>JWT + Security Middleware</td></tr>
<tr><td>Framer Motion</td><td>Helmet.js + Rate Limiting</td></tr>
</tbody>
</table>[file:1]
</div>
</section>

<section id="architecture">
<h2>🏗️ Architecture & Structure</h2>
<a href="#project-structure" class="glow-btn" style="display:block;text-align:center;margin:1rem 0;">🔗 Jump to Project Structure</a>
<div id="project-structure" style="background:#f8f9fa;padding:2rem;border-radius:12px;">
<h3>📁 Project Structure</h3>
<pre style="background:black;color:#00ff00;padding:1.5rem;border-radius:8px;font-size:0.9rem;overflow-x:auto;">
compliflow/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # DB schemas
│   │   ├── routes/          # API endpoints
│   │   └── middleware/      # Auth & validation
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── features/        # Auth & Issues modules
│   │   └── services/        # API layer
└── .env.example[file:1]
</pre>
</div>
</section>

<div class="license">
<h2 style="margin-bottom:1rem;">📄 License</h2>
<p><strong>FREE License</strong> - Use, modify, distribute freely. No restrictions.[file:1]</p>
<button class="glow-btn" onclick="scrollTo('top')" style="margin-top:1rem;">⬆️ Back to Top</button>
</div>
</div>

<script>
function scrollTo(id) {
const el = id === 'top' ? document.querySelector('.hero') : document.getElementById(id);
el.scrollIntoView({ behavior: 'smooth' });
}
function toggleContent(id) {
const content = document.getElementById(id);
content.classList.toggle('show');
const btn = event.target;
btn.textContent = content.classList.contains('show') ? '▲ Collapse' : btn.innerHTML.replace('▲ Collapse', 'Click to reveal →');
if (content.classList.contains('show')) {
content.style.animation = 'slideDown 0.5s ease-out';
}
}
document.querySelectorAll('.collapsible').forEach(btn => {
btn.addEventListener('click', function() { toggleContent(this.nextElementSibling.id); });
});
// Auto-expand first section
setTimeout(() => toggleContent('features-list'), 500);
</script>
</body>
</html>
