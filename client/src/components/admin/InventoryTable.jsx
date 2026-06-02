function InventoryTable() {

  const inventory = [
    {
      item: "Burger Bun",
      stock: 50,
    },
    {
      item: "Chicken",
      stock: 25,
    },
    {
      item: "Cheese",
      stock: 15,
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
        Inventory
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => (
            <tr
              key={item.item}
              className="border-t"
            >
              <td>{item.item}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;