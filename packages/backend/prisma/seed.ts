import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create sample candidates
  const candidates = [
    {
      id: "candidate_1",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+1-555-0123",
      skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      experience: 5,
      location: "New York, NY",
      salary: 120000,
      status: "ACTIVE",
    },
    {
      id: "candidate_2",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      phone: "+1-555-0124",
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      experience: 3,
      location: "San Francisco, CA",
      salary: 110000,
      status: "ACTIVE",
    },
    {
      id: "candidate_3",
      email: "mike.johnson@example.com",
      firstName: "Mike",
      lastName: "Johnson",
      phone: "+1-555-0125",
      skills: ["Java", "Spring Boot", "MySQL", "Docker"],
      experience: 7,
      location: "Austin, TX",
      salary: 130000,
      status: "ACTIVE",
    },
    {
      id: "candidate_4",
      email: "sarah.wilson@example.com",
      firstName: "Sarah",
      lastName: "Wilson",
      phone: "+1-555-0126",
      skills: ["C#", ".NET", "Azure", "SQL Server"],
      experience: 4,
      location: "Seattle, WA",
      salary: 115000,
      status: "ACTIVE",
    },
    {
      id: "candidate_5",
      email: "david.brown@example.com",
      firstName: "David",
      lastName: "Brown",
      phone: "+1-555-0127",
      skills: ["Go", "Kubernetes", "MongoDB", "Redis"],
      experience: 6,
      location: "Denver, CO",
      salary: 125000,
      status: "ACTIVE",
    },
  ];

  for (const candidate of candidates) {
    await prisma.candidate.upsert({
      where: { email: candidate.email },
      update: {},
      create: candidate,
    });
  }

  console.log("✅ Database seeding completed successfully!");
  console.log(`📊 Created ${candidates.length} sample candidates`);
}

main()
  .catch((e) => {
    console.error("❌ Database seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
