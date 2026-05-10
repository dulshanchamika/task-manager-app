const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get the single profile
const getProfile = async (req, res, next) => {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'John Doe',
          position: 'Developer',
        },
      });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// Update the single profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, position, photo } = req.body;
    let profile = await prisma.profile.findFirst();
    
    if (!profile) {
      profile = await prisma.profile.create({
        data: { name, position, photo },
      });
    } else {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: { name, position, photo },
      });
    }
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
