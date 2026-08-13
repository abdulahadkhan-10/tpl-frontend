export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Transfers' | 'Scouting' | 'Match Reports' | 'Academy' | 'Announcements';
  categoryBg: string;
  date: string;
  readTime: string;
  comments: number;
  image: string;
  featured?: boolean;
}

export const articlesData: Article[] = [
  {
    id: '1',
    title: "TPL Scout Spotlight: London's Rising Midfielder Davies Rated 88",
    excerpt: "Ethan Davies has taken the U18 division by storm this season. Our scouting report breaks down his key statistics, positional adaptability, and interest from professional academies.",
    content: `Ethan Davies has taken the U18 division by storm this season. Operating as a deep-lying playmaker, his tactical awareness and range of passing has drawn comparisons to elite deep midfielders in the professional ranks. 

After matching his rating of 88 in the latest scouting round, scouts from multiple top-tier clubs have registered their interest. The London United youth product continues to dictate the tempo of games with a pass completion rate averaging 92%. TPL coaching staff highlighted his progression in defensive transitions and physical shielding over the last matchweek.`,
    category: 'Scouting',
    categoryBg: 'bg-[#ddd6fe] text-[#5b21b6]',
    date: 'June 3, 2026',
    readTime: '5 min read',
    comments: 18,
    image: '/images/news_davies.png',
    featured: true
  },
  {
    id: '2',
    title: 'U18 Premier Division Matchday 8: Leeds Academy Holds Top Spot',
    excerpt: 'Leeds Academy defended their league leadership with an intensive 2-1 victory over London Colts in front of dozens of top scouts. Read the tactical analysis.',
    content: `Leeds Academy defended their league leadership with an intensive 2-1 victory over London Colts in front of dozens of top scouts.

The match featured high intensity pressing from both sides, but Leeds clinical edge in front of goal proved to be the differentiator. A late header from their top prospect sealed the three points, keeping them clear at the top of the table. Scouts noted the maturity of both defensive units under sustained pressure.`,
    category: 'Match Reports',
    categoryBg: 'bg-[#fef3c7] text-[#92400e]',
    date: 'June 2, 2026',
    readTime: '4 min read',
    comments: 12,
    image: '/images/news_matchday.png'
  },
  {
    id: '3',
    title: 'Talent Pro League Announces Strategic Partnership with Puma',
    excerpt: 'We are thrilled to welcome Puma as our official technical and sportswear supplier, equipping all youth academies with premium training gear starting next month.',
    content: `We are thrilled to welcome Puma as our official technical and sportswear supplier, equipping all youth academies with premium training gear starting next month.

Under this new multi-year agreement, Puma will supply high-performance kits, training gear, and footballs to all TPL franchise teams. TPL management stated that this partnership reflects the growing profile of the league and will provide young athletes with elite-level resources.`,
    category: 'Announcements',
    categoryBg: 'bg-[#10b981] text-white',
    date: 'May 30, 2026',
    readTime: '3 min read',
    comments: 4,
    image: '/images/news_puma.png'
  },
  {
    id: '4',
    title: 'Winger Noah Mensah Draws Interest from Belgian First Division Club',
    excerpt: 'The 17-year-old London Colts winger has registered 11 goals and 7 assists this season, prompting serious inquiries from scouts overseas.',
    content: `The 17-year-old London Colts winger has registered 11 goals and 7 assists this season, prompting serious inquiries from scouts overseas.

Known for his explosive pace and technical ability in one-on-one duels, Mensah has been a standout performer in the league. European scouts have been monitoring his progress, and formal inquiries regarding trials are expected in the upcoming transfer window.`,
    category: 'Transfers',
    categoryBg: 'bg-[#fef3c7] text-[#92400e]',
    date: 'May 28, 2026',
    readTime: '6 min read',
    comments: 23,
    image: '/images/tpl_action.png'
  },
  {
    id: '5',
    title: 'Designing a Modern Footballer: The TPL Technical Curriculum',
    excerpt: 'Our coaching team explains the principles of the new Youth Development Curriculum, focusing on tactical spatial awareness and rapid transition play.',
    content: `Our coaching team explains the principles of the new Youth Development Curriculum, focusing on tactical spatial awareness and rapid transition play.

The newly implemented curriculum focuses on positional versatility and intelligence off the ball. Training sessions are tailored to replicate high-pressure match scenarios, pushing young players to make rapid tactical decisions under constraints.`,
    category: 'Academy',
    categoryBg: 'bg-[#10b981] text-white',
    date: 'May 25, 2026',
    readTime: '7 min read',
    comments: 15,
    image: '/images/slider/a.jpg'
  },
  {
    id: '6',
    title: 'Top Goalkeeper Prospects Excel in Scouting Showcase',
    excerpt: 'Last weekend\'s specialized GK showcase highlighted three outstanding shot-stoppers who dominated the penalty saving drills and aerial command tests.',
    content: `Last weekend\'s specialized GK showcase highlighted three outstanding shot-stoppers who dominated the penalty saving drills and aerial command tests.

The showcase brought together the league's top goalkeeper talents for a day of specialized drills under the watch of professional goalkeeper coaches and scouts. Performance metrics showed high ratings in reaction times, communication, and distribution range.`,
    category: 'Scouting',
    categoryBg: 'bg-[#ddd6fe] text-[#5b21b6]',
    date: 'May 23, 2026',
    readTime: '5 min read',
    comments: 9,
    image: '/images/slider/foot.jpg'
  }
];
