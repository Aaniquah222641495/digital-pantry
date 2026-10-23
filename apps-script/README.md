# Lead system: set-up guide (about 10 minutes)

This is the small Google script that catches every enquiry from the website form. For each one it:

1. adds a row to a Google Sheet in your account,
2. emails you an instant alert (reply to it and it goes straight to the customer),
3. sends the customer one plain confirmation email (no marketing).

It uses only free Google tools. No keys, no passwords, nothing to pay. The code is in `Code.gs` next to this file.

You do this once, signed in as **thedigitalpantryza@gmail.com**.

## Part 1: Make the Sheet and add the script

1. Go to https://sheets.google.com and click **Blank spreadsheet** (the big + button).
2. Click the title "Untitled spreadsheet" at the top left and rename it **Website Enquiries** (not "Digital Pantry Leads": that name is already the outreach Sheet).
3. In the menu bar click **Extensions** then **Apps Script**. A new tab opens with a code editor.
4. Click the title "Untitled project" at the top and rename it **Lead endpoint**.
5. In the editor you will see a file called `Code.gs` with a few lines in it. Click inside the code, press **Cmd+A** (select all) and **Delete**.
6. Open `apps-script/Code.gs` from this repo, copy everything, and paste it into the editor.
7. Click the **Save** icon (floppy disk) or press **Cmd+S**.

## Part 2: Let it run for the first time

1. At the top of the editor there is a drop-down showing a function name. Choose **setup**.
2. Click **Run**.
3. A box says **Authorization required**. Click **Review permissions** and choose your account.
4. Google shows "Google hasn't verified this app". That is normal, because you wrote it for yourself. Click **Advanced**, then **Go to Lead endpoint (unsafe)**, then **Allow**.
   - It asks for permission to see your spreadsheet and to send email as you. That is exactly what the script does and nothing else.
5. When it finishes, the log at the bottom says "Leads tab ready" and shows how many emails you have left today. Go back to the Sheet tab: there is now a **Leads** tab with pink headings.

## Part 3: Publish it as a web app

1. Top right of the editor: click **Deploy**, then **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: `Website leads`
   - Execute as: **Me (thedigitalpantryza@gmail.com)**
   - Who has access: **Anyone**
4. Click **Deploy**. (If it asks to authorise again, repeat the steps from Part 2.)
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy.../exec`. Keep it handy.
6. Check it works: paste that URL into a new browser tab. You should see `{"ok":true,"service":"Digital Pantry lead endpoint","status":"running"}`.

"Anyone" only means anyone can send an enquiry to the form, which is the point. Nobody can read your Sheet through it.

## Part 4: Optional test from inside Google

1. Back in the editor, choose **testLead** in the function drop-down and click **Run**.
2. Within a minute you should have: a new row in the **Leads** tab, an email "New lead: Test Person (Free mock-up)", and a confirmation email addressed to yourself.
3. Delete the test row if you like.

## Part 5: Connect the website (Netlify)

1. Go to https://app.netlify.com, open the Digital Pantry site.
2. **Site configuration** then **Environment variables** then **Add a variable**.
3. Key: `VITE_LEADS_ENDPOINT`. Value: the Web app URL from Part 3. Tick all deploy contexts (including **Deploy Previews**, so you can test before merging).
4. Save, then **Deploys** then **Trigger deploy** then **Clear cache and deploy site**. The variable is baked in when the site is built, so changing it needs a new deploy.
5. Open the live site (or the PR's deploy preview), go to **Contact**, and send one real test lead using your own other email. Check three things: the row in the Sheet, the alert in your inbox, and the confirmation email in the inbox you used. Send a second one from your phone to test the thank-you screen and the WhatsApp button.

If the form ever says "Let's make sure I get this", it could not reach the script and offers WhatsApp or email instead, so a visitor is never stuck.

## If Extensions > Apps Script shows "Sorry, unable to open the file"

Google has a bug when the business account is not the first account signed in to Chrome. Instead: go to https://script.google.com, click **New project**, name it **Lead endpoint**, paste `Code.gs`, and put the Sheet's ID (the part of the Sheet's URL between `/d/` and `/edit`) in `SPREADSHEET_ID` in the CONFIG block. Then carry on from Part 2. Google's permission prompt will ask for access to all your spreadsheets; the script only opens the one whose ID you entered. (This is how the live lead endpoint was set up, 2026-10-24.)

## Changing the script later

Edit the code, save, then **Deploy** then **Manage deployments** then the pencil icon, set **Version** to **New version**, and click **Deploy**. The URL stays the same, so Netlify does not need touching. (Choosing "New deployment" again would give a new URL.)

## What the script protects against

- Every field is checked again on the server, with length limits, a phone check (South African or international with a country code) and a fixed list for "interested in".
- Honeypot: a hidden field that only bots fill in. Those are silently ignored.
- The same enquiry sent twice within 10 minutes is saved once.
- One email address can send 3 enquiries an hour, and the whole form 40 an hour. Anything over that is not saved, and the visitor is offered WhatsApp or email instead.
- Lead cells are plain text, so someone typing `=SOMETHING()` into the form cannot run a formula in your Sheet.
- Emails to you are plain text. The customer's message is never put into the customer's confirmation email.

Known limit: someone could type another person's email address into the form and that person would get one polite confirmation (at most 3 an hour). That is the cost of a free, no-login form. It is a reason to keep the confirmation short and unsalesy.

## Google's limits (checked 2026-10-22)

Source: https://developers.google.com/apps-script/guides/services/quotas (page last updated 2026-09-03). For a normal @gmail.com account:

| Limit | Free Gmail account |
|---|---|
| Emails sent to recipients per day | 100 |
| Script run time per request | 6 minutes (one lead takes a few seconds) |
| Simultaneous runs | 30 per user |

Each enquiry sends 2 emails (your alert and the customer's confirmation), so you can take about **50 enquiries a day**. If the daily email limit gets low, the script keeps your alert, skips the confirmation and writes "skipped (daily email limit)" in the Auto-reply column. The Sheet row is always saved first. Google can change these numbers; check the page above if volume ever grows.

## How the website talks to the script (for developers)

- The form `fetch`es the Web app URL with `POST`, `Content-Type: text/plain;charset=utf-8` and a JSON string body. `text/plain` counts as a "simple" request, so the browser skips the CORS preflight (`OPTIONS`) request, which Apps Script cannot answer.
- Apps Script replies to the POST with a redirect to `script.googleusercontent.com`; `fetch` follows it. The site reads the JSON reply (`{"ok":true}`) when the browser is allowed to, and treats anything else (network error, timeout, `ok:false`, unreadable reply) as "not confirmed", showing the WhatsApp and email fallback. The duplicate guard makes a second send harmless.
- Google's documentation does not describe the CORS behaviour of web apps, so this is the widely used community pattern, not a documented guarantee. The end-to-end test in Part 5 is what confirms it for real. If the lead reaches the Sheet but the page still shows the fallback, the browser could not read the reply: tell the developer.
- The Content-Security-Policy in `artifacts/digital-pantry/public/_headers` allows `script.google.com` and `script.googleusercontent.com` in `connect-src`.
