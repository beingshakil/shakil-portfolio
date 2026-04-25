"use client";
import Work from "../Components/Work";
import workData from "../data/work";

export default function WorkPage() {
  return (
    <div className="pt-20">
      <Work content={workData} />
    </div>
  );
}
