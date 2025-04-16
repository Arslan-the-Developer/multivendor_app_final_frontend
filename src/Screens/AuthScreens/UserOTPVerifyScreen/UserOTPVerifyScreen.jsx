import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios";

function UserOTPVerifyScreen() {
  const navigate = useNavigate();
  const [OTPVerifyError, setOTPVerifyError] = useState("");
  const inputRefs = useRef([]); // To store references to all the input fields

  async function handleOTPVerify(e) {
    e.preventDefault();

    // Collecting all the OTP inputs into a single string
    const otp = inputRefs.current.map((input) => input.value).join("");

    try {
      const verification_token = localStorage.getItem("verification_token");

      const data = {
        "verification_token" : verification_token,
        "otp" : otp,
      };

      // Make the verification request
      const response = await api.post(`/authentication/user_otp_verify`, data);

      console.log("OTP Verification Successful:", response.data);

      localStorage.removeItem("verification_token");
      localStorage.setItem('store_date', response.data["store_date"]);
      localStorage.setItem('store_time', response.data["store_time"]);

      navigate("/");
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response ? error.response.data : error.message
      );
      setOTPVerifyError("Invalid OTP. Please try again.");
    }
  }

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus(); // Move to the next input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus(); // Move to the previous input
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleOTPVerify}
        className="shadow-md flex flex-col items-center justify-center border-2 border-primary p-4 bg-white relative"
        style={{ width: "25rem" }}
      >
        {OTPVerifyError && (
          <p
            id="login_err"
            className="py-2 bg-red-500 text-center text-white -top-14 w-full absolute"
          >
            {OTPVerifyError}
          </p>
        )}

        <h1 className="text-2xl font-monty mb-6 text-primary">Verify OTP</h1>

        <div className="w-full flex items-center justify-around">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)} // Assign refs dynamically
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              className="border-2 border-primary w-14 h-14 focus:outline-none text-xl text-primary text-center"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-5 py-3 bg-primary text-secondary transition outline-none"
        >
          Verify
        </button>
      </form>
    </section>
  );
}

export default UserOTPVerifyScreen;
