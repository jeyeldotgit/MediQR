## 🚀 Running the Client on Local Machine

Follow these steps to set up and run the client locally:

### 1. Clone the repository
```bash
git clone "https://github.com/your-username/your-repo.git"

2. Navigate to the client directory
cd client

3. Install dependencies
npm i

4. Start the development server
npm run dev


STEPS IN WORK COLLABORATION

🔹 1. Fork the Repository (once)
    - Go to the original repo (e.g., NovaJam/EasyAssets)
    - Click Fork (top-right)
This creates your copy at yourusername/EasyAssets

🔹 2. Clone Your Fork
    - git clone "replace_with_repository_link.git"
    - cd to clone directory

🔹 3. Add the Original Repo as Upstream
    - git remote add upstream https://github.com/NovaJam/EasyAssets.git //This lets you pull updates from the main team repo.

🔹 4. Create a New Branch for Each Issue
    - git checkout -b issue-XX-short-description
    - example: git checkout -b issue-12-create-asset-admin-view

🔹 5. Work on Your Task
    - git add .
    - git commit -m "Add asset admin view page (Closes #12)"

🔹 6. Push Your Branch to Your Fork
    - git push -u origin issue-12-create-asset-admin-view

🔹 7. Create a Pull Request (PR)
    - Go to your fork on GitHub → Click “Compare & pull request”

🔹 8. Keep Your Fork Updated (Do this before every task or Issue)
    - git checkout main
    - git fetch upstream
    - git merge upstream/main
    - git push origin main