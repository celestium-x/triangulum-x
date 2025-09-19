package jobs

import (
	"encoding/json"
	"log"
)

type PhaseTransitionJob struct {
	GameSessionId string `json:"gameSessionId"`
	QuestionId    string `json:"questionId"`
	QuestionIndex string `json:"questionIndex"`
	FromPhase     string `json:"fromPhase"`
	ToPhase       string `json:"toPhase"`
	ExecuteAt     string `json:"executeAt"`
}

func ParsePhaseTransitionJob(raw string) (*PhaseTransitionJob, error) {
	var job PhaseTransitionJob
	if err := json.Unmarshal([]byte(raw), &job); err != nil {
		return nil, err
	}
	return &job, nil
}

func ProcessPhaseTransitionJob(job *PhaseTransitionJob) {
	log.Printf("⚡ Processing job: %+v", job)
}