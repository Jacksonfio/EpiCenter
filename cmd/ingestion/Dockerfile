FROM golang:1.22-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /bin/ingestion ./cmd/ingestion

FROM alpine:3.19
RUN apk --no-cache add ca-certificates curl

WORKDIR /app
COPY --from=builder /bin/ingestion .

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost:8080/healthz || exit 1
ENTRYPOINT ["/app/ingestion"]
