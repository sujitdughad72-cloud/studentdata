# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot backend using Maven
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app
COPY curd/pom.xml ./
COPY curd/src ./src
# Copy compiled frontend into Spring Boot static resources
COPY --from=frontend-builder /app/frontend/dist/ ./src/main/resources/static/
RUN mvn clean package -DskipTests

# Stage 3: Minimal production runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar

# Safe cloud defaults: runs in-memory so deployment succeeds immediately even before setting up external MySQL
ENV PORT=8080
ENV SPRING_DATASOURCE_URL=jdbc:h2:mem:curd;MODE=MySQL;DB_CLOSE_DELAY=-1;DATABASE_TO_LOWER=TRUE
ENV SPRING_DATASOURCE_DRIVER=org.h2.Driver
ENV SPRING_DATASOURCE_USERNAME=sa
ENV SPRING_DATASOURCE_PASSWORD=

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
