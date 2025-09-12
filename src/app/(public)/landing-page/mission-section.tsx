// components/sections/MissionSection.tsx
export default function MissionSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 text-text dark:text-text-inverted text-center">
      <h2 className="text-4xl font-bold mb-6">Our Core Identity and Purpose</h2>
      <p className="text-lg mb-4">
        The WMU Developer Club is a student-led tech community dedicated to
        nurturing the next generation of innovators. We empower WMU students
        with essential technical skills, professional networks, and confidence
        through hands-on experience and inclusive community.
      </p>
      <p className="text-lg mb-4">
        We envision our club as the premier hub for tech innovation and talent
        development at Western Michigan University, cultivating socially
        conscious developers who build with purpose and lead with integrity.
      </p>
      <ul className="text-left text-base list-disc list-inside max-w-2xl mx-auto mt-6 space-y-2">
        <li>
          <strong>Hands-On Learning</strong>: Build real-world solutions through
          workshops and projects.
        </li>
        <li>
          <strong>Community & Collaboration</strong>: Share knowledge and build
          relationships.
        </li>
        <li>
          <strong>Continuous Growth</strong>: Embrace lifelong learning and
          explore emerging trends.
        </li>
        <li>
          <strong>Innovation & Creativity</strong>: Think outside the box and
          experiment boldly.
        </li>
        <li>
          <strong>Accessibility & Inclusivity</strong>: Tech education for
          everyone, regardless of background.
        </li>
        <li>
          <strong>Career Readiness</strong>: Train with real tools and real
          challenges.
        </li>
      </ul>
    </div>
  );
}
