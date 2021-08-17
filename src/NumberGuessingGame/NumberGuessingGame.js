import React, { useState } from 'react';

function NumberGuessingGame(){

    const minimun_range_number = 1;
    const maximum_range_number = 10;
    const maximum_attempts_allowed = 3;

    const randomNumFunc = () => {
        return Math.floor(Math.random() * (maximum_range_number-minimun_range_number +1) + 1)
    }

    const [num,numUpdate] = useState(0);
    const [randomNum,randomNumUpdate] = useState(randomNumFunc());
    const [attempt,updateAttempt] = useState(1);
    const [win,updateWin] = useState(0);
    const [attemptRecordData, updateAttemptRecordData] = useState([]);

    const numCheck = (event) =>{
        if(num >=minimun_range_number && num <=maximum_range_number){
            if(attempt <= maximum_attempts_allowed){
                updateAttempt(attempt + 1);
                updateAttemptRecordData([...attemptRecordData,num]);
                if(Number(num) === randomNum){
                    updateWin(1);
                }
            }
            else{
                updateAttempt(1);
            }
        }
        else{
            alert("Please enter number in given range");
        }
        event.preventDefault();
        resetInput();
    }

    const resetInput = () => {
        document.getElementById("Number-Form").reset();
    }

    const restartFun = () => {
        numUpdate(0);
        updateAttempt(1);
        randomNumUpdate(randomNumFunc());
        updateWin(0);
        updateAttemptRecordData([]);
    }

    return(
        <div>
            <h1>Number Guessing Game</h1>
            <h3>Two Simple Rules : <p>1. You have to guess the number from 1 to 10(both 1 and 10 are included)</p>
                                   <p>2. You have only three attempts to guess</p>
            </h3>
            <h4>Good Luck !</h4>
            <form id="Number-Form" onSubmit={(event) =>numCheck(event)}>
                <input hidden={attempt>maximum_attempts_allowed || win===1 ? true : false} type="number" onChange={(event)=>numUpdate(event.target.value)} placeholder="Guess the Number" required={true}/>
                <input hidden={attempt>maximum_attempts_allowed || win===1 ? true : false} type="submit" value="Submit" />
                <input hidden={attempt>maximum_attempts_allowed || win===1 ? true : false} type="reset" value="Cancel" />
                {!win ? (attempt === maximum_attempts_allowed + 1 ? <div><p>Sorry,You lost</p><p>The number is {randomNum}</p></div> : 
                                                            <div>
                                                                {attempt >=2 ? <p style={{color : "red"}}>Try Again</p> : null}
                                                                <p style={{color : "blue"}}>Attempt Number : {attempt}</p>
                                                                <p style={{color : "blue"}}>Attempts Left : {4-attempt}</p>
                                                            </div>
                        )
                    : <div><p>Wohooo ! You Won</p><p>The Actual Number is {randomNum}</p></div>
                }
            </form>
            <h3 hidden={attempt === minimun_range_number}>Attempt Record :</h3>
            {attempt >=minimun_range_number + 1 ? attemptRecordData.map((rec,item) => (
                <div style={{color : "gray"}} key={item + minimun_range_number}><p>Attempt Number = {item + minimun_range_number}, Your Number = {rec}</p></div>
            )): null} 
            <button onClick={() => restartFun()}>Restart</button> 
        </div>
    );
}

export default NumberGuessingGame;