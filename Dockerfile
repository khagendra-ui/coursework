# Use official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to optimize cache layer
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other project files
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Command to run your app
CMD ["node", "server.js"]
