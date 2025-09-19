package main

import (
	"log"

	jobs "github.com/celestium-x/triangulum-x/internal/processor"
	client "github.com/celestium-x/triangulum-x/internal/queue"
)

func main() {
	rdb := client.NewRedisClient()
	queueKey := "phase_transition"

	for {
		job, err := rdb.BRPop(client.Ctx, 0, queueKey).Result()
		if err != nil {
			log.Printf("Error popping job :( %v", err)
			continue
		}
		if len(job) < 2 {
			continue
		}
		raw := job[1]
		parsedJob, err := jobs.ParsePhaseTransitionJob(raw)
		if err != nil {
			log.Printf("Failed to parse the job %v", err)
		}
		jobs.ProcessPhaseTransitionJob(parsedJob)
	}
}
