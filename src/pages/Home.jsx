import { useDispatch } from "react-redux";
import { logOut } from "../app/featcher/userSlice";
// import { useRegister } from "../hoks/useRegister";
// import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  // useRegister ni chaqirish
  //const { registerWithEmailAndPassword } = useRegister();

  // useEffect(() => {
  //   const data = registerWithEmailAndPassword;
  //   console.log(data);
  // }, [registerWithEmailAndPassword]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="card bg-white h-screen w-96 shadow-xl m-3">
      <figure className="px-10 pt-10">
        <img
          src={user.photoURL}
          alt="Shoes"
          className="rounded-full w-16 h-16 "
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.displayName}</h2>
        <p></p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
