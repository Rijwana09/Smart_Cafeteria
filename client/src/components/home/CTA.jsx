import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-900 text-white">

      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">
          Ready To Order Your Favorite Meal?
        </h2>

        <button
          onClick={() => navigate("/menu")}
          className="mt-8 bg-amber-500 px-8 py-3 rounded-xl hover:bg-amber-600"
        >
          Start Ordering
        </button>
      </div>
    </section>
  );
}

export default CTA;
