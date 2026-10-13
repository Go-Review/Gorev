# GoRev

A small, responsive place-review guide. Visitors can browse, search, filter, sort, read curated reviews, and submit a star rating with a written review. Submissions go to a private Google Sheet and remain pending until you approve them.

## Customize the guide

1. Open `app.js` and edit the `places` list near the top. Each object is one place and its review. Keep each `id` unique; update the name, neighborhood, category, rating (0–5), price, visit date (`YYYY-MM-DD`), short summary, full review, best-for note, photo URL, and photo description.
2. Replace the sample neighborhood and sample reviews before publishing. Use image URLs that are publicly accessible; the sample photos are hosted by Unsplash.
3. To change the title, intro, or footer text, edit the matching text in `index.html`. Colors, type, spacing, and layout are controlled by the variables and rules at the top of `styles.css`.
4. Open `index.html` in a browser to preview. No build step or package install is needed. Review submission stays disabled until you connect the Google Sheet below.

## Connect customer reviews to Google Sheets

1. Sign in to your Google account and open [script.google.com](https://script.google.com). Create a new Apps Script project.
2. Replace the starter code with the contents of `google-apps-script/Code.gs`, save, select `setup`, and run it. Approve Google's prompts. The script creates a private spreadsheet named **GoRev Customer Reviews** in your Drive; its URL is printed in the execution log.
3. In Apps Script, choose **Deploy > New deployment > Web app**. Set **Execute as** to your account and **Who has access** to **Anyone**, then deploy and copy the web app URL ending in `/exec`.
4. Paste that URL into `GOOGLE_APPS_SCRIPT_URL` near the top of `app.js`. Publish the updated site files.
5. Submissions appear in the `Reviews` tab with status `Pending`. Read and moderate them in the sheet before adding any to the public `places` list in `app.js`.

The form does not collect email addresses. Names are optional. Since the web app accepts public submissions, keep the spreadsheet private and do not ask customers to include sensitive information in their review.

## Put it on an NFC tag

An NFC tag needs a public website address, not a file stored on your computer. Publish this folder as a static site (for example, with GitHub Pages or Netlify), open the published address on a phone, and test it. To open directly at the review form, write `https://your-site-address/#write-review` as a URL record to the NFC tag with your phone's NFC-writing app. To preselect a place, add its ID from `app.js`, for example `https://your-site-address/?place=morrow-coffee#write-review`.

## Important

Google account sign-in and deployment must be completed by you; this workspace cannot create a spreadsheet inside your Drive directly.