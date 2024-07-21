import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-thirdColor
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image 
              src="/images/logo.png"
              alt="ChromoChat"
              width={48}
              height={48}
              className="mx-auto w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondColor">
              Sign in to your account
          </h2>
      </div>
      <AuthForm />
    </div>
  );
}

export default Auth;
  