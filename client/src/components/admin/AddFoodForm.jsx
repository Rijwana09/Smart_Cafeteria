import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { createFood, uploadFoodImage } from "../../services/adminService";

const CATEGORIES = ["Burger", "Pizza", "Biryani", "Drinks", "Snacks", "Dessert"];

function AddFoodForm({ onCreated }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: CATEGORIES[0],
    price: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please choose an image for the food item.");
      return;
    }

    try {
      setSaving(true);

      const { imageUrl } = await uploadFoodImage(imageFile, user.token);

      await createFood(
        {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          image: imageUrl,
        },
        user.token
      );

      toast.success("Food item added.");

      setForm({
        name: "",
        description: "",
        category: CATEGORIES[0],
        price: "",
        stock: "",
      });
      setImageFile(null);
      setPreview(null);

      onCreated?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add food item"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold">Add Food Item</h2>

      <input
        name="name"
        placeholder="Food name"
        required
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        required
        rows={3}
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Price (₹)"
          required
          value={form.price}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="stock"
          type="number"
          min="0"
          placeholder="Initial stock"
          required
          value={form.stock}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-2">
          Image
        </label>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 h-32 w-32 object-cover rounded-lg"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600"
      >
        {saving ? "Adding..." : "Add Food Item"}
      </button>
    </form>
  );
}

export default AddFoodForm;
