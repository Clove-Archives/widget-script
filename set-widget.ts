import "dotenv/config";

// ----------------------------- CONFIG: EDIT ME -----------------------------
// Put these in a .env file (see .env.example) or paste them here.
const TOKEN = process.env.DISCORD_TOKEN ?? "";          // bot token
const APP_ID = process.env.DISCORD_APPLICATION_ID ?? ""; // your application id
const USER_ID = process.env.DISCORD_USER_ID ?? "";       // user whose profile to set

// Field types accepted by the widget editor.
type WidgetField =
  | { type: 1 | 2; name: string; value: string | number } // 1 = string, 2 = number
  | { type: 3; name: string; value: { url: string } };     // 3 = media

const str = (name: string, value: string | number): WidgetField => ({ type: 1, name, value });
const num = (name: string, value: number): WidgetField => ({ type: 2, name, value });
const media = (name: string, url: string): WidgetField => ({ type: 3, name, value: { url } });

// The values to display. Each `name` must match a Data Field in your widget config.
const USERNAME = "Demo User";
const FIELDS: WidgetField[] = [
  str("title", "Hello from my widget!"),
  str("subtitle", "Powered by widgets v2"),
  num("count", 42),
  // media("avatar", "https://example.com/pic.png"),
];
// ---------------------------------------------------------------------------

const DRY_RUN = process.argv.includes("--dry-run");

function fail(msg: string): never {
  console.error("✗ " + msg);
  process.exit(1);
}

if (!APP_ID) fail("Set DISCORD_APPLICATION_ID (in .env or in the file).");
if (!USER_ID) fail("Set DISCORD_USER_ID (in .env or in the file).");
if (!TOKEN && !DRY_RUN) fail("Set DISCORD_TOKEN (in .env or in the file).");

const url = `https://discord.com/api/v9/applications/${APP_ID}/users/${USER_ID}/identities/0/profile`;
const payload = { username: USERNAME, data: { dynamic: FIELDS } };

if (DRY_RUN) {
  console.log("PATCH " + url + "\n");
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const res = await fetch(url, {
  method: "PATCH",
  headers: {
    Authorization: `Bot ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

if (res.ok) {
  console.log(`✓ Widget set for user ${USER_ID}.`);
} else {
  const body = await res.text();
  fail(
    `Discord API ${res.status}: ${body}\n` +
      "(401/403 usually means the user hasn't authorized the app, or the app " +
      "lacks Social SDK access / the widget isn't published.)",
  );
}
