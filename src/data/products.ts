import type { Product } from "../types"

export const products: Product[] = [
  {
    id: 1,
    name: "Oversized Cotton Shirt",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://i.pinimg.com/736x/db/17/b1/db17b11ea155e740a8752e72b292b103.jpg",
    category: "women",
    colors: ["White", "Black", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isFeatured: true,
    description:
      "Elevate your casual wardrobe with our premium oversized cotton shirt. Featuring a relaxed fit and sustainable materials, this versatile piece transitions effortlessly from day to night.",
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 129.99,
    image:
      "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "men",
    colors: ["Blue", "Black", "Grey"],
    sizes: ["28", "30", "32", "34", "36"],
    isTrending: true,
    description:
      "Our signature slim fit jeans combine comfort with style. Made from premium stretch denim that moves with you while maintaining its shape throughout the day.",
  },
  {
    id: 3,
    name: "Cashmere Blend Sweater",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "women",
    colors: ["Cream", "Grey", "Black"],
    sizes: ["XS", "S", "M", "L"],
    isFeatured: true,
    description:
      "Luxuriously soft cashmere blend sweater designed for exceptional warmth and comfort. Featuring a classic silhouette that pairs perfectly with any outfit.",
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 159.99,
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    colors: ["Tan", "Black", "Brown"],
    sizes: ["One Size"],
    isNew: true,
    description:
      "Handcrafted from premium Italian leather, this crossbody bag offers timeless style with practical organization. Features adjustable strap and secure magnetic closure.",
  },
  {
    id: 5,
    name: "Wool Tailored Blazer",
    price: 249.99,
    image:
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "men",
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["38", "40", "42", "44", "46"],
    isFeatured: true,
    description:
      "Expertly tailored blazer crafted from fine wool. The perfect statement piece for elevating your professional and formal attire.",
  },
  {
    id: 6,
    name: "Silk Slip Dress",
    price: 179.99,
    image:
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "women",
    colors: ["Black", "Champagne", "Emerald"],
    sizes: ["XS", "S", "M", "L"],
    isTrending: true,
    description:
      "Elegant silk slip dress designed for a flawless drape. Perfect for special occasions or evenings out, this timeless piece exudes effortless sophistication.",
  },
  {
    id: 7,
    name: "Minimalist Watch",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    colors: ["Silver", "Gold", "Rose Gold"],
    sizes: ["One Size"],
    isTrending: true,
    description:
      "Sleek minimalist watch with premium movement and scratch-resistant sapphire crystal. Water-resistant to 50 meters with a genuine leather strap.",
  },
  {
    id: 8,
    name: "Technical Performance Jacket",
    price: 229.99,
    image:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "men",
    colors: ["Black", "Navy", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    description:
      "Weatherproof technical jacket designed for the urban explorer. Features breathable waterproof fabric, taped seams, and strategic ventilation for maximum comfort.",
  },
]

export const getProductById = (id: number): Product | undefined => {
  return allProducts.find((product) => product.id === id)
}

export const getRelatedProducts = (id: number, category: string): Product[] => {
  return allProducts.filter((product) => product.id !== id && product.category === category).slice(0, 4)
}


const additionalProducts: Product[] = [
  {
    id: 9,
    name: "Floral Dress",
    price: 119.99,
    image:
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "women",
    colors: ["Blue", "Pink", "Yellow"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    description:
      "Light and airy floral dress perfect for summer days. Features a flattering silhouette and breathable fabric.",
  },
  {
    id: 10,
    name: "Structured Tote Bag",
    price: 139.99,
    originalPrice: 179.99,
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    colors: ["Black", "Beige", "Red"],
    sizes: ["One Size"],
    isFeatured: true,
    description:
      "Spacious structured tote with multiple compartments for organization. Made from durable vegan leather.",
  },
  {
    id: 11,
    name: "Linen Blend Shirt",
    price: 89.99,
    image:
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "men",
    colors: ["White", "Blue", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    isTrending: true,
    description: "Breathable linen blend shirt perfect for warm weather. Features a relaxed fit and classic design.",
  },
  {
    id: 12,
    name: "Pleated Midi Skirt",
    price: 99.99,
    image:
      "https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "women",
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L"],
    isFeatured: true,
    description:
      "Elegant pleated midi skirt that transitions seamlessly from office to evening. Features a comfortable elastic waistband.",
  },
  {
    id: 13,
    name: "Leather Ankle Boots",
    price: 189.99,
    originalPrice: 229.99,
    image:
      "https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "women",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    isTrending: true,
    description:
      "Classic leather ankle boots with a comfortable block heel. Versatile style that complements any outfit.",
  },
  {
    id: 14,
    name: "Graphic Print T-Shirt",
    price: 49.99,
    image:
      "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "men",
    colors: ["White", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    description: "Soft cotton t-shirt featuring an exclusive graphic print. Perfect for casual everyday wear.",
  },
  {
    id: 15,
    name: "Classic dotted shirt",
    price: 129.99,
    image:
      "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "women",
    colors: ["Black", "Camel", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    description:
      "Sophisticated wide leg trousers crafted from premium fabric with a beautiful drape. Features a high waist and flattering fit.",
  },
  {
    id: 16,
    name: "Knit Beanie Hat",
    price: 39.99,
    image:
      "https://images.pexels.com/photos/1070058/pexels-photo-1070058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    colors: ["Grey", "Black", "Burgundy", "Navy"],
    sizes: ["One Size"],
    isTrending: true,
    description:
      "Cozy knit beanie made from soft yarn. Perfect for keeping warm while adding style to your winter outfits.",
  },
]


const newMensProducts: Product[] = [
  {
    id: 17,
    name: "Classic Black Suit",
    price: 349.99,
    originalPrice: 399.99,
    image: "https://i.pinimg.com/736x/9a/f3/bf/9af3bf62b9f0721274aa94d88fa82f3a.jpg",
    category: "men",
    colors: ["Black", "Navy", "Charcoal"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    isFeatured: true,
    description:
      "Timeless black suit crafted from premium wool blend fabric. Features a modern slim fit, notch lapels, and expert tailoring for a sophisticated silhouette perfect for formal occasions and business wear.",
  },
  {
    id: 18,
    name: "Artistic Graphic T-Shirt",
    price: 59.99,
    image: "https://i.pinimg.com/736x/14/0a/24/140a24a0249c09102ff1d354c07af755.jpg",
    category: "men",
    colors: ["White", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    isTrending: true,
    description:
      "Express your unique style with this artistic graphic t-shirt. Made from 100% organic cotton with a relaxed fit and featuring an exclusive hand-drawn design that makes a bold statement.",
  },
  {
    id: 19,
    name: "Premium Pullover Hoodie",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://i.pinimg.com/736x/93/17/0a/93170a0c5a5a75fb9edfc315d8b34474.jpg",
    category: "men",
    colors: ["Grey", "Black", "Navy", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isTrending: true,
    description:
      "Stay comfortable in style with our premium pullover hoodie. Crafted from soft brushed fleece with a relaxed fit, kangaroo pocket, and adjustable drawstring hood for the perfect casual look.",
  },
  {
    id: 20,
    name: "Classic Polo Shirt",
    price: 69.99,
    image: "https://i.pinimg.com/736x/6d/6c/91/6d6c912df7a5f66be71f1f2de8d3abfd.jpg",
    category: "men",
    colors: ["Navy", "White", "Black", "Green", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isFeatured: true,
    description:
      "Elevate your casual wardrobe with our classic polo shirt. Made from premium piqué cotton with a comfortable regular fit, ribbed collar, and two-button placket for timeless style.",
  },
  {
    id: 21,
    name: "Textured Cotton T-Shirt",
    price: 49.99,
    image: "https://i.pinimg.com/736x/7c/e6/ba/7ce6baefe598c4e968319474bc4ff9da.jpg",
    category: "men",
    colors: ["White", "Grey", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    description:
      "Add subtle sophistication to your everyday look with our textured cotton t-shirt. Features a unique slub fabric texture, crew neckline, and relaxed fit for effortless style and comfort.",
  },
  {
    id: 22,
    name: "Wool-Blend Bomber Jacket",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://sjc.microlink.io/LXjLOpfcborrCEdjgjwdLPR8FxO7FDy-V4qIj4XemzKK7z1C1QfR00yD1pLIyHkd6flzyC4Ykc2QFHcbUD28Ag.jpeg",
    category: "men",
    colors: ["Camel", "Navy", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isFeatured: true,
    isTrending: true,
    description:
      "Luxurious wool-blend bomber jacket with a modern silhouette. Features a zip-front closure, ribbed collar, cuffs, and hem for a refined casual look that transitions seamlessly from day to night.",
  },
  {
    id: 23,
    name: "Kounde Style Outfit Set",
    price: 279.99,
    originalPrice: 329.99,
    image: "https://i.pinimg.com/736x/95/d8/d3/95d8d3f2e893cf59795828c67cfd7f07.jpg",
    category: "men",
    colors: ["Black", "White", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true,
    description:
      "Channel the iconic style of Jules Kounde with this contemporary outfit set. Features a designer-inspired silhouette with premium materials and meticulous attention to detail for a fashion-forward look.",
  },
  {
    id: 37,
    name: "Summer Linen Shorts",
    price: 79.99,
    image: "https://i.pinimg.com/736x/51/2c/80/512c809f356d0d54c1f333900bf8cf7e.jpg",
    category: "men",
    colors: ["Beige", "Navy", "White", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    isFeatured: true,
    description:
      "Perfect for warm weather, these lightweight linen shorts offer breathable comfort and effortless style. Features a relaxed fit, drawstring waist, and premium fabric that gets better with each wear.",
  },
  {
    id: 38,
    name: "Brown Top & Black Trousers Set",
    price: 159.99,
    originalPrice: 189.99,
    image: "https://i.pinimg.com/736x/7e/01/0e/7e010e661eb7f40b3e06ad6d91850c55.jpg",
    category: "men",
    colors: ["Brown/Black", "Navy/Grey", "Beige/Olive"],
    sizes: ["S", "M", "L", "XL"],
    isTrending: true,
    description:
      "Elevate your style with this sophisticated two-piece set featuring a luxurious brown top and tailored black trousers. Perfect for creating a polished look that transitions seamlessly from office to evening events.",
  },
]


const newWomensProducts: Product[] = [
  {
    id: 24,
    name: "High-Waisted Tailored Pants",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://i.pinimg.com/736x/9c/c1/3e/9cc13e9cdbb0d4d1498ce27647062acf.jpg",
    category: "women",
    colors: ["Black", "Beige", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    description:
      "Elevate your professional wardrobe with these sophisticated high-waisted pants. Featuring a flattering silhouette, front pleats, and premium fabric with just the right amount of stretch for all-day comfort.",
  },
  {
    id: 25,
    name: "Elegant Maxi Dress",
    price: 159.99,
    image: "https://i.pinimg.com/736x/08/81/5a/08815a3fd352c9c04609f5779c5d9a0c.jpg",
    category: "women",
    colors: ["Black", "Navy", "Emerald", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isTrending: true,
    description:
      "Make a statement in this floor-sweeping maxi dress. Designed with a flowing silhouette, subtle side slit, and delicate details that create an effortlessly elegant look for special occasions.",
  },
  {
    id: 26,
    name: "Winter Knit Sweater Dress",
    price: 139.99,
    originalPrice: 179.99,
    image: "https://i.pinimg.com/736x/67/98/78/6798785a169d011924bb1a5d72c61d0c.jpg",
    category: "women",
    colors: ["Cream", "Grey", "Black", "Burgundy"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    description:
      "Stay warm and stylish in our cozy winter knit dress. Features a soft, medium-weight knit fabric, ribbed details, and a comfortable fit that's perfect for layering during the colder months.",
  },
  {
    id: 27,
    name: "Classic Pencil Skirt",
    price: 89.99,
    image: "https://i.pinimg.com/736x/c3/05/cb/c305cbd573891957c3eae683d7f5e440.jpg",
    category: "women",
    colors: ["Black", "Navy", "Grey", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    description:
      "A wardrobe essential, our classic pencil skirt offers timeless elegance for any professional setting. Crafted with a smooth, stretch fabric, back vent, and hidden zipper for a sleek, flattering fit.",
  },
  {
    id: 28,
    name: "Floral Print Midi Dress",
    price: 119.99,
    originalPrice: 149.99,
    image: "https://i.pinimg.com/736x/32/8a/47/328a47e70e55cc8818ee02b255d043c5.jpg",
    category: "women",
    colors: ["Multicolor", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isTrending: true,
    description:
      "Embrace feminine charm with our floral print midi dress. Features a flattering A-line silhouette, delicate floral pattern, and lightweight fabric that's perfect for garden parties, brunches, and summer events.",
  },
  {
    id: 39,
    name: "Elegant Women's official",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://i.pinimg.com/736x/0f/4f/92/0f4f9245a4841c6f4bf90faf737f3b6e.jpg",
    category: "women",
    colors: ["Black", "Navy", "Burgundy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    description:
      "Make an unforgettable entrance in this stunning evening gown. Featuring a flattering silhouette with delicate detailing, premium fabric, and expert construction for a truly elegant look perfect for formal events and special occasions.",
  },
  {
    id: 40,
    name: "Baggy Sweatpants",
    price: 69.99,
    image: "https://i.pinimg.com/736x/0f/ef/90/0fef905be4e93fdbaac508fd01bad1d4.jpg",
    category: "women",
    colors: ["Grey", "Black", "Navy", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isTrending: true,
    description:
      "Embrace comfort without sacrificing style with our premium baggy sweatpants. Made from ultra-soft brushed fleece with a relaxed fit, elastic waistband, and adjustable drawstring for the perfect athleisure look.",
  },
]


const newAccessories: Product[] = [
  {
    id: 29,
    name: "5-Piece Luxury Ring Set",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://i.pinimg.com/736x/3b/4a/a0/3b4aa0d742396e2ef7dcb10da9d7f444.jpg",
    category: "accessories",
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["One Size"],
    isNew: true,
    description:
      "Elevate any outfit with our 5-piece luxury ring set. Each piece features unique detailing with premium plating and stone accents, designed to be worn together or separately for versatile styling options.",
  },
  {
    id: 30,
    name: "Cuban Link Bracelet",
    price: 89.99,
    image: "https://i.pinimg.com/736x/8c/82/b4/8c82b42ac99ca780f45a365fd5a08276.jpg",
    category: "accessories",
    colors: ["Gold", "Silver"],
    sizes: ["One Size"],
    isTrending: true,
    description:
      "Make a bold statement with our premium Cuban link bracelet. Crafted with heavyweight links and a secure clasp, this timeless piece adds a touch of luxury to any ensemble.",
  },
  {
    id: 31,
    name: "Luxury Automatic Watch",
    price: 1499.99,
    originalPrice: 1799.99,
    image:
      "https://sjc.microlink.io/MFJb0_RQ2C2cQWfFx2GzVTXsYJiOkCNFtYdlYXO4M1r_OpaRx1tNjkanodMaVt0vuhy7yHo-lizXQZBXqFpeKA.jpeg",
    category: "accessories",
    colors: ["Silver/Black", "Gold/Black", "Two-tone"],
    sizes: ["One Size"],
    isFeatured: true,
    description:
      "Timeless elegance meets precision engineering in our luxury automatic chronograph watch. Features a sophisticated silver dial with black subdials, premium stainless steel case, and comfortable rubber strap. Water-resistant with reliable automatic movement for the discerning collector.",
  },
  {
    id: 32,
    name: "Rhinestone Jewelry Set",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://i.pinimg.com/736x/39/3a/fd/393afda74ab014552e8c15b8fd4d8049.jpg",
    category: "accessories",
    colors: ["Silver", "Gold"],
    sizes: ["One Size"],
    isNew: true,
    description:
      "Add glamour to any special occasion with our stunning rhinestone jewelry set. Includes a necklace, earrings, and bracelet with brilliant stones that catch and reflect light for a dazzling effect.",
  },
  {
    id: 33,
    name: "Crystal Choker Necklace",
    price: 69.99,
    image: "https://i.pinimg.com/736x/56/7f/03/567f037f756e2a00b45e794ce83ad2bc.jpg",
    category: "accessories",
    colors: ["Silver", "Gold", "Rose Gold"],
    sizes: ["One Size"],
    isTrending: true,
    description:
      "Make a statement with our eye-catching crystal choker necklace. Features multiple rows of sparkling crystals on a comfortable band, perfect for adding drama to evening wear and special occasions.",
  },
  {
    id: 34,
    name: "Premium Baseball Cap",
    price: 39.99,
    image: "https://i.pinimg.com/736x/45/79/a7/4579a7f64ebc41dc5dda7e3cf1c2d94e.jpg",
    category: "accessories",
    colors: ["Black", "White", "Navy", "Beige"],
    sizes: ["One Size"],
    isNew: true,
    description:
      "Elevate your casual style with our premium baseball cap. Crafted from high-quality materials with meticulous attention to detail, featuring an adjustable strap for the perfect fit.",
  },
  {
    id: 35,
    name: "Nike Cap",
    price: 149.99,
    originalPrice: 189.99,
    image: "https://i.pinimg.com/736x/c9/85/a1/c985a1e642d251654975805d2e7873f1.jpg",
    category: "accessories",
    colors: ["Black", "Tortoise", "Clear"],
    sizes: ["One Size"],
    isFeatured: true,
    description:
      "Protect your eyes in style with our designer sunglasses. Featuring UV protection, premium materials, and a timeless silhouette that complements any face shape.",
  },
  {
    id: 36,
    name: "Traditional Waist Beads",
    price: 49.99,
    image: "https://i.pinimg.com/736x/1a/b5/b5/1ab5b5f83b887ec8378b21af852b0b84.jpg",
    category: "accessories",
    colors: ["Multicolor", "Gold", "Blue", "Red"],
    sizes: ["One Size"],
    isNew: true,
    description:
      "Celebrate cultural heritage and beauty with our handcrafted waist beads. Each strand features colorful glass beads on a durable elastic string, traditionally worn as a symbol of femininity, spirituality, and adornment.",
  },
  {
    id: 41,
    name: "Rolex Watch",
    price: 789.99,
    originalPrice: 149.99,
    image: "https://i.pinimg.com/736x/9f/56/b5/9f56b5491605223f1bd2b177b867c462.jpg",
    category: "accessories",
    colors: ["White", "Cream", "Black"],
    sizes: ["One Size"],
    isFeatured: true,
    description:
      "Make a sophisticated statement with our elegant pearl necklace. Features premium cultured pearls arranged in a modern design that adds timeless elegance to both casual and formal outfits.",
  },
  {
    id: 42,
    name: "Neck chain",
    price: 59.99,
    image: "https://i.pinimg.com/736x/9f/5a/2d/9f5a2d6e867d266141047e160a550b8e.jpg",
    category: "accessories",
    colors: ["Gold", "Silver", "Pearl"],
    sizes: ["One Size"],
    isNew: true,
    isTrending: true,
    description:
      "Elevate your hairstyle with our luxury hair accessories set. Includes elegant clips, pins, and bands crafted with premium materials and delicate detailing for a touch of sophistication to any look.",
  },
]

const allProducts = [...products, ...additionalProducts, ...newMensProducts, ...newWomensProducts, ...newAccessories]

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter((product) => product.isFeatured).slice(0, 8)
}

export const getTrendingProducts = (): Product[] => {
  return allProducts.filter((product) => product.isTrending).slice(0, 8)
}

export const getNewArrivals = (): Product[] => {
  return allProducts.filter((product) => product.isNew).slice(0, 8)
}

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return allProducts
  return allProducts.filter((product) => product.category === category)
}
