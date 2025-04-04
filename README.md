# Create T3 App

This is a [T3 Stack](https://create.t3.gg/)
We will be using
[React](https://react.dev/reference/react)
[NextJS](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
[NodeJS](https://nodejs.org/en)
[TailwindCSS](https://tailwindcss.com/)

Our reference in terms of UI
[TanStack](https://tanstack.com/)

## Getting Started

Follow these steps to download, install dependencies, and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/WMU-Developer-Club-Web-Development/webdev-landing.git
cd webdev-landing
```

### 2. Install Dependencies

Make sure you have Node.js and pnpm installed. Then run:

```bash
pnpm install
```

If you are using npm or yarn instead, you can run:

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Copy the example environment file and set your environment-specific variables:

```bash
cp .env.example .env
```

Open `.env` in your editor and fill in the required values (e.g., database URL, authentication secrets, etc.).

### 4. Run the Development Server

```bash
pnpm dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Deployment

Refer to these deployment guides for specific instructions:

- [Vercel](https://create.t3.gg/en/deployment/vercel)
- [Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)


# Club Website - Project Overview

This website will serve as the official platform for our student club. Its primary purpose is to inform visitors about the club, help students join or contact us, and support internal members with updates, resources, and announcements.

## Purpose

The club website will:

- Inform new visitors about what the club is and why they should join
- Showcase events, projects, and team members
- Provide a central hub for member communication and collaboration
- Possibly include private or internal-use features as the club grows

## Public-Facing Requirements

### Home Page
- Club name and branding
- Short description of the club
- Countdown to the next meeting or event
- Call-to-action for joining or contacting the club

### About Page
- Club mission, goals, and origin story
- Information on who the club is for

### Meet the Team
- List of core members and their roles
- Optional links to GitHub or LinkedIn

### Events or Activities
- List of upcoming and past events
- Event descriptions, media (photos/videos), and calendar integration

### Join or Contact Page
- Interest form (name, email, reason for joining)
- Contact information and links to social media
- Invite to the club's Discord, Slack, or other platform

## Member-Facing Features (Optional)

- Member login or portal
- Project tracking or portfolio showcase
- Internal resources or documentation
- Announcements or updates section
- Meeting notes archive
- Job/internship board
- Points or achievement system for members

## Technical Stack (Suggested)

- Next.js for fast development and routing
- Tailwind CSS for styling
- Hosting is still a WIP
- GitHub for collaboration and version control

## Potential Enhancements

- Blog or news section
- Testimonials or member highlights
- Video or animation on the homepage
- Newsletter signup

## Getting Started

1. Plan and write content for each page
2. Design the layout (Figma or sketch)
3. Choose the tech stack and set up the project
4. Build the pages and components
5. Deploy to a platform like Vercel
