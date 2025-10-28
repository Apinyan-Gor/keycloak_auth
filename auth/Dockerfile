FROM node:25.0.0
WORKDIR /app
# ARG для build-time (передаются из .env через args ниже)
ARG DATABASE_URL
ARG DIRECT_URL
# ENV делает ARG доступными как env vars в RUN (необязательно, но для Prisma ок)
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
COPY ./app .
# RUN npm run clean
RUN npm install
# Install curl for healthchecks (Debian-based node image)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*


ARG NODE_ENV=development

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev; fi