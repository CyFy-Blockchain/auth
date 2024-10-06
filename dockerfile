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

# Set default environment variables
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=auth_db
ENV DB_PORT=5432
ENV PORT=3000

# Create a build of your application
RUN npm run build

# Expose the application port
# EXPOSE 3000
EXPOSE ${PORT}

# Command to run your application
CMD ["npm", "run", "start"]