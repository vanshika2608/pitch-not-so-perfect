import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `
Generate a ridiculous but believable Silicon Valley startup.

Return in EXACTLY this format:

NAME:
TAGLINE:
PITCH:
VALUATION:
FOUNDER:
INVESTOR_QUOTE:

Make it absurd, funny, and full of startup buzzwords.
`,
            },
          ],
          temperature: 1.2,
        }),
      }
    );

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));


    const content = data.choices[0].message.content;

const getSection = (label: string, nextLabel?: string) => {
  const start = content.indexOf(`${label}:`);

  if (start === -1) return "";

  const from = start + label.length + 1;

  const end = nextLabel
    ? content.indexOf(`${nextLabel}:`, from)
    : content.length;

  return content.slice(from, end).trim();
};

const sections = {
  name: getSection("NAME", "TAGLINE"),
  tagline: getSection("TAGLINE", "PITCH"),
  pitch: getSection("PITCH", "VALUATION"),
  valuation: getSection("VALUATION", "FOUNDER"),
  founder: getSection("FOUNDER", "INVESTOR_QUOTE"),
  investorQuote: getSection("INVESTOR_QUOTE"),
};

console.log(sections);

return NextResponse.json(sections);


  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "generation failed" },
      { status: 500 }
    );
  }
}