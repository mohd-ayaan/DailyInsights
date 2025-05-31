# DAILY INSIGHTS: Your Personal Journal

![Homepage of Daily Insights](public/Screenshot(90).png)

### Lists of Posts
![Lists of Posts](public/Screenshot(89).png)

### Post View
![Post View](public/Screenshot(91).png)
## Project Overview

DAILY INSIGHTS is a personal diary and journaling web application designed to help users effortlessly document their thoughts, experiences, and reflections on a regular basis. It provides a serene and intuitive space for self-discovery and personal growth, allowing you to cultivate clarity and preserve your unique story.

## Features

* **Compose & Save Entries:** Easily write and store new journal entries with a title and content.
* **View All Insights:** Browse a comprehensive list of all your created entries on the homepage.
* **Detailed Entry View:** Click on any entry's title to read its full content on a dedicated page.
* **Edit Functionality:** Update and modify existing journal entries to refine your thoughts.
* **Delete Functionality:** Remove entries you no longer wish to keep.
* **Persistent Storage:** All your journal entries are securely stored in a cloud-based MongoDB database.
* **Simple & Intuitive Interface:** Designed for a straightforward and engaging user experience.

## Technologies Used

* **Backend:** Node.js with Express.js framework
* **Database:** MongoDB (via MongoDB Atlas for cloud hosting)
* **Object Data Modeling (ODM):** Mongoose
* **Templating Engine:** EJS (Embedded JavaScript)
* **Environment Variables:** `dotenv`
* **Styling:** Custom CSS
* **Package Manager:** npm
* **Deployment:** Render.com

## Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
* A [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) for your cloud database.
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation (Local)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mohd-ayaan/DAILY-INSIGHTS.git](https://github.com/mohd-ayaan/DAILY-INSIGHTS.git)
    cd DAILY-INSIGHTS
    ```
    *(Note: I've updated the clone URL to reflect "DAILY-INSIGHTS" as your repository name, assuming you rename it or have created it with this name.)*
2.  **Install NPM dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    * Create a file named `.env` in the root directory of your project.
    * Add your MongoDB Atlas connection string to this file. It should look something like this (replace `YOUR_ACTUAL_MONGODB_PASSWORD` with your database user's password, and ensure `test` is your database name as seen in MongoDB Compass):
        ```
        MONGODB_URI=mongodb+srv://user_ayaan_31:YOUR_ACTUAL_MONGODB_PASSWORD@cluster0.dmifkqb.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
        ```
    * **Important:** Ensure your MongoDB Atlas Network Access is configured to "Allow Access from Anywhere" (`0.0.0.0/0`) for development/testing, and that your database user (`user_ayaan_31`) has read/write access.

### Running the Application

Once installed and configured:

```bash
npm start
```

The application will start, and you can access it in your web browser at http://localhost:3000.

Usage
Homepage: View a chronological list of your journal entries.
Create New Post: Click the "Compose" or "Create" link to open the form for a new entry.
View Post: Click on any entry's title from the homepage to see its full content.
Edit Post: On the individual post view page, click the "Edit" button to modify its title or content.
Delete Post: On the individual post view page, click the "Delete" button to remove the entry.

Project Structure
.
├── public/                 # Static assets (CSS, images)
│   └── main.css            # Main stylesheet for the application
├── views/                  # EJS templates for rendering pages
│   ├── aboutus.ejs         # About Us page template
│   ├── create.ejs          # Create new post form template
│   ├── edit.ejs            # Edit existing post form template
│   ├── index.ejs           # Homepage displaying all posts
│   └── posts.ejs           # Individual post view template
├── .env                    # Local environment variables (NOT committed to Git)
├── .gitignore              # Specifies files and folders to be ignored by Git
├── app.js                  # Main Express.js application file (server setup, routes, DB connection)
├── package.json            # Project metadata and dependencies
└── README.md               # This README file
