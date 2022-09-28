FROM denoland/deno:alpine
WORKDIR /app
COPY deps.ts /app
RUN deno cache deps.ts
COPY . /app
EXPOSE 5000
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "app.ts"]