import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Define a function that will be called when timeRemaining reaches 0
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // Time is up
          setTimeRemaining(10); // Reset timer
          onAnswered(false); // Notify that the answer is incorrect
        } else {
          // Decrease time remaining
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup function to clear the timeout when component unmounts or timer resets
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]); // Dependency array to rerun effect when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is selected
    onAnswered(isCorrect); // Notify parent of the answer
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
