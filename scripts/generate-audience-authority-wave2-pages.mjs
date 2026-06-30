import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_FILE = "lib/landing-pages/content/audience-authority-wave2-content.ts";
const ASSEMBLY_FILE = "lib/landing-pages/audience-authority-wave2-pages.ts";
const REGISTER_FN = "registerAudienceAuthorityWave2Pages";

const PAGES = [
  {
    slug: "pregame-games",
    title: "Pregame Games",
    category: "Party",
    audience: "Friend groups warming up before a night out, house party, or celebration",
    searchIntent:
      "Find quick pregame games with anonymous phone voting before the main event starts.",
    priority: 33,
    clusters: ["party", "friendship", "audience"],
    h1: "Pregame Games",
    metaTitle: "Pregame Games | Phone Voting Before the Party | FriendRank",
    metaDescription:
      "Create pregame games on FriendRank. Warm up the group with anonymous voting, funny roles, and shareable results before the night out.",
    intentSummaryTitle: "What are pregame games?",
    intentSummary:
      "Pregame games get everyone in the same mood before the real party starts. FriendRank turns the warm-up into a browser voting game: add friends, share one link, vote anonymously on funny pregame roles, and reveal results together while you get ready. Works for house pregames, group chats, and rideshare waits. No app download needed.",
    whyFriendRankTitle: "Why FriendRank works for pregames",
    exampleQuestionsTitle: "Popular pregame game questions",
    faqTitle: "Pregame games FAQ",
    schemaDescription:
      "Create pregame games with FriendRank. Warm up the group with anonymous voting and shareable results before the party. No signup required.",
    heroSubtitle:
      "Start the night with a quick voting game. Add friends, share one link, vote anonymously, and reveal funny pregame roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank while everyone gets ready. Share the link in the group chat and vote before you head out.",
    exampleQuestionsIntro:
      "Need inspiration? Here are pregame questions your group can vote on.",
    finalCtaTitle: "Start your pregame",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the Uber arrives.",
    ctaLabel: "Create Pregame Game",
    vibeTags: ["Party", "College", "Discord"],
    tone: "Funny",
    categories: ["Who gets ready the fastest", "Who picks the best pregame playlist", "Who hypes the group up"],
    questions: [
      "Who is most likely to suggest one more pregame round?",
      "Who would pick the best getting-ready playlist?",
      "Who is most likely to arrive fashionably late?",
      "Who would hype the group up before leaving?",
      "Who is most likely to forget something and run back inside?",
      "Who would take the best pregame selfie?",
      "Who is most likely to start the group toast early?",
      "Who would plan the best after-party move?",
      "Who is most likely to know every bouncer in town?",
      "Who would win a quick trivia round before heading out?",
      "Who is most likely to suggest a group photo in the mirror?",
      "Who would keep the energy up in the rideshare?",
      "Who is most likely to have the best outfit reveal?",
      "Who would remember everyone's drink order?",
      "Who is most likely to make the whole group laugh before you leave?",
    ],
    faqAudience: "pregame games",
    faqContext: "house pregames, group chats, and getting-ready hangouts",
    overlapNote: "Replaces girls-night-games — live girls-night-game already covers that intent.",
  },
  {
    slug: "boys-night-games",
    title: "Boys Night Games",
    category: "Party",
    audience: "Guys nights, bachelor hangs, and male friend groups",
    searchIntent: "Find browser games for boys night with anonymous voting and one shared link.",
    priority: 32,
    clusters: ["party", "friendship", "audience"],
    h1: "Boys Night Games",
    metaTitle: "Boys Night Games | Group Voting Game | FriendRank",
    metaDescription:
      "Create boys night games on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play from any phone.",
    intentSummaryTitle: "What are boys night games?",
    intentSummary:
      "Boys night games need to be quick, competitive, and funny without a complicated setup. FriendRank gives your crew a browser voting game: add names, share one link, vote anonymously on classic guys-night roles, and unlock results together. Perfect for watch parties, poker nights, and weekend hangs. No signup required.",
    whyFriendRankTitle: "Why FriendRank works for boys night",
    exampleQuestionsTitle: "Popular boys night game questions",
    faqTitle: "Boys night games FAQ",
    schemaDescription:
      "Create boys night games with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make guys night more fun with a quick voting game. Share one link, vote anonymously, and reveal funny results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before kickoff or during halftime. Share the link and let everyone vote from their phones.",
    exampleQuestionsIntro: "Need inspiration? Here are boys night questions your group can vote on.",
    finalCtaTitle: "Start your boys night game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for the next hangout.",
    ctaLabel: "Create Boys Night Game",
    vibeTags: ["Party", "Sports", "Discord"],
    tone: "Funny",
    categories: ["Who would win fantasy league trash talk", "Who picks the best watch party snacks", "Who is most competitive"],
    questions: [
      "Who is most likely to start a friendly argument?",
      "Who would win a sports trivia round?",
      "Who is most likely to suggest ordering food?",
      "Who would pick the best watch party playlist?",
      "Who is most likely to fall asleep on the couch first?",
      "Who would tell the best embarrassing story?",
      "Who is most likely to challenge someone to a rematch?",
      "Who would plan the best guys trip?",
      "Who is most likely to quote a movie no one else remembers?",
      "Who would dominate a fantasy league trash talk session?",
      "Who is most likely to suggest one more round?",
      "Who would fix the Wi-Fi before anyone else?",
      "Who is most likely to arrive with the best snacks?",
      "Who would remember every inside joke?",
      "Who is most likely to make the group laugh the hardest?",
    ],
    faqAudience: "boys night games",
    faqContext: "guys nights, watch parties, and male friend hangouts",
  },
  {
    slug: "vacation-games",
    title: "Vacation Games",
    category: "Entertainment",
    audience: "Friend groups on vacation, travel crews, and holiday trips",
    searchIntent: "Find vacation games for travel groups with anonymous phone voting.",
    priority: 31,
    clusters: ["friendship", "entertainment", "audience"],
    h1: "Vacation Games",
    metaTitle: "Vacation Games | Travel Group Voting Game | FriendRank",
    metaDescription:
      "Create vacation games on FriendRank. Vote anonymously on funny travel roles, reveal results together, and play from any phone on your trip.",
    intentSummaryTitle: "What are vacation games?",
    intentSummary:
      "Vacation games turn travel downtime into something memorable. FriendRank works anywhere with phone signal: create a game, share one link, vote anonymously on trip roles, and reveal results together at the hotel, beach, or airport gate. No board games to pack, no app download required.",
    whyFriendRankTitle: "Why FriendRank works on vacation",
    exampleQuestionsTitle: "Popular vacation game questions",
    faqTitle: "Vacation games FAQ",
    schemaDescription:
      "Create vacation games with FriendRank. Vote anonymously on funny travel roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make your trip more fun with a quick voting game. Share one link, vote anonymously, and reveal funny travel roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank during a flight delay or beach afternoon. Share the link and let the travel group vote.",
    exampleQuestionsIntro: "Need inspiration? Here are vacation questions your group can vote on.",
    finalCtaTitle: "Start your vacation game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready anywhere your group travels.",
    ctaLabel: "Create Vacation Game",
    vibeTags: ["Party", "College", "Family"],
    tone: "Funny",
    categories: ["Who would get lost without GPS", "Who picks the best vacation playlist", "Who finds the best food spot"],
    questions: [
      "Who is most likely to get sunburned on day one?",
      "Who would find the best local food spot?",
      "Who is most likely to oversleep and miss breakfast?",
      "Who would plan the best day trip?",
      "Who is most likely to pack too much?",
      "Who would take the best vacation photos?",
      "Who is most likely to suggest a spontaneous adventure?",
      "Who would navigate without GPS the longest?",
      "Who is most likely to lose their room key?",
      "Who would win a travel trivia round?",
      "Who is most likely to suggest a group photo at every stop?",
      "Who would remember everyone's flight details?",
      "Who is most likely to bargain at a market?",
      "Who would pick the best pool playlist?",
      "Who is most likely to make the whole trip funnier?",
    ],
    faqAudience: "vacation games",
    faqContext: "friend trips, beach vacations, and travel group chats",
  },
  {
    slug: "road-trip-games",
    title: "Road Trip Games",
    category: "Entertainment",
    audience: "Road trip crews, carpool groups, and long-drive friend groups",
    searchIntent: "Find road trip games with anonymous voting that work from phones in the car.",
    priority: 30,
    clusters: ["friendship", "entertainment", "audience"],
    h1: "Road Trip Games",
    metaTitle: "Road Trip Games | Car Voting Game | FriendRank",
    metaDescription:
      "Create road trip games on FriendRank. Passengers vote anonymously on phones, reveal funny roles, and play together mile by mile.",
    intentSummaryTitle: "What are road trip games?",
    intentSummary:
      "Road trip games break up long drives without distracting the driver. FriendRank runs on phones in the back seat: add names, share one link, vote anonymously on road-trip roles, and reveal results at the next rest stop. Funny enough to kill an hour, simple enough to start in under a minute.",
    whyFriendRankTitle: "Why FriendRank works for road trips",
    exampleQuestionsTitle: "Popular road trip game questions",
    faqTitle: "Road trip games FAQ",
    schemaDescription:
      "Create road trip games with FriendRank. Passengers vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Pass the miles with a quick voting game. Share one link, vote anonymously, and reveal funny road trip roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank when you hit the highway. Passengers vote from their phones while the playlist runs.",
    exampleQuestionsIntro: "Need inspiration? Here are road trip questions your crew can vote on.",
    finalCtaTitle: "Start your road trip game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for the next rest stop.",
    ctaLabel: "Create Road Trip Game",
    vibeTags: ["College", "Family", "Party"],
    tone: "Funny",
    categories: ["Who picks the road trip playlist", "Who needs the most bathroom breaks", "Who navigates best"],
    questions: [
      "Who is most likely to need the most bathroom breaks?",
      "Who would pick the best road trip playlist?",
      "Who is most likely to fall asleep first in the car?",
      "Who would navigate without looking at the phone?",
      "Who is most likely to bring the best snacks?",
      "Who would suggest the weirdest detour?",
      "Who is most likely to sing every lyric wrong?",
      "Who would win a license-plate spotting game?",
      "Who is most likely to spill a drink in the car?",
      "Who would tell the best story on a long drive?",
      "Who is most likely to suggest stopping for food?",
      "Who would remember every turn?",
      "Who is most likely to get car sick?",
      "Who would take the best window selfie?",
      "Who is most likely to make the drive feel shorter?",
    ],
    faqAudience: "road trip games",
    faqContext: "long drives, carpools, and back-seat hangouts",
  },
  {
    slug: "classroom-games",
    title: "Classroom Games",
    category: "Icebreakers",
    audience: "Teachers, students, and classroom groups looking for quick activities",
    searchIntent: "Find classroom games with anonymous phone voting for students and teachers.",
    priority: 29,
    clusters: ["icebreakers", "audience"],
    h1: "Classroom Games",
    metaTitle: "Classroom Games | Student Voting Activity | FriendRank",
    metaDescription:
      "Create classroom games on FriendRank. Quick anonymous voting for students — reveal funny roles and share results together in class.",
    intentSummaryTitle: "What are classroom games?",
    intentSummary:
      "Classroom games should be inclusive, quick, and easy to run without extra equipment. FriendRank turns any lesson break into a phone voting activity: add student names, share one link, vote anonymously on light classroom roles, and reveal results together. Works for first-day icebreakers, end-of-term fun, and group projects. No accounts required.",
    whyFriendRankTitle: "Why FriendRank works in classrooms",
    exampleQuestionsTitle: "Popular classroom game questions",
    faqTitle: "Classroom games FAQ",
    schemaDescription:
      "Create classroom games with FriendRank. Students vote anonymously on phones and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make class more engaging with a quick voting game. Share one link, vote anonymously, and reveal funny classroom roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank at the start of class or during a break. Students vote from their phones in under five minutes.",
    exampleQuestionsIntro: "Need inspiration? Here are classroom questions your students can vote on.",
    finalCtaTitle: "Start your classroom game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the bell rings.",
    ctaLabel: "Create Classroom Game",
    vibeTags: ["School", "College", "Family"],
    tone: "Wholesome",
    categories: ["Who asks the best questions", "Who helps classmates first", "Who keeps the class laughing"],
    questions: [
      "Who is most likely to raise their hand first?",
      "Who would win a class trivia round?",
      "Who is most likely to help a classmate?",
      "Who would organize the study group?",
      "Who is most likely to forget their homework?",
      "Who would give the best presentation?",
      "Who is most likely to make the class laugh?",
      "Who would remember every due date?",
      "Who is most likely to volunteer for a demo?",
      "Who would pick the best group project idea?",
      "Who is most likely to ask a thoughtful question?",
      "Who would keep the group on task?",
      "Who is most likely to share their notes?",
      "Who would win teacher's helper for a day?",
      "Who is most likely to suggest playing again?",
    ],
    faqAudience: "classroom games",
    faqContext: "school classes, study groups, and teacher-led activities",
  },
  {
    slug: "high-school-games",
    title: "High School Games",
    category: "Entertainment",
    audience: "High school students, teen friend groups, and school social circles",
    searchIntent: "Find high school games with anonymous voting for teen friend groups.",
    priority: 28,
    clusters: ["entertainment", "friendship", "audience"],
    h1: "High School Games",
    metaTitle: "High School Games | Teen Voting Game | FriendRank",
    metaDescription:
      "Create high school games on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play together from any phone.",
    intentSummaryTitle: "What are high school games?",
    intentSummary:
      "High school games work best when they are phone-native and shareable in the group chat. FriendRank gives teen friend groups a browser voting game: add names, share one link, vote anonymously on high-school-life roles, and unlock results together at lunch or after school. No app download or account needed.",
    whyFriendRankTitle: "Why FriendRank works for high school groups",
    exampleQuestionsTitle: "Popular high school game questions",
    faqTitle: "High school games FAQ",
    schemaDescription:
      "Create high school games with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make lunch or after-school hangs more fun with a quick voting game. Share one link and vote anonymously together.",
    playImmediatelyBody:
      "Create a game on FriendRank between classes or after school. Share the link in the group chat and let everyone vote.",
    exampleQuestionsIntro: "Need inspiration? Here are high school questions your friends can vote on.",
    finalCtaTitle: "Start your high school game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your friend group chat.",
    ctaLabel: "Create High School Game",
    vibeTags: ["School", "College", "Discord"],
    tone: "Funny",
    categories: ["Who is most likely to become class president", "Who has the best group chat memes", "Who would plan prom"],
    questions: [
      "Who is most likely to become class president?",
      "Who would plan the best promposal?",
      "Who is most likely to know everyone's drama?",
      "Who would pick the best lunch table playlist?",
      "Who is most likely to ace a pop quiz?",
      "Who would organize the friend group photo?",
      "Who is most likely to fall asleep in class?",
      "Who would win a school spirit contest?",
      "Who is most likely to start a trend?",
      "Who would give the best advice?",
      "Who is most likely to forget their locker combo?",
      "Who would survive finals week on snacks alone?",
      "Who is most likely to make everyone laugh in the hallway?",
      "Who would plan the best weekend hangout?",
      "Who is most likely to become a meme in the group chat?",
    ],
    faqAudience: "high school games",
    faqContext: "teen friend groups, lunch tables, and after-school hangouts",
  },
  {
    slug: "middle-school-games",
    title: "Middle School Games",
    category: "Entertainment",
    audience: "Middle school students, youth groups, and younger teen friend circles",
    searchIntent: "Find middle school games with anonymous voting for younger teen groups.",
    priority: 27,
    clusters: ["entertainment", "icebreakers", "audience"],
    h1: "Middle School Games",
    metaTitle: "Middle School Games | Fun Group Vote | FriendRank",
    metaDescription:
      "Create middle school games on FriendRank. Wholesome anonymous voting, funny roles, and shareable results for younger groups.",
    intentSummaryTitle: "What are middle school games?",
    intentSummary:
      "Middle school games should be fun, inclusive, and easy to start during lunch or at a sleepover. FriendRank gives younger groups a browser voting game: add names, share one link, vote anonymously on silly roles, and reveal results together. Wholesome enough for school friends, funny enough to share in the group chat.",
    whyFriendRankTitle: "Why FriendRank works for middle school groups",
    exampleQuestionsTitle: "Popular middle school game questions",
    faqTitle: "Middle school games FAQ",
    schemaDescription:
      "Create middle school games with FriendRank. Wholesome anonymous voting with shareable results. No signup required.",
    heroSubtitle:
      "Make hangouts more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal results together.",
    playImmediatelyBody:
      "Create a game on FriendRank at lunch or during a sleepover. Share the link and let everyone vote from their phones.",
    exampleQuestionsIntro: "Need inspiration? Here are middle school questions your group can vote on.",
    finalCtaTitle: "Start your middle school game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your friend group.",
    ctaLabel: "Create Middle School Game",
    vibeTags: ["School", "Family", "Party"],
    tone: "Wholesome",
    categories: ["Who is the best team player", "Who makes everyone laugh", "Who remembers everyone's birthday"],
    questions: [
      "Who is most likely to make everyone laugh at lunch?",
      "Who would win a class trivia round?",
      "Who is most likely to share their snacks?",
      "Who would organize the group photo?",
      "Who is most likely to help a friend with homework?",
      "Who would pick the best playlist?",
      "Who is most likely to forget their gym clothes?",
      "Who would plan the best sleepover?",
      "Who is most likely to know everyone's favorite game?",
      "Who would keep the group together?",
      "Who is most likely to volunteer first?",
      "Who would tell the funniest story?",
      "Who is most likely to start an inside joke?",
      "Who would remember every friend's birthday?",
      "Who is most likely to suggest playing again?",
    ],
    faqAudience: "middle school games",
    faqContext: "school lunches, youth hangouts, and younger friend groups",
  },
  {
    slug: "student-orientation-games",
    title: "Student Orientation Games",
    category: "Icebreakers",
    audience: "New students, orientation leaders, and campus welcome groups",
    searchIntent: "Find student orientation games with anonymous voting for new campus groups.",
    priority: 26,
    clusters: ["icebreakers", "friendship", "audience"],
    h1: "Student Orientation Games",
    metaTitle: "Student Orientation Games | Campus Icebreaker | FriendRank",
    metaDescription:
      "Create student orientation games on FriendRank. Help new students connect with anonymous voting and shareable results in minutes.",
    intentSummaryTitle: "What are student orientation games?",
    intentSummary:
      "Student orientation games help new classmates connect without awkward small talk. FriendRank gives orientation leaders a five-minute activity: add names, share one link, vote anonymously on light campus roles, and reveal results together. Works for dorm meetups, club fairs, and first-week seminars. No signup required.",
    whyFriendRankTitle: "Why FriendRank works for orientation",
    exampleQuestionsTitle: "Popular orientation game questions",
    faqTitle: "Student orientation games FAQ",
    schemaDescription:
      "Create student orientation games with FriendRank. New students vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Help new students connect with a quick voting game. Share one link, vote anonymously, and reveal funny roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank during orientation week. Share the link in the dorm chat or seminar room and let everyone vote.",
    exampleQuestionsIntro: "Need inspiration? Here are orientation questions new students can vote on.",
    finalCtaTitle: "Start your orientation game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for welcome week.",
    ctaLabel: "Create Orientation Game",
    vibeTags: ["College", "School", "Party"],
    tone: "Wholesome",
    categories: ["Who would join the most clubs", "Who makes friends fastest", "Who knows campus already"],
    questions: [
      "Who is most likely to join five clubs at once?",
      "Who would make friends in the first hour?",
      "Who is most likely to get lost on campus?",
      "Who would win an orientation trivia round?",
      "Who is most likely to remember everyone's name?",
      "Who would plan the first weekend hangout?",
      "Who is most likely to ask the best question?",
      "Who would organize the dorm group chat?",
      "Who is most likely to explore campus first?",
      "Who would give the best campus tips?",
      "Who is most likely to become orientation friends forever?",
      "Who would pick the best dining hall order?",
      "Who is most likely to suggest a study group?",
      "Who would take the best welcome-week photos?",
      "Who is most likely to make orientation less awkward?",
    ],
    faqAudience: "student orientation games",
    faqContext: "welcome week, dorm meetups, and new student seminars",
  },
  {
    slug: "new-employee-games",
    title: "New Employee Games",
    category: "Teams",
    audience: "HR teams, managers, and new hires in their first weeks",
    searchIntent: "Find new employee games with anonymous voting for welcome sessions.",
    priority: 25,
    clusters: ["teams", "icebreakers", "audience"],
    h1: "New Employee Games",
    metaTitle: "New Employee Games | Welcome Week Icebreaker | FriendRank",
    metaDescription:
      "Create new employee games on FriendRank. Welcome new hires with anonymous voting, light roles, and shareable results in minutes.",
    intentSummaryTitle: "What are new employee games?",
    intentSummary:
      "New employee games help hires feel welcome without forced awkwardness. FriendRank gives managers a quick browser activity: add team names, share one link, vote anonymously on light workplace roles, and reveal results together during welcome week. Professional enough for HR, fun enough that people participate.",
    whyFriendRankTitle: "Why FriendRank works for new employees",
    exampleQuestionsTitle: "Popular new employee game questions",
    faqTitle: "New employee games FAQ",
    schemaDescription:
      "Create new employee games with FriendRank. Welcome new hires with anonymous voting and shareable results. No signup required.",
    heroSubtitle:
      "Welcome new hires with a quick voting game. Share one link, vote anonymously, and reveal light results together.",
    playImmediatelyBody:
      "Create a game on FriendRank during a welcome session. Share the link in Slack or the onboarding calendar invite.",
    exampleQuestionsIntro: "Need inspiration? Here are new employee questions your team can vote on.",
    finalCtaTitle: "Start your new employee game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for welcome week.",
    ctaLabel: "Create New Employee Game",
    vibeTags: ["Office", "College", "Party"],
    tone: "Wholesome",
    categories: ["Who learns the office map fastest", "Who asks the best questions", "Who brings the best lunch"],
    questions: [
      "Who is most likely to learn everyone's name first?",
      "Who would ask the best onboarding question?",
      "Who is most likely to find the best lunch spot?",
      "Who would win a company trivia round?",
      "Who is most likely to set up their desk perfectly?",
      "Who would mentor a fellow new hire?",
      "Who is most likely to join every optional social?",
      "Who would remember every process detail?",
      "Who is most likely to make the team laugh?",
      "Who would organize a new-hire coffee chat?",
      "Who is most likely to suggest a team lunch?",
      "Who would navigate Slack the fastest?",
      "Who is most likely to volunteer for a project?",
      "Who would give the best first-week impression?",
      "Who is most likely to feel at home by day three?",
    ],
    faqAudience: "new employee games",
    faqContext: "welcome week, onboarding sessions, and first-day meetings",
  },
  {
    slug: "onboarding-games",
    title: "Onboarding Games",
    category: "Teams",
    audience: "HR leaders, people ops, and teams running structured onboarding",
    searchIntent: "Find onboarding games with anonymous voting for structured new-hire sessions.",
    priority: 24,
    clusters: ["teams", "audience"],
    h1: "Onboarding Games",
    metaTitle: "Onboarding Games | HR Team Icebreaker | FriendRank",
    metaDescription:
      "Create onboarding games on FriendRank. Structured anonymous voting for new hires — reveal results together in under five minutes.",
    intentSummaryTitle: "What are onboarding games?",
    intentSummary:
      "Onboarding games break up policy slides with something human. FriendRank fits structured onboarding agendas: create a game, share one link in the onboarding portal or meeting chat, vote anonymously on light roles, and reveal results before the next module. Scales from small teams to cohort onboarding without extra tools.",
    whyFriendRankTitle: "Why FriendRank works for onboarding",
    exampleQuestionsTitle: "Popular onboarding game questions",
    faqTitle: "Onboarding games FAQ",
    schemaDescription:
      "Create onboarding games with FriendRank. Structured anonymous voting for new hire cohorts. No signup required.",
    heroSubtitle:
      "Break up onboarding with a quick voting game. Share one link, vote anonymously, and reveal light results together.",
    playImmediatelyBody:
      "Create a game on FriendRank between onboarding modules. Drop the link in the cohort chat and let everyone vote in five minutes.",
    exampleQuestionsIntro: "Need inspiration? Here are onboarding questions your cohort can vote on.",
    finalCtaTitle: "Start your onboarding game",
    finalCtaSubtitle: "Free, browser-based, and ready for your next cohort session.",
    ctaLabel: "Create Onboarding Game",
    vibeTags: ["Office", "College", "Family"],
    tone: "Wholesome",
    categories: ["Who completes training first", "Who asks clarifying questions", "Who connects teammates"],
    questions: [
      "Who is most likely to finish training modules early?",
      "Who would ask the clearest clarifying question?",
      "Who is most likely to connect two teammates?",
      "Who would win an onboarding scavenger hunt?",
      "Who is most likely to remember every policy detail?",
      "Who would suggest the best team intro format?",
      "Who is most likely to share helpful tips in chat?",
      "Who would organize a cohort lunch?",
      "Who is most likely to make onboarding fun?",
      "Who would give the best elevator pitch?",
      "Who is most likely to volunteer for a demo?",
      "Who would help troubleshoot IT setup?",
      "Who is most likely to send a welcome message first?",
      "Who would plan the best cohort social?",
      "Who is most likely to stay engaged through the last slide?",
    ],
    faqAudience: "onboarding games",
    faqContext: "HR onboarding cohorts, people ops sessions, and new-hire training",
  },
  {
    slug: "workshop-games",
    title: "Workshop Games",
    category: "Teams",
    audience: "Facilitators, trainers, and teams running workshops or offsites",
    searchIntent: "Find workshop games with anonymous voting for training sessions and offsites.",
    priority: 23,
    clusters: ["teams", "icebreakers", "audience"],
    h1: "Workshop Games",
    metaTitle: "Workshop Games | Training Session Icebreaker | FriendRank",
    metaDescription:
      "Create workshop games on FriendRank. Warm up training sessions with anonymous voting and shareable results in minutes.",
    intentSummaryTitle: "What are workshop games?",
    intentSummary:
      "Workshop games help facilitators warm up a room before deep work begins. FriendRank gives trainers a browser icebreaker: add participant names, share one link, vote anonymously on workshop roles, and reveal results together before the first exercise. Works in-person and on hybrid calls. No extra apps required.",
    whyFriendRankTitle: "Why FriendRank works for workshops",
    exampleQuestionsTitle: "Popular workshop game questions",
    faqTitle: "Workshop games FAQ",
    schemaDescription:
      "Create workshop games with FriendRank. Warm up training sessions with anonymous voting. No signup required.",
    heroSubtitle:
      "Warm up your workshop with a quick voting game. Share one link, vote anonymously, and reveal results before the agenda starts.",
    playImmediatelyBody:
      "Create a game on FriendRank before your workshop begins. Share the link on the room screen or in the session chat.",
    exampleQuestionsIntro: "Need inspiration? Here are workshop questions participants can vote on.",
    finalCtaTitle: "Start your workshop game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the first slide.",
    ctaLabel: "Create Workshop Game",
    vibeTags: ["Office", "College", "Party"],
    tone: "Wholesome",
    categories: ["Who asks the first question", "Who keeps the energy up", "Who summarizes best"],
    questions: [
      "Who is most likely to ask the first question?",
      "Who would summarize the session best?",
      "Who is most likely to keep the energy up after lunch?",
      "Who would win a workshop trivia round?",
      "Who is most likely to suggest a great breakout idea?",
      "Who would take the best notes?",
      "Who is most likely to connect with every table?",
      "Who would facilitate the best discussion?",
      "Who is most likely to share a useful resource?",
      "Who would organize the group photo?",
      "Who is most likely to volunteer for a demo?",
      "Who would give the most thoughtful feedback?",
      "Who is most likely to stay until the last Q&A?",
      "Who would plan the best follow-up?",
      "Who is most likely to make the workshop memorable?",
    ],
    faqAudience: "workshop games",
    faqContext: "training sessions, offsites, and facilitator-led workshops",
  },
  {
    slug: "conference-icebreaker-games",
    title: "Conference Icebreaker Games",
    category: "Icebreakers",
    audience: "Conference attendees, event hosts, and large professional gatherings",
    searchIntent: "Find conference icebreaker games with anonymous voting for large attendee groups.",
    priority: 22,
    clusters: ["icebreakers", "teams", "audience"],
    h1: "Conference Icebreaker Games",
    metaTitle: "Conference Icebreaker Games | Event Voting Activity | FriendRank",
    metaDescription:
      "Create conference icebreaker games on FriendRank. Large groups vote anonymously on phones and reveal results together before sessions start.",
    intentSummaryTitle: "What are conference icebreaker games?",
    intentSummary:
      "Conference icebreaker games help strangers connect before sessions begin. FriendRank scales to big rooms without passing a mic: create a game, display the link on screen, vote anonymously on light conference roles, and reveal results together in the opening minutes. Works for networking breaks, summits, and company conferences.",
    whyFriendRankTitle: "Why FriendRank works at conferences",
    exampleQuestionsTitle: "Popular conference icebreaker questions",
    faqTitle: "Conference icebreaker games FAQ",
    schemaDescription:
      "Create conference icebreaker games with FriendRank. Large groups vote anonymously on phones. No signup required.",
    heroSubtitle:
      "Break the ice at your conference with a quick voting game. Share one link, vote anonymously, and reveal results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before the keynote. Put the link on screen and let attendees vote during the opening minutes.",
    exampleQuestionsIntro: "Need inspiration? Here are conference questions attendees can vote on.",
    finalCtaTitle: "Start your conference icebreaker",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the first session.",
    ctaLabel: "Create Conference Icebreaker",
    vibeTags: ["Office", "Party", "College"],
    tone: "Wholesome",
    categories: ["Who networks with everyone", "Who asks the best session question", "Who collects the most badges"],
    questions: [
      "Who is most likely to talk to every table?",
      "Who would ask the best session question?",
      "Who is most likely to collect every swag item?",
      "Who would win a conference trivia round?",
      "Who is most likely to schedule the most coffee chats?",
      "Who would take the best event photos?",
      "Who is most likely to suggest the best after-party?",
      "Who would remember every speaker's name?",
      "Who is most likely to live-tweet the keynote?",
      "Who would organize a dinner group?",
      "Who is most likely to arrive early every day?",
      "Who would give the best elevator pitch?",
      "Who is most likely to connect two strangers?",
      "Who would summarize the best session takeaway?",
      "Who is most likely to make the conference fun?",
    ],
    faqAudience: "conference icebreaker games",
    faqContext: "summits, networking events, and large professional gatherings",
  },
  {
    slug: "family-reunion-games",
    title: "Family Reunion Games",
    category: "Entertainment",
    audience: "Extended families, reunion hosts, and multi-generation gatherings",
    searchIntent: "Find family reunion games with anonymous voting for mixed-age relatives.",
    priority: 21,
    clusters: ["entertainment", "friendship", "audience"],
    h1: "Family Reunion Games",
    metaTitle: "Family Reunion Games | Multi-Gen Voting Game | FriendRank",
    metaDescription:
      "Create family reunion games on FriendRank. Relatives vote anonymously on phones, reveal funny family roles, and play together at the reunion.",
    intentSummaryTitle: "What are family reunion games?",
    intentSummary:
      "Family reunion games bring cousins, aunts, and grandparents into the same activity. FriendRank runs on every phone at the picnic: add family names, share one link, vote anonymously on funny reunion roles, and reveal results together before dessert. Wholesome enough for all ages, funny enough to become a new tradition.",
    whyFriendRankTitle: "Why FriendRank works for family reunions",
    exampleQuestionsTitle: "Popular family reunion game questions",
    faqTitle: "Family reunion games FAQ",
    schemaDescription:
      "Create family reunion games with FriendRank. Relatives vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make the reunion more fun with a quick voting game. Share one link, vote anonymously, and reveal funny family roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank when relatives arrive. Share the link at the picnic table and let everyone vote from their phones.",
    exampleQuestionsIntro: "Need inspiration? Here are family reunion questions your relatives can vote on.",
    finalCtaTitle: "Start your family reunion game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for the whole family.",
    ctaLabel: "Create Family Reunion Game",
    vibeTags: ["Family", "Party", "College"],
    tone: "Wholesome",
    categories: ["Who tells the best family stories", "Who brings the best dish", "Who organizes the group photo"],
    questions: [
      "Who is most likely to tell the best family story?",
      "Who would bring the best potluck dish?",
      "Who is most likely to organize the group photo?",
      "Who would win a family trivia round?",
      "Who is most likely to remember every cousin's name?",
      "Who would plan the next reunion?",
      "Who is most likely to start the group chat?",
      "Who would keep the kids entertained?",
      "Who is most likely to share old photos?",
      "Who would give the best toast?",
      "Who is most likely to stay until cleanup?",
      "Who would pick the best reunion playlist?",
      "Who is most likely to teach a family game?",
      "Who would reconnect the most relatives?",
      "Who is most likely to make everyone laugh at dinner?",
    ],
    faqAudience: "family reunion games",
    faqContext: "extended family picnics, reunion weekends, and multi-gen gatherings",
  },
  {
    slug: "holiday-family-games",
    title: "Holiday Family Games",
    category: "Entertainment",
    audience: "Families celebrating holidays together at home or visiting relatives",
    searchIntent: "Find holiday family games with anonymous voting for seasonal gatherings.",
    priority: 20,
    clusters: ["entertainment", "audience"],
    h1: "Holiday Family Games",
    metaTitle: "Holiday Family Games | Seasonal Voting Game | FriendRank",
    metaDescription:
      "Create holiday family games on FriendRank. Vote anonymously on funny seasonal roles and reveal results together at your holiday gathering.",
    intentSummaryTitle: "What are holiday family games?",
    intentSummary:
      "Holiday family games add something fresh to traditions without replacing them. FriendRank gives relatives a browser voting game between meals: add names, share one link, vote anonymously on holiday roles, and reveal results together in the living room. Works for any seasonal gathering when phones are already out.",
    whyFriendRankTitle: "Why FriendRank works for holiday gatherings",
    exampleQuestionsTitle: "Popular holiday family game questions",
    faqTitle: "Holiday family games FAQ",
    schemaDescription:
      "Create holiday family games with FriendRank. Vote anonymously on funny seasonal roles. No signup required.",
    heroSubtitle:
      "Add a new tradition with a quick holiday voting game. Share one link, vote anonymously, and reveal funny results together.",
    playImmediatelyBody:
      "Create a game on FriendRank after dinner or during a lull. Share the link and let relatives vote from the couch.",
    exampleQuestionsIntro: "Need inspiration? Here are holiday family questions your relatives can vote on.",
    finalCtaTitle: "Start your holiday family game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for this year's gathering.",
    ctaLabel: "Create Holiday Family Game",
    vibeTags: ["Family", "Party", "College"],
    tone: "Wholesome",
    categories: ["Who decorates the most", "Who picks the best holiday playlist", "Who tells the best seasonal stories"],
    questions: [
      "Who is most likely to go overboard on decorations?",
      "Who would pick the best holiday playlist?",
      "Who is most likely to tell the best seasonal story?",
      "Who would win a holiday trivia round?",
      "Who is most likely to burn the cookies?",
      "Who would organize the family photo?",
      "Who is most likely to fall asleep after dinner?",
      "Who would give the best gift?",
      "Who is most likely to start a sing-along?",
      "Who would remember every relative's dietary restriction?",
      "Who is most likely to suggest a group game?",
      "Who would keep the kids busy?",
      "Who is most likely to share old holiday photos?",
      "Who would plan next year's gathering?",
      "Who is most likely to make the holiday feel special?",
    ],
    faqAudience: "holiday family games",
    faqContext: "seasonal family gatherings, holiday dinners, and visiting relatives",
  },
  {
    slug: "christmas-family-games",
    title: "Christmas Family Games",
    category: "Entertainment",
    audience: "Families celebrating Christmas together at home or visiting relatives",
    searchIntent: "Find Christmas family games with anonymous voting for holiday gatherings.",
    priority: 19,
    clusters: ["entertainment", "audience"],
    h1: "Christmas Family Games",
    metaTitle: "Christmas Family Games | Holiday Voting Game | FriendRank",
    metaDescription:
      "Create Christmas family games on FriendRank. Vote anonymously on funny holiday roles and reveal results together on Christmas Day.",
    intentSummaryTitle: "What are Christmas family games?",
    intentSummary:
      "Christmas family games give everyone something to do between presents and dinner. FriendRank turns Christmas Day into a phone voting game: add family names, share one link, vote anonymously on festive roles, and reveal results together by the tree. No board games to unwrap, no accounts required.",
    whyFriendRankTitle: "Why FriendRank works on Christmas",
    exampleQuestionsTitle: "Popular Christmas family game questions",
    faqTitle: "Christmas family games FAQ",
    schemaDescription:
      "Create Christmas family games with FriendRank. Vote anonymously on festive roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make Christmas Day more fun with a quick voting game. Share one link, vote anonymously, and reveal festive results together.",
    playImmediatelyBody:
      "Create a game on FriendRank after presents or before dinner. Share the link and let relatives vote from the living room.",
    exampleQuestionsIntro: "Need inspiration? Here are Christmas questions your family can vote on.",
    finalCtaTitle: "Start your Christmas family game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the cookies come out.",
    ctaLabel: "Create Christmas Family Game",
    vibeTags: ["Family", "Party", "College"],
    tone: "Wholesome",
    categories: ["Who wraps gifts the messiest", "Who loves Christmas music most", "Who eats the most cookies"],
    questions: [
      "Who is most likely to shake presents before Christmas?",
      "Who would pick the best Christmas playlist?",
      "Who is most likely to eat the most cookies?",
      "Who would win a Christmas trivia round?",
      "Who is most likely to wear the ugliest sweater proudly?",
      "Who would give the most thoughtful gift?",
      "Who is most likely to fall asleep during a Christmas movie?",
      "Who would organize the family photo by the tree?",
      "Who is most likely to sing every carol?",
      "Who would decorate the tree the fastest?",
      "Who is most likely to burn the roast?",
      "Who would remember every stocking?",
      "Who is most likely to start a snowball fight?",
      "Who would tell the best Christmas story?",
      "Who is most likely to make the whole room laugh?",
    ],
    faqAudience: "Christmas family games",
    faqContext: "Christmas Day gatherings, family dinners, and holiday visits",
  },
  {
    slug: "thanksgiving-games",
    title: "Thanksgiving Games",
    category: "Entertainment",
    audience: "Families and friends gathering for Thanksgiving dinner",
    searchIntent: "Find Thanksgiving games with anonymous voting for holiday dinner groups.",
    priority: 18,
    clusters: ["entertainment", "party", "audience"],
    h1: "Thanksgiving Games",
    metaTitle: "Thanksgiving Games | Holiday Dinner Voting Game | FriendRank",
    metaDescription:
      "Create Thanksgiving games on FriendRank. Vote anonymously on funny holiday roles and reveal results together at the dinner table.",
    intentSummaryTitle: "What are Thanksgiving games?",
    intentSummary:
      "Thanksgiving games keep the table laughing between courses. FriendRank gives your gathering a browser voting game: add names, share one link, vote anonymously on Thanksgiving roles, and reveal results together before pie. Works for family dinners, Friendsgiving, and big holiday tables.",
    whyFriendRankTitle: "Why FriendRank works on Thanksgiving",
    exampleQuestionsTitle: "Popular Thanksgiving game questions",
    faqTitle: "Thanksgiving games FAQ",
    schemaDescription:
      "Create Thanksgiving games with FriendRank. Vote anonymously on funny holiday roles. No signup required.",
    heroSubtitle:
      "Make Thanksgiving dinner more fun with a quick voting game. Share one link, vote anonymously, and reveal results at the table.",
    playImmediatelyBody:
      "Create a game on FriendRank while the turkey rests. Share the link and let everyone vote from their phones at the table.",
    exampleQuestionsIntro: "Need inspiration? Here are Thanksgiving questions your group can vote on.",
    finalCtaTitle: "Start your Thanksgiving game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before dessert.",
    ctaLabel: "Create Thanksgiving Game",
    vibeTags: ["Family", "Party", "College"],
    tone: "Funny",
    categories: ["Who eats the most pie", "Who falls asleep after dinner", "Who gives the best toast"],
    questions: [
      "Who is most likely to eat the most pie?",
      "Who would give the best gratitude toast?",
      "Who is most likely to fall asleep after dinner?",
      "Who would win a Thanksgiving trivia round?",
      "Who is most likely to burn the rolls?",
      "Who would organize the group photo?",
      "Who is most likely to start the food debate?",
      "Who would remember everyone's dietary needs?",
      "Who is most likely to watch football all day?",
      "Who would plan the best Friendsgiving?",
      "Who is most likely to take the best food photo?",
      "Who would clean up without being asked?",
      "Who is most likely to suggest seconds?",
      "Who would tell the best family story?",
      "Who is most likely to make the table laugh?",
    ],
    faqAudience: "Thanksgiving games",
    faqContext: "Thanksgiving dinner, Friendsgiving, and holiday tables",
  },
  {
    slug: "graduation-party-games",
    title: "Graduation Party Games",
    category: "Party",
    audience: "Graduation hosts, families, and friends celebrating a graduate",
    searchIntent: "Find graduation party games with anonymous voting for celebration guests.",
    priority: 17,
    clusters: ["party", "audience"],
    h1: "Graduation Party Games",
    metaTitle: "Graduation Party Games | Celebration Voting Game | FriendRank",
    metaDescription:
      "Create graduation party games on FriendRank. Guests vote anonymously on funny grad roles and reveal shareable results at the party.",
    intentSummaryTitle: "What are graduation party games?",
    intentSummary:
      "Graduation party games celebrate the grad with something interactive. FriendRank turns the party into a phone voting game: add names, share one link, vote anonymously on graduation roles, and reveal results together in the backyard or group chat. Perfect for high school, college, and family celebrations.",
    whyFriendRankTitle: "Why FriendRank works for graduation parties",
    exampleQuestionsTitle: "Popular graduation party game questions",
    faqTitle: "Graduation party games FAQ",
    schemaDescription:
      "Create graduation party games with FriendRank. Guests vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Celebrate the grad with a quick voting game. Share one link, vote anonymously, and reveal funny graduation roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank before guests arrive. Share the link and let everyone vote during the party.",
    exampleQuestionsIntro: "Need inspiration? Here are graduation party questions guests can vote on.",
    finalCtaTitle: "Start your graduation party game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the cap toss.",
    ctaLabel: "Create Graduation Party Game",
    vibeTags: ["Party", "College", "Family"],
    tone: "Funny",
    categories: ["Who gives the best toast", "Who is most likely to cry", "Who planned the best party"],
    questions: [
      "Who is most likely to cry during the toast?",
      "Who would give the best graduation speech?",
      "Who is most likely to throw the cap the highest?",
      "Who would plan the best after-party?",
      "Who is most likely to photobomb every picture?",
      "Who would win a grad trivia round?",
      "Who is most likely to keep the party going?",
      "Who would remember every embarrassing school story?",
      "Who is most likely to suggest a group photo?",
      "Who would pick the best celebration playlist?",
      "Who is most likely to give the most heartfelt gift?",
      "Who would organize the surprise?",
      "Who is most likely to start the dance floor?",
      "Who would tell the funniest school story?",
      "Who is most likely to make the grad feel like a star?",
    ],
    faqAudience: "graduation party games",
    faqContext: "graduation celebrations, backyard parties, and family gatherings",
  },
  {
    slug: "baby-shower-games",
    title: "Baby Shower Games",
    category: "Party",
    audience: "Baby shower hosts, expecting parents, and celebration guests",
    searchIntent: "Find baby shower games with anonymous voting for shower guests.",
    priority: 16,
    clusters: ["party", "relationships", "audience"],
    h1: "Baby Shower Games",
    metaTitle: "Baby Shower Games | Celebration Voting Game | FriendRank",
    metaDescription:
      "Create baby shower games on FriendRank. Guests vote anonymously on funny shower roles and reveal shareable results together.",
    intentSummaryTitle: "What are baby shower games?",
    intentSummary:
      "Baby shower games should be sweet, funny, and easy to run without printed worksheets. FriendRank gives hosts a browser voting game: add guest names, share one link, vote anonymously on baby-shower roles, and reveal results together before gifts. Works for co-ed showers, brunches, and virtual celebrations.",
    whyFriendRankTitle: "Why FriendRank works for baby showers",
    exampleQuestionsTitle: "Popular baby shower game questions",
    faqTitle: "Baby shower games FAQ",
    schemaDescription:
      "Create baby shower games with FriendRank. Guests vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make the shower more fun with a quick voting game. Share one link, vote anonymously, and reveal funny results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before guests arrive. Share the link at the brunch table or in the shower group chat.",
    exampleQuestionsIntro: "Need inspiration? Here are baby shower questions guests can vote on.",
    finalCtaTitle: "Start your baby shower game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the gifts are opened.",
    ctaLabel: "Create Baby Shower Game",
    vibeTags: ["Family", "Party", "Soft drama"],
    tone: "Wholesome",
    categories: ["Who gives the best parenting advice", "Who picks the cutest gift", "Who cries first"],
    questions: [
      "Who is most likely to cry during gift opening?",
      "Who would give the best parenting advice?",
      "Who is most likely to pick the cutest outfit?",
      "Who would win a baby trivia round?",
      "Who is most likely to organize the group photo?",
      "Who would tell the funniest childhood story?",
      "Who is most likely to suggest the best baby name?",
      "Who would remember every guest's gift?",
      "Who is most likely to offer to babysit first?",
      "Who would plan the best diaper game?",
      "Who is most likely to bring the most thoughtful gift?",
      "Who would keep the party energy up?",
      "Who is most likely to share the best advice?",
      "Who would take the best candid photos?",
      "Who is most likely to make the parents feel supported?",
    ],
    faqAudience: "baby shower games",
    faqContext: "baby shower brunches, co-ed showers, and celebration guests",
  },
  {
    slug: "bridal-shower-games",
    title: "Bridal Shower Games",
    category: "Party",
    audience: "Bridal shower hosts, wedding parties, and celebration guests",
    searchIntent: "Find bridal shower games with anonymous voting for wedding celebrations.",
    priority: 15,
    clusters: ["party", "relationships", "audience"],
    h1: "Bridal Shower Games",
    metaTitle: "Bridal Shower Games | Wedding Party Voting Game | FriendRank",
    metaDescription:
      "Create bridal shower games on FriendRank. Guests vote anonymously on funny bridal roles and reveal shareable results at the shower.",
    intentSummaryTitle: "What are bridal shower games?",
    intentSummary:
      "Bridal shower games should feel special without complicated setup. FriendRank gives the wedding party a browser voting game: add names, share one link, vote anonymously on bridal-shower roles, and reveal results together over brunch. Distinct from the bachelorette — sweeter tone, mixed guest lists, and family-friendly fun.",
    whyFriendRankTitle: "Why FriendRank works for bridal showers",
    exampleQuestionsTitle: "Popular bridal shower game questions",
    faqTitle: "Bridal shower games FAQ",
    schemaDescription:
      "Create bridal shower games with FriendRank. Guests vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make the bridal shower more fun with a quick voting game. Share one link, vote anonymously, and reveal funny bridal roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank before brunch starts. Share the link and let guests vote from their phones.",
    exampleQuestionsIntro: "Need inspiration? Here are bridal shower questions guests can vote on.",
    finalCtaTitle: "Start your bridal shower game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for the wedding party.",
    ctaLabel: "Create Bridal Shower Game",
    vibeTags: ["Soft drama", "Party", "Family"],
    tone: "Wholesome",
    categories: ["Who knows the bride best", "Who gives the best toast", "Who planned the best shower"],
    questions: [
      "Who knows the bride the best?",
      "Who would give the sweetest toast?",
      "Who is most likely to cry during gift opening?",
      "Who would win a how-well-do-you-know-the-bride round?",
      "Who is most likely to suggest the best honeymoon idea?",
      "Who would organize the group photo?",
      "Who is most likely to tell the best couple story?",
      "Who would pick the best shower playlist?",
      "Who is most likely to give the most thoughtful gift?",
      "Who would plan the best bachelorette backup plan?",
      "Who is most likely to offer the best marriage advice?",
      "Who would remember every registry item?",
      "Who is most likely to make the bride laugh?",
      "Who would take the best candid photos?",
      "Who is most likely to make the shower unforgettable?",
    ],
    faqAudience: "bridal shower games",
    faqContext: "bridal shower brunches, wedding parties, and celebration guests",
  },
  {
    slug: "reunion-games",
    title: "Reunion Games",
    category: "Friendship",
    audience: "Friend groups, alumni crews, and class reunions reconnecting after time apart",
    searchIntent: "Find reunion games for friend and alumni groups with anonymous phone voting.",
    priority: 14,
    clusters: ["friendship", "entertainment", "audience"],
    h1: "Reunion Games",
    metaTitle: "Reunion Games | Alumni & Friend Group Vote | FriendRank",
    metaDescription:
      "Create reunion games on FriendRank. Old friends vote anonymously on phones, reveal funny roles, and reconnect through shared results.",
    intentSummaryTitle: "What are reunion games?",
    intentSummary:
      "Reunion games help old friends pick up where they left off. FriendRank gives alumni and friend crews a browser voting game: add names, share one link, vote anonymously on reunion roles, and reveal results together at the bar or group chat. Works for class reunions, camp reunions, and friend-group trips — distinct from family reunion gatherings.",
    whyFriendRankTitle: "Why FriendRank works for reunions",
    exampleQuestionsTitle: "Popular reunion game questions",
    faqTitle: "Reunion games FAQ",
    schemaDescription:
      "Create reunion games with FriendRank. Old friends vote anonymously and reveal shareable results. No signup required.",
    heroSubtitle:
      "Reconnect with a quick voting game. Share one link, vote anonymously, and reveal funny reunion roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank before the reunion dinner. Share the link and let old friends vote from their phones.",
    exampleQuestionsIntro: "Need inspiration? Here are reunion questions your group can vote on.",
    finalCtaTitle: "Start your reunion game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for old friends.",
    ctaLabel: "Create Reunion Game",
    vibeTags: ["College", "Party", "Family"],
    tone: "Funny",
    categories: ["Who changed the least", "Who has the best stories now", "Who would plan the next reunion"],
    questions: [
      "Who is most likely to look exactly the same?",
      "Who would tell the best update story?",
      "Who is most likely to remember every inside joke?",
      "Who would plan the next reunion?",
      "Who is most likely to bring the old photos?",
      "Who would win a reunion trivia round?",
      "Who is most likely to suggest a group photo?",
      "Who would pick the best reunion playlist?",
      "Who is most likely to stay out the latest?",
      "Who would reconnect with the most people?",
      "Who is most likely to start the nostalgia spiral?",
      "Who would organize the after-party?",
      "Who is most likely to share the wildest update?",
      "Who would remember every name from school?",
      "Who is most likely to make the reunion feel like no time passed?",
    ],
    faqAudience: "reunion games",
    faqContext: "class reunions, alumni meetups, and old friend group trips",
  },
];

