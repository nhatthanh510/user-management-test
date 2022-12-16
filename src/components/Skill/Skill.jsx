import React from "react";
import { TiDelete } from "react-icons/ti";

const Skill = ({ name, level, onRemoveSkill }) => {
  return (
    <div className="flex gap-4 mt-2 items-center capitalize">
      {name}{" "}
      <span className="h-6 block border border-gray-700 w-full">
        <span
          className="block text-sm font-normal leading-6 text-white text-center h-6 bg-gray-700"
          style={{ width: level + "%" }}
        >
          {level}%
        </span>
      </span>
      <button onClick={() => onRemoveSkill(name)}>
        <TiDelete className="text-3xl " />
      </button>
    </div>
  );
};

export default Skill;
