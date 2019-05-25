# Base image
FROM node:alpine

# copy files from local repository to docker repo
COPY .\ .\ 

# Run npm install and install dep in docker
RUN npm install

#run 
CMD ["npm", "start"]


# Don't forget to enable port while deploying app

