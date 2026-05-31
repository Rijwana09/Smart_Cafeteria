function Testimonials() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="shadow p-6 rounded-xl">
            Excellent food and fast service.
          </div>

          <div className="shadow p-6 rounded-xl">
            Easy ordering experience.
          </div>

          <div className="shadow p-6 rounded-xl">
            Best cafeteria app.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;