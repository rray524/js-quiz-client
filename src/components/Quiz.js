import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveNextAction, movePrevAction } from '../redux/question_reducer';
import { pushResultAction } from '../redux/result_reducer';
import Questions from './Questions';
import { Navigate } from "react-router-dom";


const Quiz = () => {
    const [check, setCheck] = useState(null)
    // fetch from redux state
    const { queue, trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    // console.log("result:", result);
    // console.log(trace);


    const dispatch = useDispatch();

    function onNext() {
        // console.log('On next click')
        if (trace < queue.length) {
            // increase trace value
            dispatch(moveNextAction())
            // only dispatch when result length is less than or equal to trace value
            if (result.length <= trace) {
                dispatch(pushResultAction(check))
            }
        }
        setCheck(null);

    }

    function onPrev() {
        // console.log('On onPrev click')
        if (trace > 0) {
            dispatch(movePrevAction())
        }
    }
    // finding data from child components
    function onCheck(i) {
        setCheck(i);
    }
    // show result component 
    if (result.length > 0 && result.length === queue.length) {
        return <Navigate to="/result" replace={true} />
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            {/* display questions */}
            <Questions onCheck={onCheck} />
            <div className='grid'>
                {
                    (trace > 0) ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>
                }
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    );
};

export default Quiz;