import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AddFoodForm from "../components/admin/AddFoodForm";
import InventoryTable from "../components/admin/InventoryTable";

function AdminMenu() {
  // Bumping this key remounts InventoryTable so it refetches after a
  // new food item is added.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
        <AdminSidebar />

        <div className="lg:col-span-3 space-y-8">
          <h1 className="text-4xl font-bold">Manage Menu</h1>

          <AddFoodForm
            onCreated={() => setRefreshKey((k) => k + 1)}
          />

          <InventoryTable key={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
