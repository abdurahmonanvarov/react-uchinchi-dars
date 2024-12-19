import { Link, useActionData, Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
import { useLogin } from "../hoks/useLogin";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};
function Login() {
  const { loginInWithEmailAndPassword } = useLogin();
  const data = useActionData();

  useEffect(() => {
    if (data) {
      if (!data.email) {
        toast.warn("Iltimos emailni to'g'ri kiriting");
      }
      if (!data.password) {
        toast.warn("Iltimos parolni to'g'ti kiriting");
      }
      loginInWithEmailAndPassword(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h1 className="text-4xl mb-5 text-center font-bold">Login</h1>

        <FormInput type="email" placeholder="Enter your email" name="email" />

        <FormInput
          type="password"
          placeholder="Enter your password"
          name="password"
        />

        <div className="my-5">
          <button type="submit" className="btn btn-primary btn-block">
            Login
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
