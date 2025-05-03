
import { FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={28} />
          <span className="text-2xl font-bold">SkillSync</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
