import { site, socialLinks } from "@/lib/site";

/**
 * schema.org Person markup, so search engines can associate the name, role
 * and profiles with this page rather than inferring them from the copy.
 */
export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    email: `mailto:${site.email}`,
    sameAs: socialLinks.map((link) => link.href),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Braude College of Engineering",
    },
    knowsAbout: [
      "Software Engineering",
      "Backend Development",
      "REST APIs",
      "Automation",
      "FastAPI",
      "Software Quality Assurance",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Machine Learning",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from local constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
