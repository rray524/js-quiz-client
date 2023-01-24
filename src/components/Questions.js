import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQuestion } from '../hooks/fetchQuestion';
import { updateResultAction } from '../redux/result_reducer';


const Questions = ({ onCheck }) => {
    const [checked, setChecked] = useState(undefined);
    const questions = useSelector(state => state.questions.queue[state.questions.trace]);
    const trace = useSelector(state => state.questions.trace);
    const result = useSelector(state => state.result.result);
    const dispatch = useDispatch();
    // const allQuestion = useSelector(state => state.questions);
    // console.log(checked);

    const [{ isLoading, data, serverError }] = useFetchQuestion();


    const onSelect = (i) => {
        onCheck(i);
        setChecked(i);
    }
    // console.log('question component loaded...')


    useEffect(() => {
        // console.log({ trace, checked })
        dispatch(updateResultAction({ trace, checked }))
    }, [checked])

    if (isLoading) return <h3 className='text-light'>isLoading</h3>
    if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i}>
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                            />

                            <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${result[trace] === i ? "checked" : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Questions;