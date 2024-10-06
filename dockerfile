FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Create a build of your application
RUN npm run build

# Expose the application port
# EXPOSE 3000
EXPOSE ${PORT}

# Command to run your application
CMD ["npm", "run", "start"]