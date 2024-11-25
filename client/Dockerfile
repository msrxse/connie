# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app
RUN npm install

# Bundle app source including the public and src directories
COPY . /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "run", "dev"]
