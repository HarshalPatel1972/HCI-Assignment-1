const fs = require('fs');
const { execSync } = require('child_process');

try {
  require.resolve('marked');
} catch (e) {
  console.log('Installing marked...');
  execSync('npm install marked', { stdio: 'inherit' });
}

const { marked } = require('marked');

const md = fs.readFileSync('Report.md', 'utf8');

// Render markdown to HTML
let htmlContent = marked.parse(md);

// Replace relative image paths with absolute paths so Edge can render them correctly
htmlContent = htmlContent.replace(/src="([^"]+)"/g, (match, p1) => {
    if (!p1.startsWith('http') && !p1.startsWith('data:') && !p1.startsWith('file:')) {
        return `src="file:///${__dirname.replace(/\\/g, '/')}/${p1}"`;
    }
    return match;
});

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  :root {
      --primary: #1e293b;
      --secondary: #334155;
      --accent: #3b82f6;
      --bg-color: #f8fafc;
      --surface: #ffffff;
      --text: #334155;
  }
  body { 
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
      line-height: 1.7; 
      padding: 20px 40px; 
      color: var(--text);
      background-color: var(--bg-color);
      margin: 0;
  }
  .report-container {
      max-width: 900px;
      margin: 0 auto;
      background-color: var(--surface);
      padding: 50px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }
  .header-card {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 40px;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
  }
  .header-card h1 { color: white; margin-top: 0; border: none; font-size: 28px; }
  .student-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; font-size: 15px; }
  .student-details p { margin: 5px 0; opacity: 0.9; }
  
  h1, h2, h3 { color: var(--primary); }
  h2 { border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 40px; }
  h3 { color: var(--secondary); margin-top: 25px; }
  
  img { 
      max-width: 100%; 
      border: 1px solid #e2e8f0; 
      border-radius: 8px; 
      margin: 25px 0; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.08); 
      display: block;
  }
  em { display: block; text-align: center; color: #64748b; font-size: 0.9em; margin-top: -15px; margin-bottom: 30px; font-style: normal; }
  
  ul { padding-left: 20px; }
  li { margin-bottom: 8px; }
  code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.9em; color: var(--accent); }
  
  .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.9em; }
</style>
</head>
<body>
    <div class="report-container">
        <div class="header-card">
            <h1>HCI Assignment 1: Smart Hospital Dashboard</h1>
            <div class="student-details">
                <div>
                    <p><strong>Name:</strong> Harshal Patel</p>
                    <p><strong>UID:</strong> 22BAI71187</p>
                </div>
                <div>
                    <p><strong>Section/Class:</strong> 22AML- 6A</p>
                    <p><strong>Course:</strong> BE-CSE-AIML / 22AML6</p>
                </div>
            </div>
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="margin: 0; font-size: 14px;">
                    <strong><span style="display:inline-block; width: 60px;">GitHub:</span></strong> 
                    <a href="https://github.com/HarshalPatel1972/HCI-Assignment-1" style="color: #93c5fd; text-decoration: none;">github.com/HarshalPatel1972/HCI-Assignment-1</a>
                </p>
                <p style="margin: 8px 0 0; font-size: 14px;">
                    <strong><span style="display:inline-block; width: 60px;">Live UI:</span></strong> 
                    <a href="https://hci-assignment-1.vercel.app" style="color: #93c5fd; text-decoration: none;">hci-assignment-1.vercel.app</a>
                </p>
            </div>
        </div>
        ${htmlContent}
        <div class="footer">End of Report • Generated Output</div>
    </div>
</body>
</html>`;

fs.writeFileSync('Report.html', html);
console.log('Report.html generated successfully.');
