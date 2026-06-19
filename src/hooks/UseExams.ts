import { useEffect, useRef, useState } from "react";
import { getQuestions } from "../api/exam.api";

const STORAGE_KEY = "exam_state";

export function useExam() {
  const saved =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")
      : null;

  const [questions, setQuestions] = useState<any[]>(
    saved?.questions || []
  );

  const [current, setCurrent] = useState(saved?.current || 0);

  const [answers, setAnswers] = useState<Record<number, string>>(
    saved?.answers || {}
  );

  const [loading, setLoading] = useState(!saved?.questions?.length);

  const fetched = useRef(false);

  useEffect(() => {
    if (questions.length > 0) return;
    if (fetched.current) return;

    fetched.current = true;

    const load = async () => {
      try {
        setLoading(true);

        const data = await getQuestions(10);

        setQuestions(data || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const selectAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [current]: answer,
    }));
  };

  const resetExam = () => {
    setQuestions([]);
    setCurrent(0);
    setAnswers({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    questions,
    current,
    setCurrent,
    answers,
    selectAnswer,
    loading,
    resetExam,
  };
}