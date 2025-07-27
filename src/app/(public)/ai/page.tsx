import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";

const content = {
  header: "AI",
  description: {
    main: "Welcome to the AI Group of the Developer Club! As the Head Lead of this division, I’m excited to introduce a community built for passionate minds driven by curiosity and innovation in the field of Artificial Intelligence.",
    sub: "Our mission is two-fold: to build strong foundational understanding of the mathematical principles behind AI and to apply this knowledge through hands-on projects that not only sharpen technical skills but also build impressive portfolios for future careers. We believe that true AI expertise comes from understanding both theory and application—so we’ll be diving deep into core mathematical topics and neural networks, alongside modern AI frameworks and tools. Throughout the semester, we’ll organize workshops, tutorials, coding sessions, and collaborative projects covering a wide spectrum of AI—from computer vision and NLP to generative models and reinforcement learning. These activities are designed to simulate real-world challenges and help members build projects they can proudly showcase in interviews, internships, and competitions. Whether you're a beginner eager to learn or an advanced practitioner looking to explore new technologies and developments, the AI Group is here to support your journey. Join us as we learn, build, and innovate together pushing the boundaries and grow together.",
  },
  technologies: {
    languages: ["Python"],
    frameworks: ["PyTorch"],
  },
  meetingInfo: "TBD time/day @ Parkview Campus break room",
  teamLeads: ["Anirudh Kadapa"],
  contact: {
    email: "anirudh.kadapa@wmich.edu",
    discord: "https://discord.gg/7bXfr9TM",
  },
  tags: ["AI", "ML", "DeepLearning"],
};

const AIPage = () => {
  return <CommunityDetails content={content} />;
};

export default AIPage;
