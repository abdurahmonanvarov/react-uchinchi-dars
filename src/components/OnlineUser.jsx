import { useCollection } from "../hoks/useCollection";

function OnlineUser() {
  const { datam } = useCollection("users");

  return (
    <div className="bg-slate-300 w-[300px] p-10">
      <ul>
        {datam &&
          datam.map((info) => {
            return (
              <li key={info.id} className="flex gap-3 items-center mb-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={info.photoURL}
                  alt=""
                />
                <div className="flex flex-col">
                  <p>{info.displayName}</p>
                  <p>{info.online ? "online" : "offline"}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUser;
