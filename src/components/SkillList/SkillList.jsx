import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import localForage from "localforage";
import Skill from "src/components/Skill";

const SkillList = () => {
  const { username } = useParams();
  const [listSkill, setListSkill] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    localForage.getItem(username).then((skills) => {
      setListSkill(skills || []);
    });
  }, [username]);

  useEffect(() => {
    if (!username) {
      navigate("/users/defaultUser");
    }
  }, [username, navigate]);

  const handleAddSkill = async () => {
    if (!skillName) {
      alert("Skill name is required");
      return;
    }
    const addingSkill = {
      name: skillName,
      level: skillLevel,
    };

    const updatedListSkill = [...listSkill, addingSkill];
    setListSkill(updatedListSkill);
    updateStorageData(updatedListSkill);
  };
  const onSkillInputChange = (e) => {
    const name = e.target.value;
    setSkillName(name);
  };

  const onSkillLevelChange = (e) => {
    const level = e.target.value;
    setSkillLevel(level);
  };

  const onRemoveSkill = async (name) => {
    const updatedListSkill = listSkill.filter((skill) => {
      return skill.name !== name;
    });

    setListSkill(updatedListSkill);
    updateStorageData(updatedListSkill);
  };

  const updateStorageData = async (updatedListSkill) => {
    await localForage.setItem(username, updatedListSkill);
  };

  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="flex gap-2 items-center w-1/2">
          <label htmlFor="skill">Skill:</label>
          <input
            onChange={onSkillInputChange}
            value={skillName}
            type="text"
            id="skill"
            className="w-full border border-gray-400 bg-transparent rounded-sm py-2 px-3 text-sm text-black font-normal outline-none focus:border-gray-800"
          />
        </div>
        <div className="flex gap-2 items-center w-1/2">
          <label htmlFor="level">Level:</label>
          <select
            onChange={onSkillLevelChange}
            value={skillLevel}
            name="level"
            id="level"
            className="w-full border border-gray-400 bg-transparent rounded-sm py-2 px-3 text-sm text-black font-normal outline-none focus:border-gray-800"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </div>
        <button
          type="button"
          className="py-2 px-6 text-sm rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleAddSkill}
        >
          Add
        </button>
      </div>
      <div>
        {listSkill.map((skill, index) => (
          <Skill key={index} onRemoveSkill={onRemoveSkill} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;
