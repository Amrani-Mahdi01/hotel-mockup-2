"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      <span className="data-label block text-white/50">Letters from the house</span>
      <p className="mt-3 max-w-[30ch] text-[1.0625rem] leading-[1.7] text-white/75">
        Twice a year we write about the season, the table, and when the sea is
        warmest. No more often than that.
      </p>

      <div className="mt-6 flex items-center border-b border-white/25 transition-colors duration-300 focus-within:border-white">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-transparent py-3 text-[1.0625rem] text-white outline-none placeholder:text-white/35"
        />
        <button
          type="submit"
          aria-label="Sign up for letters"
          className="group shrink-0 px-2 py-3 text-white"
        >
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,0.72,0.16,1)] group-hover:translate-x-1.5"
          >
            →
          </span>
        </button>
      </div>

      <p aria-live="polite" className="data-label mt-4 h-4 text-sky-200">
        {sent ? "Thank you — we'll write in the spring." : ""}
      </p>
    </form>
  );
}
