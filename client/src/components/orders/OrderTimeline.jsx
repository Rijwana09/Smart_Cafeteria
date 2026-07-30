function OrderTimeline({
  status,
}) {

  const steps = [
    "Placed",
    "Preparing",
    "Ready",
    "Delivered",
  ];

  const current =
    steps.indexOf(status);

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Order Tracking
      </h2>

      {steps.map(
        (step, index) => (

          <div
            key={step}
            className="flex items-center mb-4"
          >

            <div
              className={`h-6 w-6 rounded-full ${
                index <= current
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />

            <span className="ml-4">
              {step}
            </span>

          </div>

        )
      )}

    </div>
  );
}

export default OrderTimeline;