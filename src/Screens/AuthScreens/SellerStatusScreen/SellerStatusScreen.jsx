import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clockIcon from '../../../assets/clock.gif'
import useRefreshTokens from "../../../Components/Hooks/useRefreshTokens";


function SellerStatusScreen() {
  useRefreshTokens();

  const [steps, setSteps] = useState([]);
  const [rejected, setRejected] = useState(false);
  const [rejected_reason, setRejectedReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerStatus = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/authentication/check_seller_status",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSteps(response.data.progress_steps);
        setRejected(response.data.is_rejected);
        setRejectedReason(response.data.rejection_reason);
      } catch (error) {
        console.error("Error fetching seller status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerStatus();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!steps || steps.length === 0) {
    return <div className="text-center">No status data available.</div>;
  }

  return (
    <section className={`flex flex-col items-center ${rejected ? "justify-center" : "justify-start"} w-full h-screen`}>
      {rejected ? (
        <>
          <h1 className="text-2xl font-semibold text-primary tracking-wider font-product">Your Seller Application Has Been Rejected</h1>
          <hr className="w-64 mt-4 border-2 border-primary" />
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mt-4 font-product text-xl font-semibold tracking-wider text-primary">- Reason -</p>
            <hr className="border border-gray-300 w-3/4 my-3" />
            <p className="font-product text-xl font-semibold tracking-wider text-primary">{rejected_reason}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-between items-center py-4 w-full">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center w-1/4 ${
                  index === steps.length - 1 ? "border-r-0" : "border-r border-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-primary text-secondary"
                      : "bg-transparent border-2 border-primary text-primary"
                  }`}
                >
                  {step.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      className="text-secondary"
                    >
                      <path
                        d="M5 14L8.5 17.5L19 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <p className="text-sm text-primary mt-3">{step.description}</p>
              </div>
            ))}
          </div>

          {steps.find((step) => !step.completed) && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {(() => {
                const firstIncompleteStep = steps.find((step) => !step.completed);
                switch (firstIncompleteStep.id) {
                  case 2:
                    return (
                      <div className="flex flex-col items-center justify-center relative">
                        <p className="mt-4 text-2xl text-primary font-semibold">
                          Your Store Needs You To Be Ready
                        </p>
                        <Link
                          to="/store-details"
                          className="px-8 py-4 mt-8 border-2 border-primary text-primary hover:bg-primary hover:text-secondary"
                        >
                          Enter Store Details
                        </Link>
                      </div>
                    );
                  case 3:
                    return (
                      <div className="flex flex-col items-center justify-center relative">
                        <p className="mt-4 text-2xl text-primary font-semibold">
                          Your Store Needs Verification
                        </p>
                        <Link
                          to="/store-id-details"
                          className="px-8 py-4 mt-8 border-2 border-primary text-primary hover:bg-primary hover:text-secondary"
                        >
                          Verify Now
                        </Link>
                      </div>
                    );
                  case 4:
                    return (
                      <div className="w-full flex flex-col items-center justify-center relative">
                        <p className="mt-4 text-2xl text-primary font-semibold text-center">
                          Your Seller Application Is Being Reviewed
                        </p>
                        <img className="w-96 h-96 absolute opacity-10" src={clockIcon} alt="loading...." />
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SellerStatusScreen;
