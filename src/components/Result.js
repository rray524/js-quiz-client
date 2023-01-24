import React from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import '../styles/Result.css'
import { useDispatch, useSelector } from 'react-redux';
import { resetAllQuestions } from '../redux/question_reducer';
import { resetAllResult } from '../redux/result_reducer';
import { attempt_nums, earnPointsNum, flagPoint, saveResult } from '../utilis/helper';



const Result = () => {
    const dispatch = useDispatch();
    function onRestart() {
        dispatch(resetAllQuestions())
        dispatch(resetAllResult())
    }

    const result = useSelector(state => state.result.result);
    const queue = useSelector(state => state.questions.queue);
    const answers = useSelector(state => state.questions.answers);
    const username = useSelector(state => state.result.userId);

    const totalPoints = queue.length * 10;
    const attempt = attempt_nums(result);
    const earnPoints = earnPointsNum(result, answers)
    // console.log(earnPoints)
    const flag = flagPoint(earnPoints, totalPoints)
    // save result to database mongodb
    saveResult(username, result, attempt, earnPoints, flag);

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{username}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points : </span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions : </span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts : </span>
                    <span className='bold'>{attempt || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points : </span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result</span>
                    <span className='bold' style={{ color: `${flag ? "green" : "red"}` }}>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>

            <div className="start" onClick={onRestart}>
                <Link className='btn' to={'/'} >Restart</Link>
            </div>

            <div className="container">
                {/* result table */}
                <ResultTable></ResultTable>
            </div>
        </div>
    );
};

export default Result;