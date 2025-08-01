import { PrismaClient, UserType, ProductCategory, Gender, SocializationLevel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!@#', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@wagr.com' },
    update: {},
    create: {
      email: 'admin@wagr.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      userType: UserType.ADMIN,
      isVerified: true,
    },
  });
  console.log('✅ Admin user created');

  // Create sample regular users
  const userPassword = await bcrypt.hash('password123', 10);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: userPassword,
        firstName: 'John',
        lastName: 'Doe',
        userType: UserType.DOG_OWNER,
        isVerified: true,
        dogs: {
          create: {
            name: 'Max',
            breed: 'Golden Retriever',
            birthDate: new Date('2020-05-15'),
            gender: Gender.MALE,
            furType: 'Long',
            furColor: 'Golden',
            socializationLevel: SocializationLevel.PRO,
            interests: ['Playing fetch', 'Swimming'],
            photos: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24'],
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        password: userPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        userType: UserType.DOG_OWNER,
        isVerified: true,
        dogs: {
          create: {
            name: 'Luna',
            breed: 'Labrador',
            birthDate: new Date('2021-03-20'),
            gender: Gender.FEMALE,
            furType: 'Short',
            furColor: 'Black',
            socializationLevel: SocializationLevel.INTERMEDIATE,
            interests: ['Running', 'Playing with toys'],
            photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb'],
          },
        },
      },
    }),
  ]);
  console.log('✅ Sample users and dogs created');

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Premium Dog Food - Chicken & Rice',
        description: 'High-quality dog food made with real chicken and brown rice',
        category: ProductCategory.FOOD,
        price: 49.99,
        salePrice: 39.99,
        sku: 'PDF-CR-001',
        images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119'],
        stock: 100,
        tags: ['premium', 'chicken', 'adult dogs'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Interactive Puzzle Toy',
        description: 'Keep your dog mentally stimulated with this challenging puzzle toy',
        category: ProductCategory.TOYS,
        price: 24.99,
        sku: 'TOY-PUZ-001',
        images: ['https://images.unsplash.com/photo-1535294435445-d7249524ef2e'],
        stock: 50,
        tags: ['interactive', 'puzzle', 'mental stimulation'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'LED Safety Collar',
        description: 'Keep your dog visible and safe during night walks',
        category: ProductCategory.ACCESSORIES,
        price: 19.99,
        sku: 'ACC-LED-001',
        images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee'],
        stock: 75,
        tags: ['safety', 'LED', 'night walks'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Professional Grooming Kit',
        description: 'Complete grooming kit with brushes, nail clippers, and shampoo',
        category: ProductCategory.GROOMING,
        price: 59.99,
        salePrice: 49.99,
        sku: 'GRM-KIT-001',
        images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7'],
        stock: 30,
        tags: ['grooming', 'professional', 'complete kit'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Orthopedic Dog Bed - Large',
        description: 'Memory foam bed for maximum comfort and joint support',
        category: ProductCategory.BEDS,
        price: 89.99,
        sku: 'BED-ORT-L01',
        images: ['https://images.unsplash.com/photo-1541188495357-ad2dc89487f4'],
        stock: 20,
        tags: ['orthopedic', 'memory foam', 'large dogs'],
      },
    }),
  ]);
  console.log('✅ Sample products created');

  // Create sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Weekend Dog Park Meetup',
        description: 'Join us for a fun morning at the Central Dog Park!',
        eventType: 'PLAYDATE',
        startTime: new Date('2024-02-15T10:00:00'),
        endTime: new Date('2024-02-15T12:00:00'),
        location: {
          address: 'Central Dog Park',
          city: 'San Francisco',
          state: 'CA',
          coordinates: { lat: 37.7749, lng: -122.4194 },
        },
        maxAttendees: 20,
        organizerId: users[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Puppy Training Workshop',
        description: 'Learn basic training techniques for your puppy',
        eventType: 'TRAINING',
        startTime: new Date('2024-02-20T14:00:00'),
        endTime: new Date('2024-02-20T16:00:00'),
        location: {
          address: 'Happy Paws Training Center',
          city: 'San Francisco',
          state: 'CA',
        },
        maxAttendees: 15,
        organizerId: users[1].id,
      },
    }),
  ]);
  console.log('✅ Sample events created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });