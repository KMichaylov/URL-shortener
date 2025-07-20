FROM openjdk:21-jdk-alpine

WORKDIR /app

COPY target/url-shortener.jar /app/url-shortener.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/url-shortener.jar"]

ENTRYPOINT ["java", "-jar", "/app.jar"]

