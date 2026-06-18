type QuestionProgressProps = {
  currentQuestion: number;
  totalQuestions: number;
};

export default function QuestionProgress({
  currentQuestion,
  totalQuestions,
}: QuestionProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Soal {currentQuestion}</span>
        <span>{totalQuestions} Soal</span>
      </div>

      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
