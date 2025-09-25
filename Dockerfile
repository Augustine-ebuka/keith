FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose React dev server port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
