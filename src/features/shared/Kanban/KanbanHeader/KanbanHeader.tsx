export const KanbanHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row gap-4 text-2xl">
      <button></button>
      <h1>{title}</h1>
    </div>
  );
};

export default KanbanHeader;
