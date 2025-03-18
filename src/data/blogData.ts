
export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
};

// Mock blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Launch a Successful Meme Coin Website in 2025',
    excerpt: 'Learn the key elements that make a meme coin website stand out and drive community engagement in the competitive crypto space.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
    author: 'Alex Morgan',
    date: 'May 15, 2025',
    category: 'Guide',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: '5 Web3 Design Trends That Will Dominate This Year',
    excerpt: 'Explore the latest design trends in Web3 websites that are capturing user attention and enhancing project credibility.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    author: 'Sarah Chen',
    date: 'May 10, 2025',
    category: 'Design',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Integrating DEX Price Charts Into Your Crypto Website',
    excerpt: 'A step-by-step guide to embedding real-time price charts from popular DEXes to boost your website\'s utility.',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
    author: 'Michael Rodriguez',
    date: 'May 5, 2025',
    category: 'Tutorial',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: 'The Power of Community in Web3 Projects: Building Your Online Presence',
    excerpt: 'How to leverage your website as a central hub for community building in decentralized projects.',
    image: 'https://images.unsplash.com/photo-1634986666676-ec9e2369d83c?q=80&w=2832&auto=format&fit=crop',
    author: 'Emma Wilson',
    date: 'April 28, 2025',
    category: 'Community',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Custom Domains for Your Web3 Project: Best Practices',
    excerpt: 'Everything you need to know about setting up and managing a custom domain for your blockchain project website.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    author: 'Thomas Green',
    date: 'April 22, 2025',
    category: 'Technical',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'From Template to Unique: Customizing Your Reham Website',
    excerpt: 'How to transform a template into a unique website that perfectly represents your brand identity.',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
    author: 'Olivia Johnson',
    date: 'April 15, 2025',
    category: 'Design',
    readTime: '9 min read'
  }
];
