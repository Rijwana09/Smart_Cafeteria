import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/adminService";

const ROLES = ["customer", "staff", "admin"];

function UserTable() {
  const { user: currentAdmin } = useAuth();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers(currentAdmin.token);

      setUsers(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoleChange = async (targetUser, newRole) => {
    try {
      await updateUserRole(targetUser._id, newRole, currentAdmin.token);

      toast.success(`${targetUser.name}'s role updated to ${newRole}`);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === targetUser._id ? { ...u, role: newRole } : u
        )
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update role"
      );
    }
  };

  const handleDelete = async (targetUser) => {
    if (
      !window.confirm(
        `Remove ${targetUser.name} (${targetUser.email})? This can't be undone.`
      )
    ) {
      return;
    }

    try {
      await deleteUser(targetUser._id, currentAdmin.token);

      toast.success("User removed");

      setUsers((prev) => prev.filter((u) => u._id !== targetUser._id));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  };

  return (
    <div
      className="
      bg-white
      p-6
      rounded-2xl
      shadow-lg
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Manage Users
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const isSelf = u._id === currentAdmin._id;

                return (
                  <tr key={u._id} className="border-t">
                    <td className="p-2">
                      {u.name}
                      {isSelf && (
                        <span className="text-xs text-gray-400 ml-2">
                          (you)
                        </span>
                      )}
                    </td>

                    <td className="p-2">{u.email}</td>

                    <td className="p-2">
                      <select
                        value={u.role}
                        disabled={isSelf}
                        onChange={(e) =>
                          handleRoleChange(u, e.target.value)
                        }
                        className="border rounded px-2 py-1 capitalize disabled:opacity-50"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-2">
                      <button
                        disabled={isSelf}
                        onClick={() => handleDelete(u)}
                        className="
                        bg-red-500
                        text-white
                        px-3
                        py-1.5
                        rounded-lg
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        "
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserTable;
