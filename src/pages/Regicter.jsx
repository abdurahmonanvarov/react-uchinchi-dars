import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hoks/useRegister";
import { useSelector } from "react-redux";
import { validateSignupOrLoginData } from "../utiles";

export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");
  return { email, password, displayName, confirmPassword };
};
import { useRegisterWithGoogle } from "../hoks/useRegisterWithGoogle";

//abdurahmon28255@gmail.com

function Register() {
  const { siginInWithGoogle } = useRegisterWithGoogle();
  const { isPending } = useSelector((state) => state.user);
  const { registerWithEmailAndPassword } = useRegister();
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const data = useActionData();
  useEffect(() => {
    if (data) {
      const { valid, errors } = validateSignupOrLoginData(data, true);
      if (valid) {
        const { displayName, email, password } = data;
        registerWithEmailAndPassword(displayName, email, password);
      } else {
        setError(errors);
      }
      // if (!data.displayName) {
      //   toast.warn("Iltimos ismingizni kiriting !");
      // }
      // if (!data.email) {
      //   toast.warn("Iltimos emailni kiriting !");
      // }
      // if (!data.password) {
      //   toast.warn("Iltimos passwordni kiriting !");
      // }
      // if (data.password !== data.rePassword) {
      //   toast.warn("Iltimos iltimos passwordni bir biriga o'xshatin !");
      // }
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full bg-white">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h1 className="text-4xl mb-5 text-center font-bold">Register</h1>

        <FormInput
          type="text"
          placeholder="Enter your name"
          label="Display Name"
          name="name"
          error={error.displayName && "input-error"}
          errorText={error.displayName}
        />

        <FormInput
          type="email"
          placeholder="Enter your email"
          name="email"
          error={error.email && "input-error"}
          errorText={error.email}
        />

        <FormInput
          type="password"
          placeholder="Enter your password"
          name="password"
          error={error.password && "input-error"}
          errorText={error.password}
        />

        <FormInput
          type="password"
          placeholder="Re-enter your password"
          name="confirmPassword"
          error={error.confirmPassword && "input-error"}
          errorText={error.confirmPassword}
        />

        <div className="my-5">
          {!isPending && (
            <button type="submit" className="btn btn-primary btn-block mb-3">
              Register
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              className="btn btn-primary btn-block mb-3"
              disabled
            >
              Loading...
            </button>
          )}
          <button
            onClick={siginInWithGoogle}
            type="button"
            className="btn btn-primary btn-block"
          >
            Google
          </button>
        </div>

        <div className="text-center">
          <p>
            If you have an account,{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
