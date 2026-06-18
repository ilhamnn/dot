type Props = {
  value: string;
  selected: boolean;
  onClick: () => void;
};

export default function AnswerButton({ value, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-3 text-left ${
        selected ? "border-blue-500 bg-blue-50" : ""
      }`}
    >
      <span dangerouslySetInnerHTML={{ __html: value }} />
    </button>
  );
}
