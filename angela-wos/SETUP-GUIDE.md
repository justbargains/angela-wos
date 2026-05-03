# Angela's Weekly Operating System
## Complete Setup Guide — No Developer Experience Required

This guide takes you from zero to a fully synced app at your own URL.
Total time: approximately 20 minutes.

You will create three free accounts: GitHub, Supabase, and Vercel.
None of them require a credit card.

---

## WHAT YOU ARE BUILDING

A private web app at a URL like https://angela-wos.vercel.app
- Opens on your iPhone, iPad, laptop — fully synced
- Your weekly setup, checkboxes, and goals follow you everywhere
- Claude ritual conversations built in
- Looks and works like a real app

---

## STEP 1 — Create a GitHub account and upload the app files

GitHub is where your app code lives. Vercel will pull from it automatically.

1. Go to github.com
2. Click "Sign up" in the top right corner
3. Enter your email address and create a password
4. Choose a username (something simple like angelawos or your name)
5. Complete the verification steps they ask for
6. You will land on your GitHub dashboard

Now create a repository (this is just a folder that holds your app):

7. Click the green "New" button on the left side of the dashboard
8. In the "Repository name" field type: angela-wos
9. Leave everything else as the default (Public is fine, Vercel can see it)
10. Scroll down and click the green "Create repository" button

Now upload your app files:

11. You will see a page that says "Quick setup." Look for the link that says "uploading an existing file"
12. Click that link
13. A file upload area will appear. Drag ALL the files and folders from the angela-wos folder I gave you into this area. Make sure you upload the entire folder structure including src/, public/, package.json, and .env.example
14. At the bottom of the page, click the green "Commit changes" button
15. Your files are now on GitHub

---

## STEP 2 — Create a Supabase account and set up your database

Supabase is your cloud database. This is what makes your data sync across devices.

1. Go to supabase.com
2. Click "Start your project" or "Sign Up"
3. Sign up with GitHub (easiest — click "Continue with GitHub")
4. Authorize Supabase to connect to your GitHub account

Create your project:

5. Click "New project"
6. Choose your organization (it will show your GitHub username)
7. Give your project a name: angela-wos
8. Create a database password — use something strong and save it somewhere (you will not need it often but keep it safe)
9. Choose region: US East (or whichever is closest to Illinois)
10. Click "Create new project"
11. Wait about 2 minutes while it sets up. You will see a loading screen.

Run the database setup:

12. Once your project is ready, look at the left sidebar
13. Click on "SQL Editor" (it looks like a small database icon)
14. You will see a blank text area
15. Open the file called supabase-setup.sql from the files I gave you
16. Copy everything in that file
17. Paste it into the SQL Editor text area
18. Click the green "Run" button (or press Cmd+Enter on Mac, Ctrl+Enter on Windows)
19. You should see a success message at the bottom. Your database is ready.

Get your connection keys:

20. In the left sidebar, click on "Project Settings" (gear icon at the bottom)
21. Click "API" in the settings menu
22. You will see two values you need to copy. Keep this page open.
    - Project URL (looks like: https://abcdefgh.supabase.co)
    - anon public key (a long string starting with eyJ...)

---

## STEP 3 — Add your environment variables to GitHub

This connects your app to your Supabase database securely.

1. Go back to your GitHub repository (github.com/yourusername/angela-wos)
2. Click on "Settings" tab at the top of the repository
3. In the left sidebar, scroll down and click "Secrets and variables"
4. Click "Actions"
5. You will NOT need this for Vercel — skip to Step 4

Actually, Vercel handles environment variables directly. Move to Step 4.

---

## STEP 4 — Deploy with Vercel

Vercel is your hosting. It reads your code from GitHub and puts it on the internet.

1. Go to vercel.com
2. Click "Sign Up"
3. Click "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

Import your project:

5. You will land on the Vercel dashboard
6. Click "Add New Project" or "Import Project"
7. You will see a list of your GitHub repositories
8. Find "angela-wos" and click "Import"

Configure your environment variables (this is where you paste your Supabase keys):

9. Before clicking Deploy, look for a section called "Environment Variables"
10. Click "Add" to add the first variable:
    - NAME: REACT_APP_SUPABASE_URL
    - VALUE: paste your Supabase Project URL from Step 2
11. Click "Add" again for the second variable:
    - NAME: REACT_APP_SUPABASE_ANON_KEY
    - VALUE: paste your Supabase anon public key from Step 2

Deploy:

12. Click the "Deploy" button
13. Vercel will build your app. This takes about 2–3 minutes.
14. You will see a success screen with confetti and a preview of your app
15. Click "Continue to Dashboard"

Get your URL:

16. On your project dashboard, you will see your app URL
    It will look something like: angela-wos.vercel.app or angela-wos-yourname.vercel.app
17. Click "Visit" to open your app
18. It is live

---

## STEP 5 — Add your Anthropic API key inside the app

1. Open your app at your new URL
2. Click "Settings" in the left sidebar
3. Find the "Anthropic API key" section at the top
4. Paste your API key (the one starting with sk-ant-...)
5. Click "Save"
6. Your Claude ritual conversations are now active

---

## STEP 6 — Bookmark on all your devices

On iPhone:
1. Open Safari (not Chrome — Safari works best for home screen shortcuts)
2. Go to your app URL
3. Tap the Share button (the box with an arrow pointing up)
4. Tap "Add to Home Screen"
5. Name it "Angela WOS" and tap "Add"
6. It now appears on your home screen like a native app

On iPad:
1. Same steps as iPhone above

On Chrome (laptop):
1. Go to your app URL
2. Click the bookmark icon or press Cmd+D (Mac) / Ctrl+D (Windows)
3. Save it to your bookmarks bar

---

## STEP 7 — Set up your first week

1. Open your app
2. Click "Settings" in the sidebar
3. Fill in:
   - Week of (the date)
   - Tier this week
   - Your weekly intention
   - Big 3 priorities
   - One goal per role
4. Click "Activate this week"
5. Everything populates automatically

---

## WHAT TO DO EVERY SUNDAY

1. Open the app
2. Go to Settings
3. Update your week — tier, intention, Big 3, role goals
4. Click "Activate this week"
5. Your dashboard, goals, and romance picks for the week are ready

---

## IF SOMETHING GOES WRONG

App does not load after deploying:
- Go back to your Vercel dashboard
- Click on your project
- Click "View Function Logs" to see if there are errors
- Most common issue: environment variables were not saved correctly
- Go to Project Settings > Environment Variables and verify both values are there

Data is not syncing between devices:
- Make sure you are opening the same URL on both devices
- Check that your Supabase project is still active (it should be — free tier stays active)

Ritual conversations not working:
- Go to Settings in the app and verify your API key is saved
- Make sure the key starts with sk-ant-

---

## YOUR APP URL

Write it here once you have it:

_______________________________________

Save this somewhere. It is your app forever.

---

Angela's Weekly Operating System v2.0
Built for elegance, joy, and simplicity.
"I will not spend my life reacting. I will spend it leading — myself first."
