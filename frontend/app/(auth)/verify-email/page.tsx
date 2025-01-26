"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyPageContent() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying, please wait...");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setMessage("Invalid token");
      setTimeout(() => router.push("/dashboard"), 2000);
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.response === true) {
          setMessage("Account verified successfully");
          setTimeout(() => router.push("/dashboard"), 2000);
        } else {
          setMessage("Account verification failed");
          setTimeout(() => router.push("/"), 2000);
        }
      });
  }, [token, router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <p style={{ fontSize: "1.5rem", color: "#0070f3" }}>Loading...</p>
      ) : (
        <p style={{ fontSize: "1.5rem", color: "#0d9488" }}>{message}</p>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}
