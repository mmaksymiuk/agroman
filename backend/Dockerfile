# Build stage
FROM gradle:9.2.1-jdk25-alpine AS build
WORKDIR /workspace

COPY build.gradle.kts settings.gradle.kts ./
COPY src src

RUN gradle --no-daemon clean bootJar

# Run stage
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /workspace/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
