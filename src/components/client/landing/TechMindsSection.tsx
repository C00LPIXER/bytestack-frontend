import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, Code } from "lucide-react";

export const TechMindsSection = () => {
  const techCategories = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity Experts",
      description:
        "Stay updated on the latest cyber threats, ethical hacking techniques, and advanced security measures to protect digital assets.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Innovators",
      description:
        "Dive deep into machine learning, neural networks, and AI-driven applications shaping the future of technology.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developers",
      description:
        "Master programming languages, frameworks, and software development best practices to build cutting-edge applications.",
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          ByteStack Welcomes All Tech Minds
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {techCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {category.icon}
                  <span className="ml-3">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
