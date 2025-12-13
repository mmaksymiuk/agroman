#!/usr/bin/env sh
set -eu

# Generate runtime env.js for SPA
ENV_FILE="/usr/share/nginx/html/env.js"
API_BASE_URL=${API_BASE_URL:-"http://localhost:8080/api"}

cat > "$ENV_FILE" <<EOF
window.__ENV = {
  API_BASE_URL: '${API_BASE_URL}'
};
EOF

echo "[entrypoint] Wrote $ENV_FILE with API_BASE_URL=${API_BASE_URL}"
