const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tasks = [
    {
      title: 'Complete Project Documentation',
      description: 'Write the README and deployment guide for the Task Manager app.',
      priority: 'HIGH',
      status: 'PENDING',
    },
    {
      title: 'Fix Frontend CSS issues',
      description: 'Ensure the dashboard is fully responsive on mobile devices.',
      priority: 'MEDIUM',
      status: 'COMPLETED',
    },
    {
      title: 'Set up AWS EC2',
      description: 'Launch an Ubuntu instance and install Docker.',
      priority: 'HIGH',
      status: 'PENDING',
    },
    {
      title: 'Implement Dark Mode',
      description: 'Add a toggle for switching between light and dark themes.',
      priority: 'LOW',
      status: 'PENDING',
    },
  ];

  console.log('Seeding tasks...');
  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
