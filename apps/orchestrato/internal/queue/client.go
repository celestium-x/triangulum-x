package client

import (
	"context"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

func NewRedisClient() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     Getenv("REDIS_ADDR", ""),
		Password: Getenv("REDIS_PASSWORD", ""),
		DB:       0,
	})

	_, err := rdb.Ping(Ctx).Result()

	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
	log.Println("Redis connected :) ")
	return rdb
}

func Publish(rdb *redis.Client, channel string, message string) {
	rdb.Publish(Ctx, channel, message)
}

func Getenv(key string, fallback string) string {
	if val := os.Getenv("REDIS_ADDR"); val != "" {
		return val
	}
	return fallback
}
