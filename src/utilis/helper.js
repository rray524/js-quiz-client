import axios from "axios";


export function attempt_nums(result) {
    const res = result.filter(r => r !== null);
    return res.length;
}

export function earnPointsNum(result, answers) {
    const res = result.map((element, i) => answers[i] === element);
    return res.filter(e => e === true).map(i => 10).reduce((prev, curr) => prev + curr, 0)
}

export function flagPoint(earnPoints, totalPoints) {
    return (totalPoints * 50) / 100 < earnPoints
}
export const saveResult = async (username, result, attempt, earnPoints, flag) => {
    await axios.post("https://js-quiz-backend.onrender.com/api/result", {
        username, result, attempts: attempt, points: earnPoints, achieved: flag ? "Passed" : "Failed"
    });

}


