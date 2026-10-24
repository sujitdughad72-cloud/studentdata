# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot backend
FROM eclipse-temurin:17-jdk-alpine AS backend-builder
WORKDIR /app
COPY curd/mvnw ./
COPY curd/.mvn ./.mvn
COPY curd/pom.xml ./
RUN sed -i 's/\r$//' ./mvnw && chmod +x ./mvnw
COPY curd/src ./src
# Copy compiled frontend into Spring Boot static resources
COPY --from=frontend-builder /app/frontend/dist/ ./src/main/resources/static/
RUN ./mvnw clean package -DskipTests

# Stage 3: Minimal production runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
