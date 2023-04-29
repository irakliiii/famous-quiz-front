import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({ type: "answer", showStart: true });

export const AppContextProvider = ({children}) => {
  const data = JSON.parse(localStorage.getItem('data'));
  
  const [type, setType] = useState(data?.type ?? "answers");
  const [showStart, setShowStart] = useState(data?.showStart ?? true);
  const [questions, setQuestions] = useState(data?.questions ?? []);
  const [quizData, setQuizData] = useState(data?.quizData ?? []);
  const [currentQuestion, setCurrentQuestion] = useState(data?.currentQuestion ?? null);
  const [isQuizFinished, setIsQuizFinished] = useState(data?.isQuizFinished ?? false);
  const [startTime, setStartTime] = useState(data?.time ?? null);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({
        type, showStart, questions, quizData, currentQuestion, isQuizFinished
    }));
  }, [type, showStart, questions, quizData, currentQuestion, isQuizFinished]);

  return (
    <AppContext.Provider value={{ type, setType, showStart, setShowStart, questions, setQuestions, currentQuestion, setCurrentQuestion, quizData, setQuizData, isQuizFinished, setIsQuizFinished, startTime, setStartTime }}>
      {children}
    </AppContext.Provider>
  );
};
