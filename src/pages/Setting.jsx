import { useCollection } from "../hoks/useCollection";

function Setting() {
  const { datam } = useCollection("users");
  console.log(datam);

  // Faqat birinchi foydalanuvchini tanlash
  const singleUser = datam ? datam[0] : null;

  return (
    <div>
      {singleUser && (
        <div className="flex flex-col items-center justify-center bg-gray-100">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{singleUser.displayName}</h1>

          {/* Upper Section */}
          <div className="relative bg-pink-200 w-full h-52 rounded-lg flex items-center justify-center mb-40">
            {/* Circle */}
            <img
              src={singleUser.photoURL}
              alt="User Avatar"
              className="absolute top-20 w-48 h-48 bg-pink-300 rounded-full border border-gray-300"
            />
          </div>

          {/* Input fields */}
          <div className="flex justify-between gap-7 mt-6">
            <input
              placeholder={singleUser.displayName}
              className="w-64 h-10 text-black p-5 rounded-md"
            />
            <input
              placeholder={singleUser.id}
              className="w-64 h-10 text-black p-5 rounded-md"
            />
          </div>

          {/* Save Button */}
          <button className="btn mt-6 block w-96 h-14 text-white font-bold rounded-md">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default Setting;
