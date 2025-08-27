import { DialogTitle } from "@headlessui/react";
import { Checkbox } from "../checkbox";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";

const NewLoginForm = () => {
  return (
    <>
      <div className="tw:mb-4">
        <DialogTitle className="tw:text-lg tw:!text-dark-purple tw:font-medium tw:!mb-2">
          Sign in
        </DialogTitle>
        <p className="tw:text-secondary">Enter your information</p>
      </div>
      <form>
        <fieldset className="tw:flex tw:flex-col tw:gap-2">
          <div className="tw:flex tw:flex-col">
            <label className="tw:font-medium">Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              className="input"
            />
          </div>
          <div className="tw:flex tw:flex-col tw:mb-3">
            <label className="tw:font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input"
            />
          </div>

          <div className="tw:flex tw:items-center tw:gap-2 tw:justify-between">
            <div className="tw:flex tw:gap-2 tw:items-center">
              <Checkbox className="tw:!mb-0.5" id="rememberMe" />
              <label className="tw:text-sm tw:!mb-0" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <Link className="tw:text-sm tw:!text-inherit tw:!no-underline tw:hover:!underline">
              Forgot Password
            </Link>
          </div>

          <button className="tw:!mt-3 tw:px-3 tw:py-2 tw:bg-dark-purple tw:hover:bg-dark-purple/80 tw:!text-white tw:!rounded">
            Login
          </button>

          <div className="tw:relative tw:py-3 tw:text-center tw:text-sm tw:after:absolute tw:after:inset-0 tw:after:top-1/2 tw:after:z-0 tw:after:flex tw:after:items-center tw:after:border-t tw:after:border-muted">
            <span className="tw:relative tw:z-10 tw:bg-white tw:px-2 tw:font-medium tw:text-muted-foreground tw:select-none">
              OR Continue with
            </span>
          </div>

          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4">
            <button className="tw:justify-center tw:flex tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:!rounded tw:shadow tw:border tw:border-muted">
              <FcGoogle size={20} />
              <span>Google</span>
            </button>
            <button className="tw:justify-center tw:flex tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:!rounded tw:shadow tw:border tw:border-muted">
              <FaApple size={20} />
              <span>Apple</span>
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default NewLoginForm;
