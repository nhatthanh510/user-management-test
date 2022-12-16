import Users from "src/components/Users";
import SkillManagement from "src/components/SkillManagement";

const Dashboard = () => {
  return (
    <div className="flex bg-white border border-gray-700 text-black">
      <Users />
      <SkillManagement />
    </div>
  );
};

export default Dashboard;
