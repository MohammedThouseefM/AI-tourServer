const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const destinations = [
    {
        name: "Eiffel Tower",
        description: "A wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
        location: "Paris, France",
        image_url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Great Wall of China",
        description: "A series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups.",
        location: "China",
        image_url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Machu Picchu",
        description: "A 15th-century Inca citadel, located in the Eastern Cordillera of southern Peru, on a 2,430-metre (7,970 ft) mountain ridge.",
        location: "Cusco Region, Peru",
        image_url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Taj Mahal",
        description: "An ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan.",
        location: "Agra, India",
        image_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Colosseum",
        description: "An oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built.",
        location: "Rome, Italy",
        image_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Grand Canyon",
        description: "A steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles (446 km) long, up to 18 miles (29 km) wide and attains a depth of over a mile (6,093 feet or 1,857 meters).",
        location: "Arizona, USA",
        image_url: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Christ the Redeemer",
        description: "An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa.",
        location: "Rio de Janeiro, Brazil",
        image_url: "https://images.unsplash.com/photo-1628522384639-66d480e60824?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Petra",
        description: "A historical and archaeological city in southern Jordan. Petra lies around Jabal Al-Madbah in a basin surrounded by mountains which form the eastern flank of the Arabah valley running from the Dead Sea to the Gulf of Aqaba.",
        location: "Ma'an, Jordan",
        image_url: "https://images.unsplash.com/photo-1579606864115-06d6bd7d21ca?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Santorini",
        description: "An island in the southern Aegean Sea, about 200 km (120 mi) southeast of Greece's mainland. It is the largest island of a small, circular archipelago, which bears the same name and is the remnant of a volcanic caldera.",
        location: "Aegean Sea, Greece",
        image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Mount Fuji",
        description: "An active volcano about 100 kilometers (62 mi) southwest of Tokyo. Commonly called 'Fuji-san', it's the country's tallest peak, at 3,776 meters.",
        location: "Honshu, Japan",
        image_url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Bora Bora",
        description: "A small South Pacific island northwest of Tahiti in French Polynesia directly south of Hawaii. Surrounded by sand-fringed islets (motus) and a turquoise lagoon protected by a coral reef, it's known for its scuba diving.",
        location: "French Polynesia",
        image_url: "https://images.unsplash.com/photo-1532960410886-d24c3d82a466?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Pyramids of Giza",
        description: "The Giza Pyramid Complex, also called the Giza Necropolis, is the site on the Giza Plateau in Greater Cairo, Egypt that includes the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure.",
        location: "Giza, Egypt",
        image_url: "https://images.unsplash.com/photo-1539650116455-251d93d5ce81?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Sydney Opera House",
        description: "A multi-venue performing arts centre at Sydney Harbour located in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings.",
        location: "Sydney, Australia",
        image_url: "https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Burj Khalifa",
        description: "A skyscraper in Dubai, United Arab Emirates. With a total height of 829.8 m (2,722 ft) and a roof height (excluding antenna, but including a 244 m spire) of 828 m (2,717 ft), the Burj Khalifa has been the tallest structure and building in the world since its topping out in 2009.",
        location: "Dubai, UAE",
        image_url: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Niagara Falls",
        description: "A group of three waterfalls at the southern end of Niagara Gorge, spanning the border between the province of Ontario in Canada and the state of New York in the United States.",
        location: "Canada / USA",
        image_url: "https://images.unsplash.com/photo-1543343445-5df1846c927f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Statue of Liberty",
        description: "A colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.",
        location: "New York, USA",
        image_url: "https://images.unsplash.com/photo-1534052341259-2465ce239db8?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Angkor Wat",
        description: "A temple complex in Cambodia and the largest religious monument in the world by land area, on a site measuring 162.6 hectares (1.626 km2; 402 acres).",
        location: "Siem Reap, Cambodia",
        image_url: "https://images.unsplash.com/photo-1560965053-1567ba4470c1?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Bali",
        description: "A province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller neighbouring islands.",
        location: "Indonesia",
        image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Yellowstone National Park",
        description: "A national park located in the western United States, largely in the northwest corner of Wyoming and extending into Montana and Idaho.",
        location: "Wyoming, USA",
        image_url: "https://images.unsplash.com/photo-1570654230464-9cf6d6f0660f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Banff National Park",
        description: "Canada's oldest national park, established in 1885. Located in the Rocky Mountains of 110–180 kilometres (68–112 mi) west of Calgary in the province of Alberta, Banff encompasses 6,641 square kilometres (2,564 sq mi) of mountainous terrain.",
        location: "Alberta, Canada",
        image_url: "https://images.unsplash.com/photo-1561134643-690278784e18?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Venice",
        description: "A city in northeastern Italy and the capital of the Veneto region. It is built on a group of 118 small islands that are separated by canals and linked by over 400 bridges.",
        location: "Venice, Italy",
        image_url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        name: "Maldives",
        description: "Avarchipelago of 1,192 coral islands grouped into 26 natural atolls. Known for its beaches, blue lagoons and extensive reefs.",
        location: "Indian Ocean",
        image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop"
    }
];

const pool = require('./config/db');

async function seedDB() {
    console.log('🌱 Seeding Database...');

    try {
        console.log('Teesting connection...');
        await pool.query('SELECT 1');
        console.log('Connection successful.');

        for (const dest of destinations) {
            console.log(`Inserting ${dest.name}...`);
            await pool.execute(
                'INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)',
                [dest.name, dest.description, dest.location, dest.image_url]
            );
        }

        console.log('✅ Database seeded successfully with 20+ destinations!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding database:', err.message);
        console.error('Full Error:', err);
        process.exit(1);
    }
}

seedDB();
