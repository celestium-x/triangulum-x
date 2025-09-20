package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	jobs "github.com/celestium-x/triangulum-x/internal/processor"
	client "github.com/celestium-x/triangulum-x/internal/queue"
	"github.com/redis/go-redis/v9"
)

func main() {
	rdb := client.NewRedisClient()
	delayedKey := "bull:phase-transitions:delayed"
	
	for {
		now := time.Now().UnixMilli()
		
		// Get all jobs that are ready to execute (score <= now)
		readyJobs, err := rdb.ZRangeByScore(client.Ctx, delayedKey, &redis.ZRangeBy{
			Min: "0",
			Max: fmt.Sprintf("%d", now),
		}).Result()
		
		if err != nil || len(readyJobs) == 0 {
			time.Sleep(time.Second)
			continue
		}
		
		// Process all ready jobs
		for _, jobID := range readyJobs {
			jobKey := "bull:phase-transitions:" + jobID
			
			raw, err := rdb.HGet(client.Ctx, jobKey, "data").Result()
			if err != nil {
				rdb.ZRem(client.Ctx, delayedKey, jobID)
				continue
			}
			
			data, err := jobs.ParsePhaseTransitionJob(raw)
			if err != nil {
				rdb.ZRem(client.Ctx, delayedKey, jobID)
				continue
			}
			
			log.Print("Processing ready job: ", jobID)
			jsonBytes, _ := json.Marshal(data)
			log.Print("Data: ", string(jsonBytes))
			
			jobs.ProcessPhaseTransitionJob(data, rdb)
			rdb.ZRem(client.Ctx, delayedKey, jobID)
		}
		
		time.Sleep(time.Second)
	}
}