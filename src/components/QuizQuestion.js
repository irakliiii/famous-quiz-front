import { Alert, Button, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../helpers/axios";

export const QuizQuestion = ({
  question,
  quizId,
  setCurrentQuestion,
  setShowStart,
  isQuizFinished,
  setIsQuizFinished,
  startTime
}) => {
  const [answer, setAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [success, setSuccess] = useState(null);
  const [score, setScore] = useState(null);
  const [unanswered, setUnanswered] = useState(null);
  const [time, setTime] = useState(new Date() - startTime);

  let interval = useRef(); 
  useEffect(() => { interval.current = setInterval(() => setTime(new Date() - startTime), 1000); return () => clearInterval(interval.current)}, [])
  useEffect(() => {
    if (parseInt(time / 1000) >= 5 * 60) {
      axiosInstance
      .post("quiz/" + quizId + "/finish").then((data) => {
        clearInterval(interval.current);
        setSuccess(parseInt((data.correct / data.answered) * 100));
        setScore(data.correct);
        setUnanswered(10 - data.answered);
        nav("/stats", { state: { success, score, unanswered } })
        setIsQuizFinished(true);
      })
    }
  }, [time])
  const handleAnswer = (id) => {
    axiosInstance
      .post("quiz/" + quizId + "/" + question.id + "/answer", { answer: id })
      .then(({ data }) => {
        if (data.isQuizFinished) {
          setSuccess(parseInt((data.correct / data.answered) * 100));
          setScore(data.correct);
          setIsQuizFinished(true);
          clearInterval(interval.current);
        }
        setAnswer(parseInt(id));
        setCorrectAnswer(data.correctAnswer);
      })
      .catch(() => nextQuestion());
  };

  const nextQuestion = () => {
    setCurrentQuestion((currentQuestion) => ++currentQuestion);
  };
  const nav = useNavigate();

  return (
    <div>
      {parseInt(time / 1000 / 60) + ":" + parseInt(time / 1000 % 60)}
      <Paper className="paper">
        <div className="question">{question.question}</div>
        <div className="answers">
          {correctAnswer == null &&
            !isQuizFinished &&
            question.answers.map((item) => (
              <Button
                variant="contained"
                onClick={() => handleAnswer(item.id)}
                value={item.id}
                key={item.id}
              >
                {item.answer}
              </Button>
            ))}
        </div>
        <div>
          {correctAnswer != null && answer === correctAnswer && (
            <Alert>
              Correct! the right answer is:{" "}
              {
                question.answers.find((item) => item.id === correctAnswer)
                  ?.answer
              }
            </Alert>
          )}{" "}
          {correctAnswer != null && answer !== correctAnswer && (
            <Alert color="error">
              Sorry, you are wrong! The right answer is:{" "}
              {
                question.answers.find((item) => item.id === correctAnswer)
                  ?.answer
              }
            </Alert>
          )}
        </div>
        <div className="next-question">
          {correctAnswer != null && !isQuizFinished && (
            <Button variant="contained" onClick={nextQuestion}>
              next question
            </Button>
          )}
          {isQuizFinished && (
            <Button
              variant="contained"
              onClick={() => {
                setShowStart(true);
                nav("/stats", { state: { success, score, unanswered } });
              }}
            >
              finish
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
};
