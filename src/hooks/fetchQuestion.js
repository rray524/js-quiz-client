import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// import dataInfo, { answers } from "../databases/data"
import { startExamAction } from "../redux/question_reducer";


/** custom hooks for fetching data */

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false, data: [], serverError: null
    })

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));
        // console.log(answers);
        (async () => {
            try {

                // console.log(question);
                const datas = await axios.get("http://localhost:8000/api/questions");
                // console.log(datas.data);
                let question = datas?.data[0].questions;
                let answers = datas?.data[0].answers;
                // console.log(question, answers);
                if (question.length > 0) {
                    setGetData(prev => ({
                        ...prev, isLoading: false
                    }));
                    setGetData(prev => ({
                        ...prev, data: question
                    }))
                    /** dispatch an action */
                    dispatch(startExamAction({ question, answers }))
                }
                else {
                    throw new Error("No data available")
                }

            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error }))
            }
        })();
    }, [dispatch]);
    return [getData, setGetData];
}