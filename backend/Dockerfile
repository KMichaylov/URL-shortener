FROM openjdk:21-jdk-alpine

WORKDIR /app

COPY target/url-shortener.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
