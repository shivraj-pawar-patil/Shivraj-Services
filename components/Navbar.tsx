import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { FiSun, FiMoon } from "react-icons/fi";

type NavbarProps = {
  toggleTheme?: () => void;
  isDark?: boolean;
};

export const Navbar = ({ toggleTheme, isDark }: NavbarProps) => {
  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-none z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex items-center space-x-4">
          </div>

          <div className="flex items-center space-x-3">
            {toggleTheme && typeof isDark !== "undefined" && (
              <button onClick={toggleTheme} className="border p-2">
                {isDark ? <FiSun /> : <FiMoon />}
              </button>
            )}
            <OrganizationSwitcher hidePersonal={true} />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
};
