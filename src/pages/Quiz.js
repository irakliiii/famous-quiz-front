import { useContext, useState } from "react";
import { axiosInstance } from "../helpers/axios";
import { AppContext } from "../context/AppContext";
import { QuizQuestion } from "../components/QuizQuestion";
import { Button } from "@mui/material";
import { Input } from "antd";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const Quiz = () => {
  const appContext = useContext(AppContext);
  const startQuiz = (e) => {
    e.preventDefault(e);
    const data = new FormData(e.target);
    axiosInstance
      .post("quiz", { ...Object.fromEntries(data), type: appContext.type })
      .then(({ data }) => {
        if (appContext.type === "answers") {
          data.questions.forEach((item) => {
            shuffleArray(item.answers);
          });
        }
        shuffleArray(data.questions);

        appContext.setShowStart(false);
        appContext.setQuestions(data.questions);
        appContext.setCurrentQuestion(0);
        appContext.setQuizData(data);
        appContext.setIsQuizFinished(false);
        appContext.setStartTime(new Date());
      });
  };

  return (
    <>
      <div className="">
        <h1>Famous Quote Quiz</h1>
        {appContext.showStart ? (
          <form onSubmit={startQuiz}>
            <Input placeholder="First Name" name="first_name" />
            <Input placeholder="Last Name" name="last_name" />
            <Input placeholder="Email" name="email" type="email" />
            <Button variant="contained" type="submit">
              start
            </Button>
          </form>
        ) : (
          <QuizQuestion
            key={appContext.questions[appContext.currentQuestion].id}
            question={appContext.questions[appContext.currentQuestion]}
            quizId={appContext.quizData.id}
            isQuizFinished={appContext.isQuizFinished}
            setIsQuizFinished={appContext.setIsQuizFinished}
            setCurrentQuestion={appContext.setCurrentQuestion}
            setShowStart={appContext.setShowStart}
            startTime={appContext.startTime}
          />
        )}
      </div>
    </>
  );
};
