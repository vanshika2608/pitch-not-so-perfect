"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [startup, setStartup] = useState<any>(null);

  const generateStartup = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
      });

      const data = await res.json();

      setStartup(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-6">
          AI Startup Generator
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95]">
          Pitch-Not-So-Perfect™
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Generate the next billion-dollar startup nobody asked for.
        </p>

        <p className="mt-3 text-sm text-white/40">
          Powered by AI, delusion, and venture capital.
        </p>

        <button
          onClick={generateStartup}
          className="mt-10 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
        >
          {loading ? "Generating..." : "Generate Startup"}
        </button>

        {startup && (
          <div className="mt-16 text-left bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">
            <div className="text-5xl font-bold tracking-tight">
              {startup.name}
            </div>

            <div className="mt-3 text-xl text-white/60">
              {startup.tagline}
            </div>

            <div className="mt-8">
              <div className="text-sm uppercase text-white/40 mb-2">
                Pitch
              </div>

              <p className="text-lg leading-relaxed text-white/80">
                {startup.pitch}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-white/5 rounded-2xl p-5">
                <div className="text-sm text-white/40 mb-2">
                  Valuation
                </div>

                <div className="text-2xl font-semibold">
                  {startup.valuation}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5">
                <div className="text-sm text-white/40 mb-2">
                  Founder Lore
                </div>

                <div className="text-white/80">
                  {startup.founder}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/5 rounded-2xl p-5 italic text-white/70">
              “{startup.investorQuote}”
            </div>
          </div>
        )}
      </div>
    </main>
  );
}