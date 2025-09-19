package client

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

func NewRedisClient() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "docker.host.internal:6379",
		Password: "",
		DB:       0,
	})

	_, err := rdb.Ping(Ctx).Result()

	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
	log.Println("REdis connected :) ")
	return rdb
}
