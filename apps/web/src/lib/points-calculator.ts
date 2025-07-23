// 


export default class PointsCalculator {
    private base_points: number;
    private point_multiplier: number;
    private no_of_question: number

    constructor(no_of_question: number, base_points: number = 100) {
        this.base_points = base_points;
        this.point_multiplier = 1.2;
        this.no_of_question = no_of_question;
    }

    // public calculate_point_multiplier(): number[] {
    //     let points: number[];
    //     let current_question_idx = 1;

    //     while (current_question_idx <= this.no_of_question) {

    //         if (current_question_idx === 1) {
    //             let current_question_points = this.base_points * this.point_multiplier
    //             points.push
    //         }
    //     }
    // }
}