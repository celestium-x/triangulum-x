package jobs

import (
	"encoding/json"
	"log"

	"github.com/redis/go-redis/v9"
)

type PhaseTransitionJob struct {
	GameSessionId string `json:"gameSessionId"`
	QuestionId    string `json:"questionId"`
	QuestionIndex int `json:"questionIndex"`
	FromPhase     string `json:"fromPhase"`
	ToPhase       string `json:"toPhase"`
	ExecuteAt     int64 `json:"executeAt"`
}

func ParsePhaseTransitionJob(raw string) (*PhaseTransitionJob, error) {
	var job PhaseTransitionJob
	if err := json.Unmarshal([]byte(raw), &job); err != nil {
		return nil, err
	}
	return &job, nil
}

func ProcessPhaseTransitionJob(job *PhaseTransitionJob, rdb *redis.Client) {
	log.Printf("⚡ Processing job: %+v", job)
}
