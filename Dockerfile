# 1. Official Microsoft Playwright image (includes Node, browsers, and Linux OS libraries)
FROM mcr.microsoft.com/playwright:v1.64.1-jammy
# 2. Set directory inside container
WORKDIR /app
# 3. Copy package files first
COPY package*.json ./
# 4. Install dependencies inside container
RUN npm ci
# 5. Copy the rest of the project
COPY . .
# 6. Default command to run tests
CMD ["npx", "playwright", "test"]