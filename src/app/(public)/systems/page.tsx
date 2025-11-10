import CommunityDetails from "@/features/public/CommunityDetails/CommunityDetails";
import CommunityHero from "@/features/public/CommunityHero/CommunityHero";
import type { HeroDetails } from "@/models";

const systemsHero: HeroDetails = {
  title: "Systems",
  description: "Engineering what everything else runs on!",
  secondDescription:
    "Our focus is on understanding how systems are designed, optimized, and maintained to perform efficiently and remain stable, bridging theory with practical engineering",
  color: "systems",
};

const content = {
  header: "SYSTEMS",
  description: {
    main: "We are a community dedicated to understanding and engineering the systems that keep technology running.",
    sub: "We primarily focus on areas such as Systems Administration,  Cloud Administration , Embedded Systems, System Design and Architecture, Networking and Automation. We work on supporting the Club Infrastructure and also learn by hands on with our resources such as Rick (Proxmox Server) and Mac Minis. We also do hardware projects with various industry grade hardware like ESP-32, STM-32, ARM, Arduino and also FPGA's and try to apply them in areas such as IoT, Robotics, Smart World, etc. In general our goal is to learn and teach others how to design systems that are reliable, highly available and how to plan for incidents by the means of Disaster Management or Business Continuity Plans. We see things as a complex ecosystem driven by various moving components that are software and hardware based and look for ways to improve upon the system or eliminate any blind spots in the system. Whether you are scripting servers, programming microcontrollers, or learning how technology works under the hood, this is the place to build practical skills and a strong systems mindset.",
  },
  technologies: {
    languages: ["C", "C++", "Java", "Python", "Bash", "Go"],
    frameworks: [
      "FreeRTOS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Proxmox",
      "QEMU/KVM",
      "AWS",
      "Cloudflare",
      "Arduino",
      "STM32",
      "ESP32",
    ],
  },

  meetingInfo:
    "Bi-weekly Friday 6:00PM @ Virtual Teams/Discord (or) Parkview Campus Common Area",
  teamLeads: ["Sresthaa Shaga"],
  contact: {
    email: "sresthaa.shaga@wmich.edu",
    discord: "https://discord.gg/R9ewFdGa",
  },
  tags: [
    "iot",
    "devops",
    "cloud",
    "containerization",
    "virtualization",
    "linux",
    "rtos",
    "automation",
    "infrastructure",
    "networking",
    "monitoring",
    "security",
    "homelab",
    "proxmox",
  ],
};

const SystemsPage = () => {
  return (
    <div className="page">
      <CommunityHero details={systemsHero} />
      <CommunityDetails content={content} />
    </div>
  );
};

export default SystemsPage;
