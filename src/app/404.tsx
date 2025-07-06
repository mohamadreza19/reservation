// app/404.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
  const searchParams = useSearchParams();

  return (
    <div>
      404 - Page not found
      {/* <p>Query: {searchParams.get("foo")}</p> */}
    </div>
  );
}
