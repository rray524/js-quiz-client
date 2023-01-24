import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ResultTable = () => {
    const [myData, setMyData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/result")
            .then((response) => setMyData(response.data))
            .catch((error) => console.log(error))
    }, []);
    // console.log('result table loaded')

    return (
        <>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attemps</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        myData.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v.username}</td>
                                <td>{v.attempts}</td>
                                <td>{v.points}</td>
                                <td>{v.achieved}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

        </>
    );
};

export default ResultTable;