import { useEffect } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hoks/useRegister";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const rePassword = form.get("rePassword");
  return { email, password, displayName, rePassword };
};

function Register() {
  const { registerWithEmailAndPassword } = useRegister();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      if (!data.displayName) {
        toast.warn("Iltimos ismingizni kiriting !");
      }
      if (!data.email) {
        toast.warn("Iltimos emailni kiriting !");
      }
      if (!data.password) {
        toast.warn("Iltimos passwordni kiriting !");
      }
      if (data.password !== data.rePassword) {
        toast.warn("Iltimos iltimos passwordni bir biriga o'xshatin !");
      }
      registerWithEmailAndPassword(data.displayName, data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h1 className="text-4xl mb-5 text-center font-bold">Register</h1>

        <FormInput
          type="text"
          placeholder="Enter your name"
          label="Display Name"
          name="name"
        />

        <FormInput type="email" placeholder="Enter your email" name="email" />

        <FormInput
          type="password"
          placeholder="Enter your password"
          name="password"
        />

        <FormInput
          type="password"
          placeholder="Re-enter your password"
          name="rePassword"
        />

        <div className="my-5">
          <button type="submit" className="btn btn-primary btn-block">
            Register
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
