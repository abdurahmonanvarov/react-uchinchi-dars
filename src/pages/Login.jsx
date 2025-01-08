import { Link, useActionData, Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
import { useLogin } from "../hoks/useLogin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRegisterWithGoogle } from "../hoks/useRegisterWithGoogle";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};
function Login() {
  const { siginInWithGoogle } = useRegisterWithGoogle();
  const { isPending } = useSelector((state) => state.user);
  const { loginInWithEmailAndPassword } = useLogin();
  const malumot = useActionData();

  useEffect(() => {
    if (malumot) {
      if (!malumot.email) {
        toast.warn("Iltimos emailni to'g'ri kiriting");
      }
      if (!malumot.password) {
        toast.warn("Iltimos parolni to'g'ti kiriting");
      }
      loginInWithEmailAndPassword(malumot.email, malumot.password);
    }
  }, [malumot]);
  return (
    <div className="h-screen grid place-items-center w-full bg-white">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h1 className="text-4xl mb-5 text-center font-bold">Login</h1>

        <FormInput type="email" placeholder="Enter your email" name="email" />

        <FormInput
          type="password"
          placeholder="Enter your password"
          name="password"
        />

        <div className="my-5">
          {!isPending && (
            <button type="submit" className="btn btn-primary btn-block mb-3">
              Login
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
            If you have not account, Register{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
