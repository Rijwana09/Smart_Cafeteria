import { useAuth } from "../../context/AuthContext";

function ProfileCard() {
  const { user } = useAuth();

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
          w-16
          h-16
          rounded-full
          bg-amber-500
          flex
          items-center
          justify-center
          text-white
          text-2xl
          font-bold
          "
        >
          {user?.name?.charAt(0)}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500">
            {user?.email}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProfileCard;
