import LoginForm from "@/components/form/loginForm";
import PublicRoute from "@/publicRoute";
import Link from "next/link";


function LoginPage() {
  return (
    <PublicRoute>
      <section className="py-12 ">
        <div className="container">
          <div className="w-full flex  mx-auto mt-8 justify-center bg-background px-3 py-16 rounded-lg  items-center flex-col">
            <h1 className="text-xl">Sign up</h1>
            <span className="block text-gray my-3">
              Already have an account?{" "}
              <Link href={"/register"} className="text-cyan-500">
                Sign in
              </Link>
            </span>
            <div className="max-w-[500px] w-full ">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </PublicRoute>
  );
}

export default LoginPage;
