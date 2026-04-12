import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sweetdelights.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@sweetdelights.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // Create sample products
  const products = [
    {
      name: "Gâteau Chocolat en Conserve",
      description:
        "Un délicieux gâteau au chocolat fondant, conservé dans une boîte hermétique pour garder toute sa fraîcheur et son moelleux. Parfait pour une pause gourmande à tout moment.",
      price: 3500,
      category: "Gâteau en conserve",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: true,
    },
    {
      name: "Gâteau Vanille en Conserve",
      description:
        "Un classique revisité ! Notre gâteau à la vanille naturelle, doux et parfumé, préparé avec soin et conservé pour votre plaisir.",
      price: 3000,
      category: "Gâteau en conserve",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: true,
    },
    {
      name: "Gâteau Red Velvet en Conserve",
      description:
        "Le fameux Red Velvet, avec sa texture unique et son goût subtil de cacao, surmonté d'un glaçage cream cheese. Un vrai régal en conserve.",
      price: 4000,
      category: "Gâteau en conserve",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: false,
    },
    {
      name: "Gâteau Citron en Conserve",
      description:
        "Un gâteau frais et acidulé au citron, idéal pour les amateurs d'agrumes. Léger et savoureux.",
      price: 3000,
      category: "Gâteau en conserve",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: false,
    },
    {
      name: "Jus de Mangue Frais",
      description:
        "Jus de mangue 100% naturel, sans sucre ajouté. Préparé avec des mangues mûres soigneusement sélectionnées pour un goût authentique.",
      price: 1500,
      category: "Jus de fruits",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: true,
    },
    {
      name: "Jus d'Ananas Frais",
      description:
        "Un jus d'ananas rafraîchissant et naturel. Riche en vitamines, parfait pour accompagner vos repas ou se rafraîchir.",
      price: 1500,
      category: "Jus de fruits",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: false,
    },
    {
      name: "Jus de Gingembre & Citron",
      description:
        "Un mélange tonifiant de gingembre frais et de citron. Énergisant et plein de bienfaits pour la santé.",
      price: 1800,
      category: "Jus de fruits",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: true,
    },
    {
      name: "Jus de Baobab",
      description:
        "Le traditionnel jus de bouye (baobab), onctueux et nutritif. Une boisson ancestrale africaine aux multiples vertus.",
      price: 2000,
      category: "Jus de fruits",
      images: JSON.stringify(["/images/placeholder.svg"]),
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`${products.length} products created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
