"use client"

import BodyWithGeneratingHandler from "@/components/body/bodyWithGeneratingHandler";
import ProtectedRoute from "@/protectedRoute";

function HomePage() {


  return (
    <ProtectedRoute >
      <div
        role="presentation"
        className="h-full relative w-full flex flex-col overflow-hidden"
      >
        <BodyWithGeneratingHandler  />
      </div>
    </ProtectedRoute>
  );
}

export default HomePage;
