const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// New Batch of Destinations
const destinations = [
    {
        name: "London",
        location: "United Kingdom",
        description: "A 21st-century city with history stretching back to Roman times. Home to the Big Ben, London Eye, and Tower Bridge.",
        image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
    },
    {
        name: "Cairo",
        location: "Egypt",
        description: "Set on the Nile River, Egypt's sprawling capital is home to Tahrir Square and the vast Egyptian Museum, a trove of antiquities.",
        image_url: "https://images.unsplash.com/photo-1572252009289-9ef53dd19b72?w=800&q=80"
    },
    {
        name: "Venice",
        location: "Italy",
        description: "Built on more than 100 small islands in a lagoon in the Adriatic Sea. It has no roads, just canals – including the Grand Canal thoroughfare.",
        image_url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80"
    },
    {
        name: "Tokyo",
        location: "Japan",
        description: "Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples like Senso-ji.",
        image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
    },
    {
        name: "Amsterdam",
        location: "Netherlands",
        description: "Known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age.",
        image_url: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a2?w=800&q=80"
    },
    {
        name: "Maui",
        location: "Hawaii, USA",
        description: "Known for its world-famous beaches, the sacred Iao Valley, views of migrating humpback whales, and farm-to-table cuisine.",
        image_url: "https://images.unsplash.com/photo-1542259548-61e5dc2f72a8?w=800&q=80"
    },
    {
        name: "Phuket",
        location: "Thailand",
        description: "A rainforested, mountainous island in the Andaman Sea, has some of Thailand’s most popular beaches, mainly situated along the clear waters of the western shore.",
        image_url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80"
    },
    {
        name: "Queenstown",
        location: "New Zealand",
        description: "Reviewers' choice for adventure. Go bungee jumping, jet boating, skiing, or hiking. Known for its stunning scenery and Lord of the Rings filming locations.",
        image_url: "https://images.unsplash.com/photo-1507699622177-3883282c1ef4?w=800&q=80"
    },
    {
        name: "Florence",
        location: "Italy",
        description: "Capital of Italy’s Tuscany region, is home to many masterpieces of Renaissance art and architecture. One of its most iconic sights is the Duomo.",
        image_url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80"
    },
    {
        name: "Buenos Aires",
        location: "Argentina",
        description: "Big, cosmopolitan capital city. Its center is the Plaza de Mayo, lined with stately 19th-century buildings including Casa Rosada.",
        image_url: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80"
    },
    {
        name: "Havana",
        location: "Cuba",
        description: "Features Spanish colonial architecture in its 16th-century Old Havana core, which includes the Castillo de la Real Fuerza, a fort and maritime museum.",
        image_url: "https://images.unsplash.com/photo-1500755684388-72c7c2a170a4?w=800&q=80"
    },
    {
        name: "Lisbon",
        location: "Portugal",
        description: "Portugal's hilly, coastal capital city. From imposing São Jorge Castle, the view encompasses the old city’s pastel-colored buildings.",
        image_url: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?w=800&q=80"
    },
    {
        name: "Las Vegas",
        location: "USA",
        description: "Resort city famed for its vibrant nightlife, centered around 24-hour casinos and other entertainment options.",
        image_url: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&q=80"
    },
    {
        name: "Siem Reap",
        location: "Cambodia",
        description: "The gateway to the ruins of Angkor, the seat of the Khmer kingdom from the 9th–15th centuries. Includes the massive Angkor Wat.",
        image_url: "https://images.unsplash.com/photo-1565050215039-2b005bd9ce64?w=800&q=80"
    },
    {
        name: "Cinque Terre",
        location: "Italy",
        description: "A string of centuries-old seaside villages on the rugged Italian Riviera coastline. In each of the 5 towns, colorful houses and vineyards cling to steep terraces.",
        image_url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80"
    },
    {
        name: "Great Barrier Reef",
        location: "Australia",
        description: "The world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres.",
        image_url: "https://images.unsplash.com/photo-1456208620894-43ff59441ec9?w=800&q=80"
    },
    {
        name: "Budapest",
        location: "Hungary",
        description: "Bisected by the River Danube. Its 19th-century Chain Bridge connects the hilly Buda district with flat Pest. Famed for its thermal baths.",
        image_url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80"
    },
    {
        name: "Seoul",
        location: "South Korea",
        description: "A huge metropolis where modern skyscrapers, high-tech subways and pop culture meet Buddhist temples, palaces and street markets.",
        image_url: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80"
    },
    {
        name: "Jaipur",
        location: "India",
        description: "The capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City.",
        image_url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
    },
    {
        name: "Dublin",
        location: "Ireland",
        description: "Capital of the Republic of Ireland, is on Ireland’s east coast at the mouth of the River Liffey. Its historic buildings include Dublin Castle.",
        image_url: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=800&q=80"
    },
    {
        name: "Singapore",
        location: "Singapore",
        description: "An island city-state off southern Malaysia. A global financial center with a tropical climate and multicultural population.",
        image_url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80"
    },
    {
        name: "Toronto",
        location: "Canada",
        description: "A major Canadian city along Lake Ontario’s northwestern shore. It's a dynamic metropolis with a core of soaring skyscrapers, all dwarfed by the iconic CN Tower.",
        image_url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"
    }
];

async function seed() {
    console.log('🌱 Seeding additional destinations...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'tourism_guide'
    });

    try {
        for (const dest of destinations) {
            // Check if exists
            const [rows] = await connection.execute('SELECT * FROM destinations WHERE name = ?', [dest.name]);
            if (rows.length === 0) {
                await connection.execute(
                    'INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)',
                    [dest.name, dest.description, dest.location, dest.image_url]
                );
                console.log(`✅ Added ${dest.name}`);
            } else {
                console.log(`⚠️ ${dest.name} already exists, skipping.`);
            }
        }
        console.log('🎉 Seeding completed!');
        process.exit();
    } catch (err) {
        console.error('❌ Error seeding:', err);
        process.exit(1);
    }
}

seed();
