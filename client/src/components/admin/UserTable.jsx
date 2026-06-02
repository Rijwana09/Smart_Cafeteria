function UserTable() {

  const users = [
    {
      name: "Rijwana",
      role: "Customer",
    },
    {
      name: "Rahul",
      role: "Staff",
    },
    {
      name: "Admin",
      role: "Admin",
    },
  ];

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
        Users
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.name}
              className="border-t"
            >
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;