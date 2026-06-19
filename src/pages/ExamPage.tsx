import { useMemo, useState, useEffect } from "react";
import { useExam } from "../hooks/UseExams";
import { useTimer } from "../hooks/UseTimer";
import AnswerButton from "../components/AnswerButton";

const STORAGE_KEY = "exam_state";

export default function ExamPage() {
  const {
    questions,
    current,
    setCurrent,
    answers,
    selectAnswer,
    resetExam,
    loading,
  } = useExam();

  const [result, setResult] = useState<any>(null);

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const finishExam = () => {
    let correct = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.correct_answer) {
        correct++;
      }
    });

    const wrong = questions.length - correct;
    const score = (correct / questions.length) * 100;

    setResult({ correct, wrong, score });

    localStorage.removeItem(STORAGE_KEY);
  };

  const { time } = useTimer(3600, finishExam);

  const question = questions?.[current];

  const options = useMemo(() => {
    if (!question) return [];

    return [question.correct_answer, ...question.incorrect_answers].sort(
      () => Math.random() - 0.5,
    );
  }, [question]);

  const restartExam = () => {
    setResult(null);
    resetExam();
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    if (!questions.length) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        questions,
        current,
        answers,
        time,
      }),
    );
  }, [questions, current, answers, time]);

  if (loading) return <div>Loading...</div>;
  if (!questions.length) return <div>No questions</div>;
  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow text-center space-y-6">
          <h1 className="text-2xl font-bold">Hasil Ujian</h1>

          <div className="space-y-2 text-gray-700">
            <p>Benar: {result.correct}</p>
            <p>Salah: {result.wrong}</p>
            <p className="font-semibold">Score: {result.score.toFixed(2)}</p>
          </div>

          <button
            onClick={restartExam}
            className="w-full rounded-lg bg-black py-2 text-white font-medium"
          >
            Ulang Ujian
          </button>
        </div>
      </div>
    );
  }

  if (!question) return <div>Loading question...</div>;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-4">
      <div className="flex justify-between">
        <div>
          Soal {current + 1} / {questions.length}
        </div>

        <div>{formatTime(time)}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-8 h-8 border rounded ${
              answers[i] ? "bg-green-200" : "bg-gray-100"
            } ${current === i ? "border-blue-500" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <h2
        className="text-xl font-semibold"
        dangerouslySetInnerHTML={{
          __html: question.question,
        }}
      />

      <div className="space-y-3">
        {options.map((opt) => (
          <AnswerButton
            key={opt}
            value={opt}
            selected={answers[current] === opt}
            onClick={() => {
              selectAnswer(opt);
              if (current < questions.length - 1) {
                setCurrent((c: number) => c + 1);
              }
            }}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrent((c: number) => c - 1)}
          disabled={current === 0}
        >
          Prev
        </button>

        {current === questions.length - 1 ? (
          <button onClick={finishExam}>Finish</button>
        ) : (
          <button onClick={() => setCurrent((c: number) => c + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