function slugToPrefix(slug) {
  return slug.toUpperCase().replace(/-/g, "_");
}

function slugToCamel(slug) {
  return slug
    .split("-")
    .map((part, index) =>
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
}

function slugToPascal(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function slugToCtaLocation(slug) {
  return `landing_${slug.replace(/-/g, "_")}`;
}

function buildFaq(page) {
  return [
    {
      question: `What are ${page.faqAudience}?`,
      answer: `${page.faqAudience.charAt(0).toUpperCase()}${page.faqAudience.slice(1)} on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for ${page.faqContext}.`,
    },
    {
      question: `Can we play ${page.faqAudience} on phones?`,
      answer:
        "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. Votes stay private to each person. The group only sees winners and story-style results.",
    },
    {
      question: "Do players need accounts?",
      answer:
        "No signup required. One person creates the game and shares the link.",
    },
    {
      question: "Can I customize the questions?",
      answer:
        "Yes. Enter up to three custom prompts when you create the game.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. Players vote from their phones in any browser.",
    },
    {
      question: "How many people can play?",
      answer:
        "Add two to eight names when you set up the game. Everyone with the link can vote.",
    },
    {
      question: "When do results unlock?",
      answer:
        "After enough votes are in, results open on the same link for the whole group.",
    },
  ];
}

function generateContentFile() {
  const lines = [
    'import type { LandingPageFaqItem } from "@/lib/landing-pages/landing-page-types";',
    'import type { LandingPageCta } from "@/lib/landing-pages/landing-page-types";',
    'import type { LandingPageGamePreset } from "@/lib/landing-pages/landing-page-types";',
    'import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";',
    'import { INTENT_VERSION } from "@/lib/landing-pages/content/version";',
    'import { AUDIENCE_VERSION } from "@/lib/landing-pages/content/version";',
    'import { FAQ_VERSION } from "@/lib/landing-pages/content/version";',
    'import { QUESTION_VERSION } from "@/lib/landing-pages/content/version";',
    'import { CTA_VERSION } from "@/lib/landing-pages/content/version";',
    "",
    "/** Audience authority landing page definitions — Phase 7G Sprint 2. */",
    "",
  ];

  for (const page of PAGES) {
    const prefix = slugToPrefix(page.slug);
    lines.push(`/** @see INTENT_VERSION */`);
    lines.push(`export const ${prefix}_INTENT = {`);
    lines.push(`  slug: "${page.slug}",`);
    lines.push(`  title: "${page.title}",`);
    lines.push(`  metaTitle: "${page.metaTitle}",`);
    lines.push(`  metaDescription:`);
    lines.push(`    "${page.metaDescription}",`);
    lines.push(`  h1: "${page.h1}",`);
    lines.push(`  intentSummaryTitle: "${page.intentSummaryTitle}",`);
    lines.push(`  intentSummary:`);
    lines.push(`    "${page.intentSummary}",`);
    lines.push(`  whyFriendRankTitle: "${page.whyFriendRankTitle}",`);
    lines.push(`  exampleQuestionsTitle: "${page.exampleQuestionsTitle}",`);
    lines.push(`  faqTitle: "${page.faqTitle}",`);
    lines.push(`  schemaDescription:`);
    lines.push(`    "${page.schemaDescription}",`);
    lines.push(`  ctaLocation: "${slugToCtaLocation(page.slug)}" as const,`);
    lines.push(`  gamePreset: {`);
    lines.push(`    suggestedCustomCategories: [`);
    for (const category of page.categories) {
      lines.push(`      "${category}",`);
    }
    lines.push(`    ],`);
    lines.push(
      `    suggestedVibeTags: [${page.vibeTags.map((tag) => `"${tag}"`).join(", ")}],`,
    );
    lines.push(`    suggestedTone: "${page.tone}",`);
    lines.push(`  } satisfies LandingPageGamePreset,`);
    lines.push(`};`);
    lines.push("");

    lines.push(`/** @see AUDIENCE_VERSION */`);
    lines.push(`export const ${prefix}_AUDIENCE = {`);
    lines.push(`  heroSubtitle:`);
    lines.push(`    "${page.heroSubtitle}",`);
    lines.push(`  playImmediatelyBody:`);
    lines.push(`    "${page.playImmediatelyBody}",`);
    lines.push(`  exampleQuestionsIntro:`);
    lines.push(`    "${page.exampleQuestionsIntro}",`);
    lines.push(`  finalCtaTitle: "${page.finalCtaTitle}",`);
    lines.push(`  finalCtaSubtitle:`);
    lines.push(`    "${page.finalCtaSubtitle}",`);
    lines.push(`} as const;`);
    lines.push("");

    lines.push(`/** @see CTA_VERSION */`);
    lines.push(`export const ${prefix}_PRIMARY_CTA: LandingPageCta = {`);
    lines.push(`  label: "${page.ctaLabel}",`);
    lines.push(`  href: CREATE_GAME_HREF,`);
    lines.push(`};`);
    lines.push("");

    lines.push(`/** @see QUESTION_VERSION */`);
    lines.push(`export const ${prefix}_QUESTIONS = [`);
    for (const question of page.questions) {
      lines.push(`  { text: "${question}" },`);
    }
    lines.push(`];`);
    lines.push("");

    lines.push(`/** @see FAQ_VERSION */`);
    lines.push(
      `export const ${prefix}_FAQ: LandingPageFaqItem[] = ${JSON.stringify(buildFaq(page), null, 2)};`,
    );
    lines.push("");
  }

  lines.push("export const AUDIENCE_AUTHORITY_WAVE2_PAGE_SLUGS = [");
  for (const page of PAGES) {
    lines.push(`  "${page.slug}",`);
  }
  lines.push("] as const;");
  lines.push("");

  fs.writeFileSync(path.join(ROOT, CONTENT_FILE), lines.join("\n"));
}

function generateAssemblyFile() {
  const imports = [];
  for (const page of PAGES) {
    const prefix = slugToPrefix(page.slug);
    imports.push(`${prefix}_INTENT`);
    imports.push(`${prefix}_AUDIENCE`);
    imports.push(`${prefix}_PRIMARY_CTA`);
    imports.push(`${prefix}_FAQ`);
    imports.push(`${prefix}_QUESTIONS`);
  }

  const firstPrefix = slugToPrefix(PAGES[0].slug);
  const assembly = [
    'import type { CtaLocation } from "@/lib/analytics";',
    'import type {',
    '  LandingPageCta,',
    '  LandingPageData,',
    '  LandingPageExampleQuestion,',
    '  LandingPageFaqItem,',
    '  LandingPageGamePreset,',
    '} from "@/lib/landing-pages/landing-page-types";',
    "import {",
    ...imports.map((item) => `  ${item},`),
    '} from "@/lib/landing-pages/content/audience-authority-wave2-content";',
    "",
    "type AudienceAuthorityWave2AssemblyInput = {",
    "  assembleLandingPage: (input: {",
    `    intent: typeof ${firstPrefix}_INTENT;`,
    `    audience: typeof ${firstPrefix}_AUDIENCE;`,
    "    primaryCta: LandingPageCta;",
    "    faq: LandingPageFaqItem[];",
    "    exampleQuestions: LandingPageExampleQuestion[];",
    "  }) => LandingPageData;",
    "};",
    "",
    `export function ${REGISTER_FN}({`,
    "  assembleLandingPage,",
    "}: AudienceAuthorityWave2AssemblyInput) {",
  ];

  const exports = [];

  for (const page of PAGES) {
    const prefix = slugToPrefix(page.slug);
    const camel = slugToCamel(page.slug);
    assembly.push(`  const ${camel}Page = assembleLandingPage({`);
    assembly.push(`    intent: ${prefix}_INTENT,`);
    assembly.push(`    audience: ${prefix}_AUDIENCE,`);
    assembly.push(`    primaryCta: ${prefix}_PRIMARY_CTA,`);
    assembly.push(`    faq: ${prefix}_FAQ,`);
    assembly.push(`    exampleQuestions: ${prefix}_QUESTIONS,`);
    assembly.push(`  });`);
    exports.push(`${camel}Page`);
  }

  assembly.push("");
  assembly.push("  return {");
  for (const page of PAGES) {
    const camel = slugToCamel(page.slug);
    assembly.push(`    ${camel}Page,`);
  }
  assembly.push("    pages: [");
  for (const exp of exports) {
    assembly.push(`      ${exp},`);
  }
  assembly.push("    ],");
  assembly.push("  };");
  assembly.push("}");
  assembly.push("");

  fs.writeFileSync(path.join(ROOT, ASSEMBLY_FILE), assembly.join("\n"));
}

function generateRoutes() {
  for (const page of PAGES) {
    const camel = slugToCamel(page.slug);
    const pascal = slugToPascal(page.slug);
    const dir = path.join(ROOT, "app", page.slug);
    fs.mkdirSync(dir, { recursive: true });
    const route = `import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { ${camel}Page } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: ${camel}Page.metaTitle,
  metaDescription: ${camel}Page.metaDescription,
  canonicalUrl: ${camel}Page.canonicalUrl,
});

export default function ${pascal}Page() {
  return <IntentLandingPage page={${camel}Page} />;
}
`;
    fs.writeFileSync(path.join(dir, "page.tsx"), route);
  }
}

generateContentFile();
generateAssemblyFile();
generateRoutes();

console.log(`Generated wave 2 content, assembly helper, and ${PAGES.length} routes.`);
