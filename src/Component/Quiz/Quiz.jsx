// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import './quiz.css';
import { data } from '../../data'

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [correctAnswer, setCorrectAnswer] = useState(null); // Track correct answer

  useEffect(() => {
    if (index >= data.length) {
      setIsLastPage(true);
    }
  }, [index]);

  function nextQuestion() {
    setLock(false);
    setSelectedAnswer(null); // Reset selected answer
    setCorrectAnswer(null); // Reset correct answer

    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      setIsLastPage(true);
    }
  }

  function checkAnswer(e, ans) {
    if (!lock) {
      setSelectedAnswer(ans);
      setCorrectAnswer(data[index].ans); // Store the correct answer for comparison

      if (ans === data[index].ans) {
        setScore(score + 1);
        e.target.classList.add('correct');
      } else {
        e.target.classList.add('incorrect');
      }
      setLock(true);
    }
  }

  if (isLastPage) {
    return (
      <div className='quiz'>
        <h1>Quiz Completed</h1>
        <h2>Quiz Score: {score} / {data.length}</h2>
      </div>
    );
  }

  return (
    <div className='quiz'>
      <h1>Kod Quiz</h1>
      <h3>{data[index].question}</h3>
      <ul>
        <li
          className={selectedAnswer === '1' ? (correctAnswer === '1' ? 'correct' : 'incorrect') : ''}
          onClick={(e) => checkAnswer(e, '1')}
        >
          {data[index].option1}
        </li>
        <li
          className={selectedAnswer === '2' ? (correctAnswer === '2' ? 'correct' : 'incorrect') : ''}
          onClick={(e) => checkAnswer(e, '2')}
        >
          {data[index].option2}
        </li>
        <li
          className={selectedAnswer === '3' ? (correctAnswer === '3' ? 'correct' : 'incorrect') : ''}
          onClick={(e) => checkAnswer(e, '3')}
        >
          {data[index].option3}
        </li>
        <li
          className={selectedAnswer === '4' ? (correctAnswer === '4' ? 'correct' : 'incorrect') : ''}
          onClick={(e) => checkAnswer(e, '4')}
        >
          {data[index].option4}
        </li>
      </ul>
      <button onClick={nextQuestion} disabled={!lock}>NEXT</button>
      <div>Question: {index + 1} of {data.length}</div>
    </div>
  );
}