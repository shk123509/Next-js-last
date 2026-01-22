"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { cn } from "@/lib/utils"; 

const movinfCards = () => {
// ... testimonials array remains the same ...
const testimonials: { quote: string; name: string; title: string; }[] = [
  {
    quote: "I swear this tool saved me from burnout. Earlier managing tasks felt like juggling knives blindfolded. Now everything is organized like a military camp. Fresh UI, crazy smooth performance & my team thinks I became smarter — but shhh, it's the tool!",
    name: "Jonathan Reed",
    title: "Senior Software Engineer, USA"
  },
  {
    quote: "I opened the dashboard and first reaction — WOW, this is sexy! The workflow feels like Netflix binge, you don’t want to stop. I shipped 3 features in a day, my boss thought I cloned myself. Highly addictive in a good way.",
    name: "Emma Wilson",
    title: "Product Designer, UK"
  },
  {
    quote: "As a founder, I love anything that saves me money & time. This tool cut repetitive work by 60%. Investors thought we hired extra staff 😂. Fast, scalable & surprisingly simple even for non-tech people.",
    name: "Carlos Hernández",
    title: "Startup Founder, Mexico"
  },
  {
    quote: "Before using this, documentation felt like reading ancient Sanskrit. Now even complex pipelines look like smooth butter. UI animations are chef’s kiss & performance is rocket level.",
    name: "Hiroshi Tanaka",
    title: "DevOps Engineer, Japan"
  },
  {
    quote: "It feels like the perfect balance of tech + productivity + aesthetics. Onboarding a new intern used to take 2 weeks, now it takes coffee time ☕. My workflow anxiety reduced big time.",
    name: "Sofia Rossi",
    title: "Project Manager, Italy"
  },
  {
    quote: "I’ve tried dozens of tools, all either boring or confusing. But this one? Feels fun, fresh, and friendly. I laughed at the loading text, fell in love with features, now I’m loyal for life.",
    name: "Liam Murphy",
    title: "Frontend Developer, Ireland"
  },
  {
    quote: "When I say it’s smooth, I mean butter-on-a-hot-pan smooth. No lag, no drama. My cat walked on the keyboard once, still nothing broke. That’s how stable it is!",
    name: "Anya Petrova",
    title: "Systems Architect, Russia"
  },
  {
    quote: "Team collaboration improved so much that we stopped fighting in meetings 😂. Sharing, reviewing & approving tasks now feels effortless. Deadlines don’t scare us anymore.",
    name: "Michael Anderson",
    title: "Team Lead, Canada"
  },
  {
    quote: "Our productivity graph literally went up like a crypto chart in 2021. Reports look clean, automation works flawlessly & clients respond faster than ever.",
    name: "Chloe Martin",
    title: "Business Analyst, France"
  },
  {
    quote: "The thing I love the most? Zero overthinking. Everything is where it should be. Keyboard shortcuts make me feel like a hacker from Hollywood movies.",
    name: "Gabriel Souza",
    title: "Full Stack Developer, Brazil"
  },
  {
    quote: "This tool is that reliable friend who never cancels weekend plans. Stable, responsive & super innovative features. My old tools now feel like Nokia in iPhone era.",
    name: "Sarah Johnson",
    title: "Cybersecurity Specialist, USA"
  },
  {
    quote: "We scaled from 3 to 40 members and workflow still feels calm like meditation. Real-time collaboration is magic. Love it more every update.",
    name: "David Becker",
    title: "CTO, Germany"
  },
  {
    quote: "Integrated it into my workflow & boom — chaos disappeared. Reports got cleaner, tasks aligned, team communicated better. It’s like therapy for business.",
    name: "Jasmine Lee",
    title: "Operations Director, Singapore"
  },
  {
    quote: "Used it for 3 days & now I’m like — how did I survive without this? It organizes work better than my brain organizes thoughts 💀.",
    name: "Oliver Grant",
    title: "QA Engineer, Australia"
  },
  {
    quote: "Best part? No boring UI. It actually feels fun to work. I open it more than Instagram now, which says a LOT.",
    name: "Nora Novak",
    title: "Product Researcher, Poland"
  },
  {
    quote: "Our dashboards used to look like chaos & numbers. Now it's visual candy — charts, graphs, everything beautifully readable. CEO smiled for the first time in months.",
    name: "Ethan Wright",
    title: "Data Scientist, New Zealand"
  },
  {
    quote: "Automation features alone justified the subscription. It handles repetitive tasks like a loyal assistant who never sleeps. I can finally go home early.",
    name: "Amir Faisal",
    title: "Cloud Architect, UAE"
  },
  {
    quote: "My freelance workflow finally became organized. No more last-minute panic emails. Clients think I’m newly disciplined but truth is — the tool is the hero.",
    name: "Mia Carter",
    title: "Freelance Web Developer, USA"
  },
  {
    quote: "Feels premium, works fast, looks modern. I was impressed how smoothly it integrates with existing tools. Zero bugs even during late-night deadlines!",
    name: "Luis Ortega",
    title: "Backend Engineer, Spain"
  },
  {
    quote: "It reduced our meeting time drastically. Updates & progress tracking are so clear that we don't waste hours explaining things anymore. Peace restored in team group chats.",
    name: "Hannah Kim",
    title: "Scrum Master, South Korea"
  },
  {
    quote: "We migrated huge projects without tears. No crashes, no nightmares. UI feels friendly enough that even non-tech departments use it confidently.",
    name: "Marcus Brown",
    title: "Enterprise Software Lead, South Africa"
  },
  {
    quote: "Real-time sync feels like magic tricks happening on screen. You drag something here & it updates everywhere instantly. Pure engineering elegance.",
    name: "Emily Davis",
    title: "Machine Learning Engineer, USA"
  },
  {
    quote: "Tried switching back to old tools for one day. Biggest regret. Everything felt slow & outdated. Came running back instantly.",
    name: "Jorge Alvarez",
    title: "Senior DevOps, Chile"
  },
  {
    quote: "My favorite feature is the ease of collaboration. Comments, mentions, task linking — all smooth. Feels like Google Docs + Jira + Notion had a genius baby.",
    name: "Isabella Costa",
    title: "Product Strategist, Portugal"
  },
  {
    quote: "It even handles messy codebases & big files without sweating. Dark mode looks so cool, my eyes said thank you.",
    name: "Daniel White",
    title: "Technical Lead, Scotland"
  },
  {
    quote: "The UI is so aesthetic I keep screensharing just to flex it in client calls. Instant impression booster!",
    name: "Ava Thompson",
    title: "Brand Consultant, Sweden"
  },
  {
    quote: "Helped us double delivery speed. Bug reporting got clearer, sprint planning cleaner. Team motivation is up like festival season.",
    name: "Zhang Wei",
    title: "Agile Coach, China"
  },
  {
    quote: "Not joking — the tool feels like caffeine boost for workflow. You open it & productivity auto-starts. No energy drink required.",
    name: "Luke Morgan",
    title: "Game Developer, USA"
  },
  {
    quote: "My business started feeling structured, calm and scalable. Sales team loves the CRM flow, dev team loves automation, and I love extra sleep.",
    name: "Maria Lopez",
    title: "Business Owner, Argentina"
  },
  {
    quote: "Finally a tool that doesn't make me cry during deadlines. Stable servers, quick loading & the UI makes stress bearable. 11/10 would recommend.",
    name: "Arthur King",
    title: "AI Researcher, UK"
  }
];


  return (
     <div className="py-20 w-full bg-black"> 
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Here Our Harmoni : Voices of Success
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
            "h-[40rem] rounded-xl flex flex-col antialiased items-center justify-center relative overflow-hidden shadow-2xl",
            "bg-black" 
        )}>
            {/* Grid Background Layer */}
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)]",
                )}
            />
            {/* Radial Gradient Fade Layer */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            
            {/* The InfiniteMovingCards component */}
            <div className="relative z-10">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                // Assuming InfiniteMovingCards accepts a className prop to style the *individual cards*
                // We set card background to black/dark and text to white/light.
                className="bg-neutral-900" 
              />
            </div>

        </div>
      </div>
     </div>
  )
}

export default movinfCards