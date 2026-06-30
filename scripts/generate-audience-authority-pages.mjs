import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const PAGES = [
  {
    slug: "games-for-large-groups",
    title: "Games for Large Groups",
    category: "Social Voting",
    audience: "Large friend groups, reunions, big parties, and event hosts",
    searchIntent:
      "Find browser games for large groups with anonymous phone voting and one shared link.",
    priority: 52,
    clusters: ["friendship", "social-voting", "entertainment"],
    h1: "Games for Large Groups",
    metaTitle: "Games for Large Groups | Browser Voting Game | FriendRank",
    metaDescription:
      "Create games for large groups on FriendRank. Share one link, vote anonymously from phones, and reveal funny group results together.",
    intentSummaryTitle: "What are games for large groups?",
    intentSummary:
      "Games for large groups need to work when not everyone knows each other and phones are the easiest screen in the room. FriendRank turns that into a browser voting game: add names, share one link, and let everyone vote anonymously. Results unlock together so the whole crowd gets a shared moment without an app download or signup.",
    whyFriendRankTitle: "Why FriendRank works for large groups",
    exampleQuestionsTitle: "Popular large group game questions",
    faqTitle: "Games for large groups FAQ",
    schemaDescription:
      "Create games for large groups with FriendRank. Share one link, vote anonymously on phones, and reveal funny group results. No signup required.",
    heroSubtitle:
      "Run a quick voting game when the group is big. Add friends, share one link, vote anonymously, and reveal results everyone can see together.",
    playImmediatelyBody:
      "Create a game on FriendRank before the event or when the room fills up. Share the link in the group chat or on a screen and let everyone vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are large group questions your crowd can vote on.",
    finalCtaTitle: "Start your large group game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the room gets loud.",
    ctaLabel: "Create Large Group Game",
    vibeTags: ["Party", "College", "Family"],
    tone: "Funny",
    categories: [
      "Who brings the best group energy",
      "Who would host the afterparty",
      "Who is most likely to start the group chat",
    ],
    questions: [
      "Who is most likely to talk to everyone at the party?",
      "Who would organize the group photo?",
      "Who is most likely to arrive with the loudest entrance?",
      "Who would remember every name by the end of the night?",
      "Who is most likely to suggest a group game?",
      "Who brings the best party energy to a big crowd?",
      "Who would plan the reunion?",
      "Who is most likely to start the dance floor?",
      "Who would keep the conversation going at a big table?",
      "Who is most likely to make strangers feel welcome?",
      "Who would pick the best playlist for the whole room?",
      "Who is most likely to stay until cleanup?",
      "Who would win a group trivia night?",
      "Who is most likely to tell the funniest story?",
      "Who would rally everyone for one more round?",
    ],
    faqAudience: "large groups",
    faqContext: "big parties, reunions, and crowded hangouts",
  },
  {
    slug: "games-for-small-groups",
    title: "Games for Small Groups",
    category: "Friendship",
    audience: "Small friend circles, trios, foursomes, and tight hangouts",
    searchIntent:
      "Find intimate browser games for small groups with anonymous voting and shared results.",
    priority: 51,
    clusters: ["friendship", "social-voting", "entertainment"],
    h1: "Games for Small Groups",
    metaTitle: "Games for Small Groups | Friend Voting Game | FriendRank",
    metaDescription:
      "Create games for small groups on FriendRank. Perfect for trios and foursomes — vote anonymously, reveal funny roles, and share results in minutes.",
    intentSummaryTitle: "What are games for small groups?",
    intentSummary:
      "Games for small groups work best when every vote feels personal and the results spark real conversation. FriendRank is built for that: add a few names, share one link, vote anonymously on funny roles, and unlock results together. Ideal for coffee hangs, small dinners, and close friend circles. No app download needed.",
    whyFriendRankTitle: "Why FriendRank works for small groups",
    exampleQuestionsTitle: "Popular small group game questions",
    faqTitle: "Games for small groups FAQ",
    schemaDescription:
      "Create games for small groups with FriendRank. Vote anonymously on funny roles, reveal shareable results, and play in minutes. No signup required.",
    heroSubtitle:
      "Make a small hangout more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal results together.",
    playImmediatelyBody:
      "Create a game on FriendRank in under a minute. Share the link with your small group and let everyone vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are small group questions your friends can vote on.",
    finalCtaTitle: "Start your small group game",
    finalCtaSubtitle: "Free, mobile-friendly, and perfect for trios and foursomes.",
    ctaLabel: "Create Small Group Game",
    vibeTags: ["College", "Discord", "Family"],
    tone: "Wholesome",
    categories: [
      "Who knows the group best",
      "Who gives the best advice",
      "Who is the most loyal friend",
    ],
    questions: [
      "Who is most likely to plan the next hangout?",
      "Who gives the best advice in a small group?",
      "Who is most likely to bring snacks without being asked?",
      "Who would win a best friend quiz?",
      "Who is most likely to send the follow-up text?",
      "Who remembers the smallest details?",
      "Who is most likely to suggest a road trip?",
      "Who would pick the best restaurant for the group?",
      "Who is most likely to make everyone laugh first?",
      "Who would stay up talking the latest?",
      "Who is most likely to organize the group photo?",
      "Who would be the best trivia partner?",
      "Who is most likely to keep a secret?",
      "Who would plan the surprise?",
      "Who is most likely to start the inside joke?",
    ],
    faqAudience: "small groups",
    faqContext: "trios, foursomes, and close friend hangouts",
  },
  {
    slug: "games-for-roommates",
    title: "Games for Roommates",
    category: "Friendship",
    audience: "Roommates, housemates, and shared-living friend groups",
    searchIntent:
      "Find funny roommate games with anonymous voting and shareable results in the browser.",
    priority: 50,
    clusters: ["friendship", "social-voting"],
    h1: "Games for Roommates",
    metaTitle: "Games for Roommates | Funny Housemate Game | FriendRank",
    metaDescription:
      "Create games for roommates on FriendRank. Vote anonymously on funny housemate roles, reveal results together, and play from any phone.",
    intentSummaryTitle: "What are games for roommates?",
    intentSummary:
      "Games for roommates turn everyday house dynamics into something funny and shareable. FriendRank lets your household vote anonymously on who fits each role — who never does dishes, who hogs the couch, who gives the best life advice. Share one link, vote on phones, and reveal results together in the kitchen or group chat. No signup required.",
    whyFriendRankTitle: "Why FriendRank works for roommates",
    exampleQuestionsTitle: "Popular roommate game questions",
    faqTitle: "Games for roommates FAQ",
    schemaDescription:
      "Create games for roommates with FriendRank. Vote anonymously on funny housemate roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Turn roommate life into a funny voting game. Add housemates, share one link, vote anonymously, and reveal results together.",
    playImmediatelyBody:
      "Create a game on FriendRank after dinner or on a lazy weekend. Share the link in the house group chat and let everyone vote.",
    exampleQuestionsIntro:
      "Need inspiration? Here are roommate questions your house can vote on.",
    finalCtaTitle: "Start your roommate game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your house group chat.",
    ctaLabel: "Create Roommate Game",
    vibeTags: ["College", "Discord", "Party"],
    tone: "Funny",
    categories: [
      "Who is most likely to leave dishes in the sink",
      "Who hogs the couch",
      "Who gives the best roommate advice",
    ],
    questions: [
      "Who is most likely to forget to take out the trash?",
      "Who would survive longest without Wi-Fi?",
      "Who is most likely to blast music at midnight?",
      "Who would win a cleaning contest?",
      "Who is most likely to eat someone else's leftovers?",
      "Who would forget to lock the door?",
      "Who is most likely to host the best house dinner?",
      "Who would binge a show the fastest?",
      "Who is most likely to fall asleep on the couch?",
      "Who would plan the best house party?",
      "Who is most likely to borrow clothes without asking?",
      "Who would pay bills on time every month?",
      "Who is most likely to start a deep talk at 2 a.m.?",
      "Who would adopt a plant and forget it?",
      "Who is most likely to make the whole house laugh?",
    ],
    faqAudience: "roommates",
    faqContext: "shared apartments, dorms, and housemate group chats",
  },
  {
    slug: "games-for-college-students",
    title: "Games for College Students",
    category: "Party",
    audience: "College students, dorm groups, campus clubs, and student friend circles",
    searchIntent:
      "Find browser games for college students with anonymous voting and one link for the group chat.",
    priority: 49,
    clusters: ["friendship", "party", "social-voting"],
    h1: "Games for College Students",
    metaTitle: "Games for College Students | Campus Voting Game | FriendRank",
    metaDescription:
      "Create games for college students on FriendRank. Perfect for dorms and campus groups — vote anonymously, reveal funny roles, and share results fast.",
    intentSummaryTitle: "What are games for college students?",
    intentSummary:
      "Games for college students need to be fast, funny, and phone-first. FriendRank fits dorm life and campus group chats: create a game, share one link, vote anonymously on college-life roles, and unlock results together. Works for pregame hangs, study breaks, club meetings, and Discord servers. No app download or account needed.",
    whyFriendRankTitle: "Why FriendRank works for college students",
    exampleQuestionsTitle: "Popular college student game questions",
    faqTitle: "Games for college students FAQ",
    schemaDescription:
      "Create games for college students with FriendRank. Vote anonymously on funny campus roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make campus life more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal results in the group chat.",
    playImmediatelyBody:
      "Create a game on FriendRank between classes or before a hangout. Share the link in iMessage, WhatsApp, or your dorm chat.",
    exampleQuestionsIntro:
      "Need inspiration? Here are college student questions your group can vote on.",
    finalCtaTitle: "Start your college game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your campus group chat.",
    ctaLabel: "Create College Student Game",
    vibeTags: ["College", "Party", "Discord"],
    tone: "Funny",
    categories: [
      "Who is most likely to pull an all-nighter",
      "Who would survive on dining hall food",
      "Who brings the best dorm party energy",
    ],
    questions: [
      "Who is most likely to sleep through an 8 a.m. class?",
      "Who would win a campus trivia night?",
      "Who is most likely to become club president?",
      "Who would survive finals week on coffee alone?",
      "Who is most likely to know everyone on campus?",
      "Who would plan the best spring break trip?",
      "Who is most likely to forget their student ID?",
      "Who would dominate a group project?",
      "Who is most likely to start a dorm tradition?",
      "Who would pick the best pregame playlist?",
      "Who is most likely to join five clubs at once?",
      "Who would give the best study tips?",
      "Who is most likely to become a meme in the group chat?",
      "Who would host the best dorm hangout?",
      "Who is most likely to graduate with the best stories?",
    ],
    faqAudience: "college students",
    faqContext: "dorms, campus clubs, and student group chats",
  },
  {
    slug: "games-for-work-meetings",
    title: "Games for Work Meetings",
    category: "Teams",
    audience: "Managers, team leads, and coworkers in meetings and workshops",
    searchIntent:
      "Find light games for work meetings with anonymous voting that works on phones in minutes.",
    priority: 48,
    clusters: ["teams", "icebreakers"],
    h1: "Games for Work Meetings",
    metaTitle: "Games for Work Meetings | Team Icebreaker | FriendRank",
    metaDescription:
      "Create games for work meetings on FriendRank. Quick anonymous voting on phones before the agenda starts — no app download required.",
    intentSummaryTitle: "What are games for work meetings?",
    intentSummary:
      "Games for work meetings should be quick, inclusive, and easy to run on a video call or in a conference room. FriendRank gives teams a five-minute icebreaker: add coworker names, share one link, vote anonymously on light workplace roles, and reveal results together before the real agenda. Professional enough for standups, workshops, and all-hands. No signup required.",
    whyFriendRankTitle: "Why FriendRank works for work meetings",
    exampleQuestionsTitle: "Popular work meeting game questions",
    faqTitle: "Games for work meetings FAQ",
    schemaDescription:
      "Create games for work meetings with FriendRank. Quick anonymous voting on phones before the agenda starts. No signup required.",
    heroSubtitle:
      "Warm up your meeting with a quick voting game. Add coworkers, share one link, vote anonymously, and reveal light results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before the meeting starts. Drop the link in Slack, Teams, or the calendar invite and let everyone vote in the first five minutes.",
    exampleQuestionsIntro:
      "Need inspiration? Here are work meeting questions your team can vote on.",
    finalCtaTitle: "Start your work meeting game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the agenda begins.",
    ctaLabel: "Create Work Meeting Game",
    vibeTags: ["Office", "Party", "College"],
    tone: "Wholesome",
    categories: [
      "Who is most likely to unmute first",
      "Who keeps meetings on schedule",
      "Who brings the best meeting energy",
    ],
    questions: [
      "Who is most likely to join the call one minute early?",
      "Who would run the best team standup?",
      "Who is most likely to share their screen without asking?",
      "Who would plan the best team offsite?",
      "Who is most likely to send a follow-up summary?",
      "Who would win employee of the month?",
      "Who is most likely to have the best Zoom background?",
      "Who would mentor a new hire first?",
      "Who is most likely to bring donuts to the office?",
      "Who would keep the team motivated on a tough week?",
      "Who is most likely to suggest a process improvement?",
      "Who would organize the team lunch?",
      "Who is most likely to celebrate a win the loudest?",
      "Who would remember everyone's work anniversary?",
      "Who is most likely to make a meeting actually fun?",
    ],
    faqAudience: "work meetings",
    faqContext: "standups, workshops, and all-hands calls",
  },
  {
    slug: "games-for-remote-teams",
    title: "Games for Remote Teams",
    category: "Teams",
    audience: "Remote teams, distributed coworkers, and virtual team leads",
    searchIntent:
      "Find browser games for remote teams with anonymous voting over video calls and chat apps.",
    priority: 47,
    clusters: ["teams"],
    h1: "Games for Remote Teams",
    metaTitle: "Games for Remote Teams | Virtual Team Game | FriendRank",
    metaDescription:
      "Create games for remote teams on FriendRank. Share one link in Slack or Zoom chat, vote anonymously, and reveal results together on the call.",
    intentSummaryTitle: "What are games for remote teams?",
    intentSummary:
      "Games for remote teams need to work when everyone is in a different city and the only shared screen is a phone. FriendRank runs entirely in the browser: create a game, paste the link in Slack, Teams, or Zoom chat, and let coworkers vote anonymously. Results unlock together on the call so distributed teams get a shared moment without another app install.",
    whyFriendRankTitle: "Why FriendRank works for remote teams",
    exampleQuestionsTitle: "Popular remote team game questions",
    faqTitle: "Games for remote teams FAQ",
    schemaDescription:
      "Create games for remote teams with FriendRank. Share one link, vote anonymously on the call, and reveal results together. No signup required.",
    heroSubtitle:
      "Bring your remote team together with a quick voting game. Share one link, vote anonymously, and reveal results on the video call.",
    playImmediatelyBody:
      "Create a game on FriendRank before your sync. Paste the link in Slack or the meeting chat and let everyone vote in the first few minutes.",
    exampleQuestionsIntro:
      "Need inspiration? Here are remote team questions your coworkers can vote on.",
    finalCtaTitle: "Start your remote team game",
    finalCtaSubtitle: "Free, browser-based, and ready for your next video call.",
    ctaLabel: "Create Remote Team Game",
    vibeTags: ["Office", "Discord", "College"],
    tone: "Wholesome",
    categories: [
      "Who is most likely to work from a coffee shop",
      "Who never misses a standup",
      "Who brings the best virtual meeting energy",
    ],
    questions: [
      "Who is most likely to work from a different time zone?",
      "Who would survive a week without Slack?",
      "Who is most likely to have the tidiest home office?",
      "Who would plan the best virtual team event?",
      "Who is most likely to send the best GIF in chat?",
      "Who would win a remote trivia contest?",
      "Who is most likely to join a call with perfect lighting?",
      "Who would onboard a new remote hire the fastest?",
      "Who is most likely to suggest async updates?",
      "Who would keep morale high during a busy sprint?",
      "Who is most likely to have a pet cameo on camera?",
      "Who would document the team process best?",
      "Who is most likely to remember everyone's timezone?",
      "Who would organize a virtual coffee chat?",
      "Who is most likely to make a remote meeting feel in-person?",
    ],
    faqAudience: "remote teams",
    faqContext: "distributed teams, video calls, and Slack channels",
  },
  {
    slug: "friday-team-games",
    title: "Friday Team Games",
    category: "Teams",
    audience: "Office teams, managers, and coworkers winding down on Fridays",
    searchIntent:
      "Find fun Friday team games with anonymous voting to end the work week on a light note.",
    priority: 46,
    clusters: ["teams"],
    h1: "Friday Team Games",
    metaTitle: "Friday Team Games | End-of-Week Icebreaker | FriendRank",
    metaDescription:
      "Create Friday team games on FriendRank. End the week with anonymous voting, funny roles, and shareable results in under five minutes.",
    intentSummaryTitle: "What are Friday team games?",
    intentSummary:
      "Friday team games give coworkers a quick reset before the weekend. FriendRank makes it easy: add team names, share one link, vote anonymously on end-of-week roles, and reveal results together in the office or on a video call. Light enough for managers to run, fun enough that people actually participate. No app download needed.",
    whyFriendRankTitle: "Why FriendRank works for Friday team games",
    exampleQuestionsTitle: "Popular Friday team game questions",
    faqTitle: "Friday team games FAQ",
    schemaDescription:
      "Create Friday team games with FriendRank. End the week with anonymous voting and shareable results. No signup required.",
    heroSubtitle:
      "End the week with a quick team voting game. Share one link, vote anonymously, and reveal funny Friday roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank before your Friday standup or social hour. Share the link and let the team vote in the last five minutes of the week.",
    exampleQuestionsIntro:
      "Need inspiration? Here are Friday team questions your coworkers can vote on.",
    finalCtaTitle: "Start your Friday team game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the weekend starts.",
    ctaLabel: "Create Friday Team Game",
    vibeTags: ["Office", "Party", "College"],
    tone: "Funny",
    categories: [
      "Who is most likely to leave early on Friday",
      "Who brings the best Friday energy",
      "Who would plan the best team happy hour",
    ],
    questions: [
      "Who is most likely to say 'Happy Friday' first?",
      "Who would plan the best team happy hour?",
      "Who is most likely to finish work early on Friday?",
      "Who would bring the best weekend plans to chat?",
      "Who is most likely to start the Friday playlist?",
      "Who would win the week's MVP award?",
      "Who is most likely to suggest tacos for lunch?",
      "Who would keep the team laughing on a Friday afternoon?",
      "Who is most likely to send the weekend meme?",
      "Who would organize the casual Friday outfit contest?",
      "Who is most likely to have the wildest weekend stories?",
      "Who would recap the week the best?",
      "Who is most likely to volunteer for Monday's task?",
      "Who would pick the best team lunch spot?",
      "Who is most likely to make Friday meetings actually fun?",
    ],
    faqAudience: "Friday team games",
    faqContext: "end-of-week standups, social hours, and office Fridays",
  },
  {
    slug: "team-lunch-games",
    title: "Team Lunch Games",
    category: "Teams",
    audience: "Coworkers, managers, and office teams at lunch or team meals",
    searchIntent:
      "Find quick team lunch games with anonymous phone voting while everyone eats together.",
    priority: 45,
    clusters: ["teams"],
    h1: "Team Lunch Games",
    metaTitle: "Team Lunch Games | Coworker Voting Game | FriendRank",
    metaDescription:
      "Create team lunch games on FriendRank. Vote anonymously while you eat, reveal funny coworker roles, and share results at the table.",
    intentSummaryTitle: "What are team lunch games?",
    intentSummary:
      "Team lunch games turn a casual meal into something memorable without killing the conversation. FriendRank lets coworkers vote anonymously on funny lunch-table roles while everyone eats. Share one link, vote from phones under the table, and reveal results together before dessert. Works for in-office lunches and team meals on video calls.",
    whyFriendRankTitle: "Why FriendRank works for team lunch games",
    exampleQuestionsTitle: "Popular team lunch game questions",
    faqTitle: "Team lunch games FAQ",
    schemaDescription:
      "Create team lunch games with FriendRank. Vote anonymously at the table and reveal funny coworker roles. No signup required.",
    heroSubtitle:
      "Make team lunch more fun with a quick voting game. Share one link, vote anonymously, and reveal results while you eat.",
    playImmediatelyBody:
      "Create a game on FriendRank before everyone sits down. Share the link at the table or in the lunch invite and let coworkers vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are team lunch questions your coworkers can vote on.",
    finalCtaTitle: "Start your team lunch game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the food arrives.",
    ctaLabel: "Create Team Lunch Game",
    vibeTags: ["Office", "Party", "College"],
    tone: "Funny",
    categories: [
      "Who always picks the restaurant",
      "Who orders the most interesting lunch",
      "Who tells the best lunch-table stories",
    ],
    questions: [
      "Who is most likely to suggest the lunch spot?",
      "Who would order the most adventurous dish?",
      "Who is most likely to steal a fry?",
      "Who would split the bill the fairest?",
      "Who is most likely to arrive late to lunch?",
      "Who would tell the best story at the table?",
      "Who is most likely to recommend dessert?",
      "Who would win a food trivia round?",
      "Who is most likely to eat everyone's leftovers?",
      "Who would plan the best team dinner?",
      "Who is most likely to know every restaurant nearby?",
      "Who would keep the lunch conversation going?",
      "Who is most likely to bring snacks for the table?",
      "Who would organize the team potluck?",
      "Who is most likely to make lunch the highlight of the day?",
    ],
    faqAudience: "team lunch games",
    faqContext: "office lunches, team meals, and coworker hangouts",
  },
  {
    slug: "long-distance-couple-games",
    title: "Long Distance Couple Games",
    category: "Relationships",
    audience: "Long-distance couples, partners in different cities, and LDR relationships",
    searchIntent:
      "Find browser games for long-distance couples with anonymous voting over video calls.",
    priority: 44,
    clusters: ["relationships"],
    h1: "Long Distance Couple Games",
    metaTitle: "Long Distance Couple Games | Play Online | FriendRank",
    metaDescription:
      "Create long distance couple games on FriendRank. Vote anonymously on a video call, reveal playful roles, and share results together from anywhere.",
    intentSummaryTitle: "What are long distance couple games?",
    intentSummary:
      "Long distance couple games help partners feel connected when they cannot be in the same room. FriendRank turns date night into a browser voting game: add names, share one link on FaceTime or WhatsApp, vote anonymously on relationship roles, and unlock results together on the call. No app download, no accounts — just one link between cities.",
    whyFriendRankTitle: "Why FriendRank works for long distance couples",
    exampleQuestionsTitle: "Popular long distance couple game questions",
    faqTitle: "Long distance couple games FAQ",
    schemaDescription:
      "Create long distance couple games with FriendRank. Vote anonymously on video calls and reveal playful results together. No signup required.",
    heroSubtitle:
      "Stay connected across cities with a quick couple voting game. Share one link, vote anonymously, and reveal results on your video call.",
    playImmediatelyBody:
      "Create a game on FriendRank before your next call. Send the link and vote together while you catch up on FaceTime or WhatsApp.",
    exampleQuestionsIntro:
      "Need inspiration? Here are long distance couple questions you can vote on.",
    finalCtaTitle: "Start your long distance couple game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your next video date.",
    ctaLabel: "Create Long Distance Couple Game",
    vibeTags: ["Soft drama", "Family", "Discord"],
    tone: "Wholesome",
    categories: [
      "Who is most likely to fall asleep on the call",
      "Who sends the best good morning text",
      "Who would plan the best reunion visit",
    ],
    questions: [
      "Who is most likely to fall asleep on the video call?",
      "Who sends the best good morning text?",
      "Who would plan the most romantic reunion?",
      "Who is most likely to forget the time difference?",
      "Who would pick the best movie for a virtual date?",
      "Who is most likely to send a care package?",
      "Who would win a long-distance trivia about each other?",
      "Who is most likely to screenshot the cutest moment?",
      "Who would plan the surprise visit?",
      "Who is most likely to stay on the phone for hours?",
      "Who would remember every anniversary detail?",
      "Who is most likely to send voice notes?",
      "Who would pick the best playlist for the call?",
      "Who is most likely to make distance feel shorter?",
      "Who would plan the best future trip together?",
    ],
    faqAudience: "long distance couples",
    faqContext: "video dates, FaceTime nights, and LDR relationships",
  },
  {
    slug: "newly-dating-games",
    title: "Newly Dating Games",
    category: "Relationships",
    audience: "New couples, early dating pairs, and people in the first few months together",
    searchIntent:
      "Find light games for newly dating couples with anonymous voting and playful results.",
    priority: 43,
    clusters: ["relationships"],
    h1: "Newly Dating Games",
    metaTitle: "Newly Dating Games | Couple Voting Game | FriendRank",
    metaDescription:
      "Create newly dating games on FriendRank. Playful anonymous voting for new couples — reveal funny roles and share results on your next date.",
    intentSummaryTitle: "What are newly dating games?",
    intentSummary:
      "Newly dating games break the ice without making things awkward. FriendRank gives new couples a light voting game: add names, share one link, vote anonymously on early-relationship roles, and reveal results together over dinner or on a walk. Funny enough to ease nerves, sweet enough for a second date. No signup required.",
    whyFriendRankTitle: "Why FriendRank works for newly dating couples",
    exampleQuestionsTitle: "Popular newly dating game questions",
    faqTitle: "Newly dating games FAQ",
    schemaDescription:
      "Create newly dating games with FriendRank. Playful anonymous voting for new couples with shareable results. No signup required.",
    heroSubtitle:
      "Make early dates more fun with a quick couple voting game. Share one link, vote anonymously, and reveal playful results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before your next date. Share the link and vote together over coffee, dinner, or a video call.",
    exampleQuestionsIntro:
      "Need inspiration? Here are newly dating questions you can vote on.",
    finalCtaTitle: "Start your newly dating game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your next date night.",
    ctaLabel: "Create Newly Dating Game",
    vibeTags: ["Soft drama", "Family", "Party"],
    tone: "Wholesome",
    categories: [
      "Who is most likely to text first",
      "Who would plan the best second date",
      "Who is the bigger romantic",
    ],
    questions: [
      "Who is most likely to text good morning first?",
      "Who would plan the better second date?",
      "Who is most likely to get nervous on a first date?",
      "Who would pick the best restaurant?",
      "Who is most likely to remember small details?",
      "Who would send the sweetest compliment?",
      "Who is most likely to suggest a spontaneous plan?",
      "Who would win a 'how well do we know each other' round?",
      "Who is most likely to laugh at the wrong moment?",
      "Who would be the better cook for date night?",
      "Who is most likely to overthink a text?",
      "Who would pick the best movie for two?",
      "Who is most likely to hold eye contact longer?",
      "Who would plan the cutest surprise?",
      "Who is most likely to suggest playing another round?",
    ],
    faqAudience: "newly dating couples",
    faqContext: "first dates, early relationships, and new couples",
  },
  {
    slug: "married-couple-games",
    title: "Married Couple Games",
    category: "Relationships",
    audience: "Married couples, long-term partners, and spouses at home or on date night",
    searchIntent:
      "Find fun games for married couples with anonymous voting and shareable results at home.",
    priority: 42,
    clusters: ["relationships"],
    h1: "Married Couple Games",
    metaTitle: "Married Couple Games | Spouse Voting Game | FriendRank",
    metaDescription:
      "Create married couple games on FriendRank. Vote anonymously on funny spouse roles, reveal results together, and spark conversation at home.",
    intentSummaryTitle: "What are married couple games?",
    intentSummary:
      "Married couple games add playful energy to date night or a quiet evening at home. FriendRank lets partners vote anonymously on who fits each funny role — who hogs the remote, who gives the best pep talks, who would survive a DIY project. Share one link, vote on phones, and reveal results together on the couch. No app download needed.",
    whyFriendRankTitle: "Why FriendRank works for married couples",
    exampleQuestionsTitle: "Popular married couple game questions",
    faqTitle: "Married couple games FAQ",
    schemaDescription:
      "Create married couple games with FriendRank. Vote anonymously on funny spouse roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Spice up date night with a quick spouse voting game. Share one link, vote anonymously, and reveal funny results together.",
    playImmediatelyBody:
      "Create a game on FriendRank after dinner or on a lazy Sunday. Share the link and vote together from the couch.",
    exampleQuestionsIntro:
      "Need inspiration? Here are married couple questions you can vote on.",
    finalCtaTitle: "Start your married couple game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your next date night in.",
    ctaLabel: "Create Married Couple Game",
    vibeTags: ["Soft drama", "Family", "College"],
    tone: "Funny",
    categories: [
      "Who hogs the remote",
      "Who gives the best pep talk",
      "Who would survive a DIY project alone",
    ],
    questions: [
      "Who is most likely to hog the remote?",
      "Who would plan the best anniversary surprise?",
      "Who is most likely to forget an appointment?",
      "Who would win a cooking challenge?",
      "Who is most likely to start a home project?",
      "Who would give the best pep talk?",
      "Who is most likely to fall asleep during a movie?",
      "Who would remember every family birthday?",
      "Who is most likely to suggest takeout?",
      "Who would organize the vacation?",
      "Who is most likely to sing in the kitchen?",
      "Who would win a trivia night about each other?",
      "Who is most likely to adopt another plant?",
      "Who would fix something before calling a pro?",
      "Who is most likely to make the other laugh on a tough day?",
    ],
    faqAudience: "married couples",
    faqContext: "date nights, anniversaries, and evenings at home",
  },
  {
    slug: "double-date-games",
    title: "Double Date Games",
    category: "Relationships",
    audience: "Couples on double dates, friend couples, and pairs hanging out together",
    searchIntent:
      "Find games for double dates with anonymous group voting and shareable results for four people.",
    priority: 41,
    clusters: ["relationships", "friendship"],
    h1: "Double Date Games",
    metaTitle: "Double Date Games | Couple Group Vote | FriendRank",
    metaDescription:
      "Create double date games on FriendRank. Four friends vote anonymously on phones, reveal funny roles, and share results at the table.",
    intentSummaryTitle: "What are double date games?",
    intentSummary:
      "Double date games break the ice when two couples hang out together. FriendRank turns it into a group voting game: add all four names, share one link, vote anonymously on double-date roles, and reveal results together at dinner. Funny enough to ease any awkward silence, easy enough to start in under a minute. No signup required.",
    whyFriendRankTitle: "Why FriendRank works for double dates",
    exampleQuestionsTitle: "Popular double date game questions",
    faqTitle: "Double date games FAQ",
    schemaDescription:
      "Create double date games with FriendRank. Four friends vote anonymously and reveal shareable results together. No signup required.",
    heroSubtitle:
      "Make double dates more fun with a quick group voting game. Add everyone, share one link, vote anonymously, and reveal results at the table.",
    playImmediatelyBody:
      "Create a game on FriendRank before dessert arrives. Share the link and let both couples vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are double date questions your group can vote on.",
    finalCtaTitle: "Start your double date game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the check arrives.",
    ctaLabel: "Create Double Date Game",
    vibeTags: ["Soft drama", "Party", "College"],
    tone: "Funny",
    categories: [
      "Who is most likely to pick the restaurant",
      "Who tells the best couple story",
      "Who would plan the next double date",
    ],
    questions: [
      "Who is most likely to pick the restaurant?",
      "Who would tell the funniest couple story?",
      "Who is most likely to order for the table?",
      "Who would plan the next double date?",
      "Who is most likely to finish dessert first?",
      "Who would win a couples trivia round?",
      "Who is most likely to suggest another round of drinks?",
      "Who would take the best group photo?",
      "Who is most likely to make everyone comfortable?",
      "Who would suggest the best after-dinner plan?",
      "Who is most likely to split the bill fairly?",
      "Who would give the best relationship advice?",
      "Who is most likely to start the group laugh?",
      "Who would remember everyone's food order?",
      "Who is most likely to suggest playing again next month?",
    ],
    faqAudience: "double dates",
    faqContext: "dinner with two couples, couple hangouts, and group dates",
  },
  {
    slug: "sleepover-games",
    title: "Sleepover Games",
    category: "Party",
    audience: "Friend groups at sleepovers, overnight hangs, and late-night get-togethers",
    searchIntent:
      "Find sleepover games with anonymous phone voting and funny late-night results.",
    priority: 40,
    clusters: ["party"],
    h1: "Sleepover Games",
    metaTitle: "Sleepover Games | Late-Night Voting Game | FriendRank",
    metaDescription:
      "Create sleepover games on FriendRank. Vote anonymously on silly roles, reveal funny results, and play together all night from your phones.",
    intentSummaryTitle: "What are sleepover games?",
    intentSummary:
      "Sleepover games keep the night going when everyone is already on their phones. FriendRank turns late-night hangs into a voting game: add friends, share one link, vote anonymously on sleepover roles, and reveal results together in the living room or group chat. Perfect after movies, before truth-or-dare, or when nobody wants to sleep yet.",
    whyFriendRankTitle: "Why FriendRank works for sleepovers",
    exampleQuestionsTitle: "Popular sleepover game questions",
    faqTitle: "Sleepover games FAQ",
    schemaDescription:
      "Create sleepover games with FriendRank. Vote anonymously on silly roles and reveal funny late-night results. No signup required.",
    heroSubtitle:
      "Keep the sleepover going with a quick voting game. Add friends, share one link, vote anonymously, and reveal funny results together.",
    playImmediatelyBody:
      "Create a game on FriendRank when the snacks come out. Share the link and let everyone vote from their phones in pajamas.",
    exampleQuestionsIntro:
      "Need inspiration? Here are sleepover questions your group can vote on.",
    finalCtaTitle: "Start your sleepover game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for late-night laughs.",
    ctaLabel: "Create Sleepover Game",
    vibeTags: ["Party", "College", "Family"],
    tone: "Funny",
    categories: [
      "Who is most likely to stay awake until sunrise",
      "Who tells the scariest story",
      "Who hogs the sleeping bag",
    ],
    questions: [
      "Who is most likely to stay awake until sunrise?",
      "Who would tell the scariest ghost story?",
      "Who is most likely to fall asleep first?",
      "Who would eat all the midnight snacks?",
      "Who is most likely to suggest one more movie?",
      "Who would hog the best sleeping spot?",
      "Who is most likely to laugh at 3 a.m.?",
      "Who would braid everyone's hair?",
      "Who is most likely to sleep-talk?",
      "Who would pick the best sleepover playlist?",
      "Who is most likely to prank someone awake?",
      "Who would remember everyone's pillow preference?",
      "Who is most likely to suggest truth or dare next?",
      "Who would take the best sleepy selfie?",
      "Who is most likely to make breakfast in the morning?",
    ],
    faqAudience: "sleepovers",
    faqContext: "overnight hangs, late-night friend groups, and pajama parties",
  },
  {
    slug: "house-party-games",
    title: "House Party Games",
    category: "Party",
    audience: "House party hosts, friend groups, and casual home celebrations",
    searchIntent:
      "Find house party games with anonymous phone voting and one link for the whole room.",
    priority: 39,
    clusters: ["party"],
    h1: "House Party Games",
    metaTitle: "House Party Games | Home Voting Game | FriendRank",
    metaDescription:
      "Create house party games on FriendRank. Share one link, vote anonymously from phones, and reveal funny party roles in the living room.",
    intentSummaryTitle: "What are house party games?",
    intentSummary:
      "House party games should start fast when guests are already mingling. FriendRank gives hosts a browser voting game: add names, share one link in the group chat or on a TV screen, vote anonymously on party roles, and reveal results together in the living room. No board games to set up, no app to download, no accounts required.",
    whyFriendRankTitle: "Why FriendRank works for house parties",
    exampleQuestionsTitle: "Popular house party game questions",
    faqTitle: "House party games FAQ",
    schemaDescription:
      "Create house party games with FriendRank. Share one link, vote anonymously, and reveal funny party roles. No signup required.",
    heroSubtitle:
      "Kick off your house party with a quick voting game. Share one link, vote anonymously, and reveal funny roles in the living room.",
    playImmediatelyBody:
      "Create a game on FriendRank when guests arrive. Share the link and let everyone vote from their phones while they mingle.",
    exampleQuestionsIntro:
      "Need inspiration? Here are house party questions your guests can vote on.",
    finalCtaTitle: "Start your house party game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the music starts.",
    ctaLabel: "Create House Party Game",
    vibeTags: ["Party", "College", "Discord"],
    tone: "Funny",
    categories: [
      "Who brings the best party energy",
      "Who would DJ the living room",
      "Who is most likely to start karaoke",
    ],
    questions: [
      "Who is most likely to start the dance floor?",
      "Who would pick the best house party playlist?",
      "Who is most likely to arrive with the best snack?",
      "Who would suggest karaoke?",
      "Who is most likely to talk to every guest?",
      "Who would clean up without being asked?",
      "Who is most likely to spill a drink?",
      "Who would take the best party photos?",
      "Who is most likely to suggest a group game?",
      "Who would stay until the last song?",
      "Who is most likely to make a new friend tonight?",
      "Who would win a living room trivia round?",
      "Who is most likely to start an impromptu speech?",
      "Who would remember everyone's drink order?",
      "Who is most likely to make the host laugh?",
    ],
    faqAudience: "house parties",
    faqContext: "home celebrations, living room hangouts, and casual parties",
  },
  {
    slug: "birthday-party-games",
    title: "Birthday Party Games",
    category: "Party",
    audience: "Birthday hosts, party guests, and friend groups celebrating together",
    searchIntent:
      "Find birthday party games with anonymous voting and shareable results for the celebration.",
    priority: 38,
    clusters: ["party"],
    h1: "Birthday Party Games",
    metaTitle: "Birthday Party Games | Celebration Voting Game | FriendRank",
    metaDescription:
      "Create birthday party games on FriendRank. Vote anonymously on funny birthday roles, reveal results together, and make the celebration more fun.",
    intentSummaryTitle: "What are birthday party games?",
    intentSummary:
      "Birthday party games give guests something quick and memorable between cake and presents. FriendRank turns the celebration into a phone voting game: add names, share one link, vote anonymously on birthday roles, and unlock results for the room or group chat. Works for house parties, restaurant dinners, and surprise celebrations.",
    whyFriendRankTitle: "Why FriendRank works for birthday parties",
    exampleQuestionsTitle: "Popular birthday party game questions",
    faqTitle: "Birthday party games FAQ",
    schemaDescription:
      "Create birthday party games with FriendRank. Vote anonymously on funny birthday roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make the birthday more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal funny birthday roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank before the party or when guests arrive. Share the link and let everyone vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are birthday party questions your group can vote on.",
    finalCtaTitle: "Start your birthday party game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready before the candles are lit.",
    ctaLabel: "Create Birthday Party Game",
    vibeTags: ["Party", "Family", "College"],
    tone: "Funny",
    categories: [
      "Who gives the best birthday toast",
      "Who is most likely to start the dance floor",
      "Who brings the best party energy",
    ],
    questions: [
      "Who is most likely to eat the biggest slice of cake?",
      "Who would give the best birthday toast?",
      "Who is most likely to start the dance floor?",
      "Who would plan the surprise party?",
      "Who is most likely to sing happy birthday off-key?",
      "Who would pick the best birthday playlist?",
      "Who is most likely to forget where the presents are?",
      "Who would take the best birthday photos?",
      "Who is most likely to arrive with the loudest gift wrap?",
      "Who would stay until cleanup?",
      "Who is most likely to suggest karaoke?",
      "Who remembers everyone's birthday?",
      "Who is most likely to blow out the candles twice?",
      "Who would make the birthday person laugh the hardest?",
      "Who is most likely to suggest one more round?",
    ],
    faqAudience: "birthday parties",
    faqContext: "birthday celebrations, surprise parties, and friend gatherings",
  },
  {
    slug: "bachelorette-party-games",
    title: "Bachelorette Party Games",
    category: "Party",
    audience: "Bachelorette parties, bridal groups, and wedding celebration weekends",
    searchIntent:
      "Find bachelorette party games with anonymous voting and funny bridal-party results.",
    priority: 37,
    clusters: ["party", "relationships"],
    h1: "Bachelorette Party Games",
    metaTitle: "Bachelorette Party Games | Bridal Voting Game | FriendRank",
    metaDescription:
      "Create bachelorette party games on FriendRank. Vote anonymously on funny bridal roles, reveal results together, and play from any phone.",
    intentSummaryTitle: "What are bachelorette party games?",
    intentSummary:
      "Bachelorette party games should be funny, fast, and easy to run between activities. FriendRank gives the bridal group a browser voting game: add names, share one link, vote anonymously on bachelorette roles, and reveal results together on the night out or at the Airbnb. No printed games, no app download, no signup required.",
    whyFriendRankTitle: "Why FriendRank works for bachelorette parties",
    exampleQuestionsTitle: "Popular bachelorette party game questions",
    faqTitle: "Bachelorette party games FAQ",
    schemaDescription:
      "Create bachelorette party games with FriendRank. Vote anonymously on funny bridal roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make the bachelorette weekend more fun with a quick voting game. Share one link, vote anonymously, and reveal funny bridal roles together.",
    playImmediatelyBody:
      "Create a game on FriendRank before the night out. Share the link in the bridal group chat and let everyone vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are bachelorette party questions your group can vote on.",
    finalCtaTitle: "Start your bachelorette party game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for the bridal squad.",
    ctaLabel: "Create Bachelorette Party Game",
    vibeTags: ["Soft drama", "Party", "College"],
    tone: "Funny",
    categories: [
      "Who is most likely to cry at the wedding",
      "Who would plan the best bachelorette surprise",
      "Who gives the best toast",
    ],
    questions: [
      "Who is most likely to cry at the wedding?",
      "Who would plan the best bachelorette surprise?",
      "Who is most likely to give the wildest toast?",
      "Who would pick the best party playlist?",
      "Who is most likely to stay out the latest?",
      "Who would organize the group photo?",
      "Who is most likely to know the most bride secrets?",
      "Who would win a 'how well do you know the bride' round?",
      "Who is most likely to suggest one more round?",
      "Who would take the best candid photos?",
      "Who is most likely to make the bride laugh?",
      "Who would remember everyone's drink order?",
      "Who is most likely to start the dance floor?",
      "Who would give the best marriage advice?",
      "Who is most likely to suggest playing again at the rehearsal dinner?",
    ],
    faqAudience: "bachelorette parties",
    faqContext: "bridal weekends, wedding celebrations, and girls trips",
  },
  {
    slug: "games-for-adults",
    title: "Games for Adults",
    category: "Party",
    audience: "Adult friend groups, house parties, and grown-up hangouts",
    searchIntent:
      "Find browser games for adults with anonymous voting and funny group results.",
    priority: 36,
    clusters: ["party", "entertainment"],
    h1: "Games for Adults",
    metaTitle: "Games for Adults | Group Voting Game | FriendRank",
    metaDescription:
      "Create games for adults on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play from any phone at your next hangout.",
    intentSummaryTitle: "What are games for adults?",
    intentSummary:
      "Games for adults should feel fun without being childish or complicated. FriendRank gives grown-up groups a browser voting game: add names, share one link, vote anonymously on funny social roles, and reveal results together at dinner, a house party, or in the group chat. No board game setup, no app download, no signup required.",
    whyFriendRankTitle: "Why FriendRank works for adult groups",
    exampleQuestionsTitle: "Popular adult group game questions",
    faqTitle: "Games for adults FAQ",
    schemaDescription:
      "Create games for adults with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make your next adult hangout more fun with a quick voting game. Share one link, vote anonymously, and reveal funny results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before your next dinner or house party. Share the link and let everyone vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are adult group questions your friends can vote on.",
    finalCtaTitle: "Start your adult group game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your next hangout.",
    ctaLabel: "Create Adult Group Game",
    vibeTags: ["Party", "College", "Discord"],
    tone: "Funny",
    categories: [
      "Who brings the best party energy",
      "Who would pick the wine",
      "Who tells the best stories",
    ],
    questions: [
      "Who is most likely to suggest another round?",
      "Who would pick the best restaurant?",
      "Who is most likely to stay out the latest?",
      "Who would tell the funniest story?",
      "Who is most likely to plan the group trip?",
      "Who would win a trivia night?",
      "Who is most likely to send the follow-up text?",
      "Who would organize the dinner reservation?",
      "Who is most likely to know everyone's coffee order?",
      "Who would suggest the best after-party plan?",
      "Who is most likely to make the whole table laugh?",
      "Who would remember the most embarrassing story?",
      "Who is most likely to become the group planner?",
      "Who would pick the best playlist?",
      "Who is most likely to suggest playing again next month?",
    ],
    faqAudience: "adult groups",
    faqContext: "house parties, dinners, and grown-up friend hangouts",
  },
  {
    slug: "games-for-teens",
    title: "Games for Teens",
    category: "Entertainment",
    audience: "Teen friend groups, youth hangouts, and high school social circles",
    searchIntent:
      "Find browser games for teens with anonymous voting and shareable group results.",
    priority: 35,
    clusters: ["entertainment", "friendship"],
    h1: "Games for Teens",
    metaTitle: "Games for Teens | Friend Voting Game | FriendRank",
    metaDescription:
      "Create games for teens on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play together from any phone.",
    intentSummaryTitle: "What are games for teens?",
    intentSummary:
      "Games for teens need to be quick, phone-native, and funny enough to share in the group chat. FriendRank turns hangouts into a browser voting game: add friends, share one link, vote anonymously on teen-life roles, and unlock results together. Works for sleepovers, lunch tables, and Discord servers. No app download or account needed.",
    whyFriendRankTitle: "Why FriendRank works for teen groups",
    exampleQuestionsTitle: "Popular teen group game questions",
    faqTitle: "Games for teens FAQ",
    schemaDescription:
      "Create games for teens with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make hangouts more fun with a quick teen voting game. Add friends, share one link, vote anonymously, and reveal results in the group chat.",
    playImmediatelyBody:
      "Create a game on FriendRank in under a minute. Share the link in iMessage, Snapchat, or Discord and let everyone vote.",
    exampleQuestionsIntro:
      "Need inspiration? Here are teen group questions your friends can vote on.",
    finalCtaTitle: "Start your teen group game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your friend group chat.",
    ctaLabel: "Create Teen Group Game",
    vibeTags: ["College", "Discord", "Party"],
    tone: "Funny",
    categories: [
      "Who is most likely to go viral",
      "Who has the best group chat energy",
      "Who would plan the best hangout",
    ],
    questions: [
      "Who is most likely to go viral on social media?",
      "Who would plan the best weekend hangout?",
      "Who is most likely to know everyone's drama?",
      "Who would pick the best playlist?",
      "Who is most likely to fall asleep during a movie?",
      "Who would win a group trivia round?",
      "Who is most likely to start a trend in the friend group?",
      "Who would give the best advice?",
      "Who is most likely to forget their charger?",
      "Who would organize the group photo?",
      "Who is most likely to make everyone laugh in class?",
      "Who would survive a phone-free day?",
      "Who is most likely to suggest a late-night snack run?",
      "Who would remember everyone's birthday?",
      "Who is most likely to suggest playing again tomorrow?",
    ],
    faqAudience: "teen groups",
    faqContext: "high school hangouts, sleepovers, and friend group chats",
  },
  {
    slug: "games-for-families",
    title: "Games for Families",
    category: "Entertainment",
    audience: "Families, relatives, holiday gatherings, and mixed-age groups",
    searchIntent:
      "Find browser games for families with anonymous voting that works for mixed ages.",
    priority: 34,
    clusters: ["entertainment", "friendship"],
    h1: "Games for Families",
    metaTitle: "Games for Families | Family Voting Game | FriendRank",
    metaDescription:
      "Create games for families on FriendRank. Vote anonymously on funny family roles, reveal results together, and play from any phone.",
    intentSummaryTitle: "What are games for families?",
    intentSummary:
      "Games for families should work when ages, opinions, and attention spans differ. FriendRank gives relatives a simple browser voting game: add family names, share one link, vote anonymously on funny family roles, and reveal results together at dinner or a holiday gathering. Wholesome enough for cousins and funny enough for siblings. No app download needed.",
    whyFriendRankTitle: "Why FriendRank works for families",
    exampleQuestionsTitle: "Popular family game questions",
    faqTitle: "Games for families FAQ",
    schemaDescription:
      "Create games for families with FriendRank. Vote anonymously on funny family roles and reveal shareable results. No signup required.",
    heroSubtitle:
      "Make family gatherings more fun with a quick voting game. Add relatives, share one link, vote anonymously, and reveal results together.",
    playImmediatelyBody:
      "Create a game on FriendRank before dinner or during a holiday visit. Share the link and let family members vote from their phones.",
    exampleQuestionsIntro:
      "Need inspiration? Here are family questions your relatives can vote on.",
    finalCtaTitle: "Start your family game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for your next family gathering.",
    ctaLabel: "Create Family Game",
    vibeTags: ["Family", "Party", "College"],
    tone: "Wholesome",
    categories: [
      "Who tells the best family stories",
      "Who would host the best holiday dinner",
      "Who remembers every birthday",
    ],
    questions: [
      "Who is most likely to tell the best family story?",
      "Who would host the best holiday dinner?",
      "Who is most likely to remember every birthday?",
      "Who would win a family trivia round?",
      "Who is most likely to bring the best dessert?",
      "Who would organize the family photo?",
      "Who is most likely to start a group chat?",
      "Who would plan the best reunion?",
      "Who is most likely to fall asleep after dinner?",
      "Who would give the best advice to younger cousins?",
      "Who is most likely to suggest a board game next?",
      "Who would keep the kids entertained?",
      "Who is most likely to share old embarrassing photos?",
      "Who would pick the best holiday playlist?",
      "Who is most likely to make everyone laugh at the table?",
    ],
    faqAudience: "families",
    faqContext: "holiday gatherings, family dinners, and reunions",
  },
  {
    slug: "games-for-groups",
    title: "Games for Groups",
    category: "Social Voting",
    audience: "General groups, friend circles, events, and any social gathering",
    searchIntent:
      "Find browser games for groups with anonymous voting and one shared link.",
    priority: 53,
    clusters: ["social-voting", "entertainment"],
    h1: "Games for Groups",
    metaTitle: "Games for Groups | Anonymous Voting Game | FriendRank",
    metaDescription:
      "Create games for groups on FriendRank. Share one link, vote anonymously from phones, and reveal funny group results together in minutes.",
    intentSummaryTitle: "What are games for groups?",
    intentSummary:
      "Games for groups need one link, zero setup, and results everyone can see together. FriendRank is a browser voting game built for exactly that: add names, share the link in any chat app, vote anonymously on funny roles, and unlock results when enough people have voted. Works for friend groups, events, trips, and any hangout where phones are already out.",
    whyFriendRankTitle: "Why FriendRank works for any group",
    exampleQuestionsTitle: "Popular group game questions",
    faqTitle: "Games for groups FAQ",
    schemaDescription:
      "Create games for groups with FriendRank. Share one link, vote anonymously, and reveal funny group results. No signup required.",
    heroSubtitle:
      "Start a group voting game in under a minute. Add names, share one link, vote anonymously, and reveal results together.",
    playImmediatelyBody:
      "Create a game on FriendRank and share the link in WhatsApp, iMessage, Discord, or email. Everyone votes from their phone.",
    exampleQuestionsIntro:
      "Need inspiration? Here are group questions your friends can vote on.",
    finalCtaTitle: "Start your group game",
    finalCtaSubtitle: "Free, mobile-friendly, and ready for any hangout.",
    ctaLabel: "Create Group Game",
    vibeTags: ["Party", "College", "Discord"],
    tone: "Funny",
    categories: [
      "Who brings the best group energy",
      "Who would plan the next hangout",
      "Who is most likely to start the group chat",
    ],
    questions: [
      "Who is most likely to suggest a group game?",
      "Who would plan the next hangout?",
      "Who is most likely to talk to everyone?",
      "Who would pick the best group playlist?",
      "Who is most likely to organize the group photo?",
      "Who would win a group trivia round?",
      "Who is most likely to send the follow-up text?",
      "Who would keep the conversation going?",
      "Who is most likely to make strangers feel welcome?",
      "Who would rally everyone for one more round?",
      "Who is most likely to remember everyone's order?",
      "Who would tell the funniest story?",
      "Who is most likely to start the inside joke?",
      "Who would survive the longest road trip?",
      "Who is most likely to become the group planner?",
    ],
    faqAudience: "groups",
    faqContext: "friend hangouts, events, trips, and group chats",
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
    'import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";',
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
    "/** Audience authority landing page definitions — Phase 7G Sprint 1. */",
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
    lines.push(`    suggestedVibeTags: [${page.vibeTags.map((tag) => `"${tag}"`).join(", ")}],`);
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
    lines.push(`export const ${prefix}_FAQ: LandingPageFaqItem[] = ${JSON.stringify(buildFaq(page), null, 2)};`);
    lines.push("");
  }

  lines.push("export const AUDIENCE_AUTHORITY_PAGE_SLUGS = [");
  for (const page of PAGES) {
    lines.push(`  "${page.slug}",`);
  }
  lines.push("] as const;");
  lines.push("");

  fs.writeFileSync(
    path.join(ROOT, "lib/landing-pages/content/audience-authority-content.ts"),
    lines.join("\n"),
  );
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
    '} from "@/lib/landing-pages/content/audience-authority-content";',
    "",
    "type AudienceAuthorityAssemblyInput = {",
    "  assembleLandingPage: (input: {",
    "    intent: {",
    "      slug: string;",
    "      title: string;",
    "      metaTitle: string;",
    "      metaDescription: string;",
    "      h1: string;",
    "      intentSummaryTitle: string;",
    "      intentSummary: string;",
    "      whyFriendRankTitle: string;",
    "      exampleQuestionsTitle: string;",
    "      faqTitle: string;",
    "      schemaDescription: string;",
    "      ctaLocation: CtaLocation;",
    "      gamePreset: LandingPageGamePreset;",
    "    };",
    "    audience: {",
    "      heroSubtitle: string;",
    "      playImmediatelyBody: string;",
    "      exampleQuestionsIntro: string;",
    "      finalCtaTitle: string;",
    "      finalCtaSubtitle: string;",
    "    };",
    "    primaryCta: LandingPageCta;",
    "    faq: LandingPageFaqItem[];",
    "    exampleQuestions: LandingPageExampleQuestion[];",
    "  }) => LandingPageData;",
    "};",
    "",
    "export function registerAudienceAuthorityPages({",
    "  assembleLandingPage,",
    "}: AudienceAuthorityAssemblyInput) {",
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

  fs.writeFileSync(
    path.join(ROOT, "lib/landing-pages/audience-authority-pages.ts"),
    assembly.join("\n"),
  );
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

function generateRegistryEntries() {
  return PAGES.map(
    (page) => `  {
    slug: "${page.slug}",
    title: "${page.title}",
    intentCategory: "${page.category}",
    searchIntent:
      "${page.searchIntent}",
    audience: "${page.audience}",
    estimatedPriority: ${page.priority},
    status: "live",
  },`,
  ).join("\n");
}

function generateAnalyticsEntries() {
  return PAGES.map((page) => `  | "${slugToCtaLocation(page.slug)}"`).join("\n");
}

function generateClusterPatch() {
  const audienceSlugs = PAGES.map((page) => page.slug);
  const clusterAdds = {};

  for (const page of PAGES) {
    for (const clusterId of page.clusters) {
      clusterAdds[clusterId] ??= [];
      clusterAdds[clusterId].push(page.slug);
    }
  }

  return { audienceSlugs, clusterAdds };
}

generateContentFile();
generateAssemblyFile();
generateRoutes();

const patch = generateClusterPatch();
fs.writeFileSync(
  path.join(ROOT, "scripts/.audience-authority-registry.txt"),
  generateRegistryEntries(),
);
fs.writeFileSync(
  path.join(ROOT, "scripts/.audience-authority-analytics.txt"),
  generateAnalyticsEntries(),
);
fs.writeFileSync(
  path.join(ROOT, "scripts/.audience-authority-clusters.json"),
  JSON.stringify(patch, null, 2),
);

console.log(`Generated content, assembly helper, and ${PAGES.length} routes.`);
