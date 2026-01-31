#!/bin/bash
# Preview script for TarsOnArk site testing

# Start local server if not running
if ! pgrep -f "python3.*http.server.*8888" > /dev/null; then
    echo "Starting local server on port 8888..."
    cd ~/projects/tarsonark.github.io
    python3 -m http.server 8888 > /dev/null 2>&1 &
    sleep 2
fi

# Take screenshot with Playwright
echo "Capturing screenshot..."
env -i HOME=$HOME PATH=/usr/bin:/bin USER=$USER bash -c "cd ~/.local && node - <<'EOF'
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:8888');
  await page.screenshot({ path: '/tmp/tarsonark-preview.png', fullPage: true });
  await browser.close();
  console.log('✅ Screenshot: /tmp/tarsonark-preview.png');
})();
EOF
"

echo "Preview complete!"
