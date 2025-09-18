# Use Node.js LTS version
FROM node:20-bullseye-slim

WORKDIR /app

# Copy workspace configuration
COPY package.json yarn.lock turbo.json ./

# Copy only the server app and required packages
COPY apps/server/ ./apps/server/
COPY packages/ ./packages/

# Create a minimal workspace just for server dependencies
RUN echo '{"name": "server-docker", "private": true, "workspaces": ["apps/server", "packages/*"]}' > package.json

# Install dependencies
RUN yarn --frozen-lockfile

# Build the server app
WORKDIR /app/apps/server
RUN yarn build

# Expose port
EXPOSE 8080

# Start the app
CMD ["yarn", "start"]