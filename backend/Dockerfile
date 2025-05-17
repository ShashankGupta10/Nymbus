FROM golang:1.22-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main ./cmd



FROM node:22.15.0-alpine

RUN npm install -g pnpm
RUN apk add --no-cache curl unzip bash
RUN apk add --no-cache curl unzip
RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /app
COPY --from=builder /app/main .

ENV PORT=8080
EXPOSE $PORT

CMD ["./main"]