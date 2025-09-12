import AddFormContainer from "@/features/officer/cms/question/addFormContainer";
import JoinCommunityFormTable from "@/features/officer/cms/question/question-table/JoinCommunityFormTable";

const Questions = () => {
  return (
    <div className="text-text dark:text-text-inverted flex flex-col gap-4">
      <AddFormContainer/>
      <JoinCommunityFormTable/>
    </div>
  )
}

export default Questions;
