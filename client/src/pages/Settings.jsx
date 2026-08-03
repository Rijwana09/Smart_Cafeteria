import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import AccountSettings from "../components/dashboard/AccountSettings";

function Settings() {
  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      p-6
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-4
        gap-8
        "
      >
        <DashboardSidebar />

        <div className="lg:col-span-3">
          <AccountSettings />
        </div>
      </div>
    </div>
  );
}

export default Settings;
