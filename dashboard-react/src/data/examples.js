/**
 * Curated benchmark dataset of 200 real examples from training & test corpus
 * (~100 Sarcastic, ~100 Non-Sarcastic)
 * 6 Exact Types: Sarcasm, Irony, Satire, Understatement, Overstatement, Rhetorical Question
 */
export const EXAMPLES = [
  {
    "text": "I suppose though, we did sign one for the future so, you know, not all gloom and doom...we might be good in 6 years time.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-1"
  },
  {
    "text": "I always think going braless is a good idea until I'm in public and am insecure because I'm not wearing a bra",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-2"
  },
  {
    "text": "Started watching house of cards, 4 episodes in. Already I can see it was a good choice\ud83d\ude04",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-3"
  },
  {
    "text": "life is so much better with a heating blanket",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-4"
  },
  {
    "text": "Billy Gunn sorta relevant for the first time in years...",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-5"
  },
  {
    "text": "Sometimes I just go through my phone and look at pictures of my dog",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-6"
  },
  {
    "text": "okay but like the say so song ain\u2019t that bad. I\u2019m unironically jam to it lmao",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-7"
  },
  {
    "text": "was not back in the states for even 5 minutes before someone ran into me at the airport with their suitcase and said \u201cope, sorry!\u201d I\u2019m home :-)",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-8"
  },
  {
    "text": "Lucky for 2nd placed Brentford that there's no stand out team like Leeds this year, or they might have no chance of winning the league. #ncfc",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-9"
  },
  {
    "text": "in desperate need of (and I can NOT stress this enough) spring break",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-10"
  },
  {
    "text": "There is not enough people here #ivoryrooms",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-11"
  },
  {
    "text": "I've said it before and I'll say it again but YOUR MENTAL HEALTH IS SO MUCH MORE IMPORTANT THAN A GOOD GRADE",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-12"
  },
  {
    "text": "Suspect there\u2019s still room for you in the ground",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-13"
  },
  {
    "text": "I couldn\u2019t have imagined how much fun I would have with people I\u2019ve met through streaming. I\u2019m so thankful to live in this timeline even if it is relatively garbage.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-14"
  },
  {
    "text": "I heard it might be snowing ??? Sounds fake, but okay??? Can anyone verify?????????",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-15"
  },
  {
    "text": "woke up to my dog sneezing on my face. How\u2019s your day going so far?",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-16"
  },
  {
    "text": "breaking my strict buying hiatus to get lisa\u2019s album? it\u2019s much more likely than you\u2019d think",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Understatement",
    "id": "ex-17"
  },
  {
    "text": "Does the salad offset the beer(s)?",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-18"
  },
  {
    "text": "Beautician and the Beast (1997). Best Timothy Dalton film of all time.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-19"
  },
  {
    "text": "Why do I have a doctorate and miss the restaurant industry SO MUCH",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-20"
  },
  {
    "text": "Taxes are just the best and I cannot wait to pay more \ud83d\ude07\ud83e\udd70\ud83e\udd7a",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-21"
  },
  {
    "text": "\u201cThe more you toot the more you poop\u201d -my 6 yo nephew",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-22"
  },
  {
    "text": "Horse dancing is my new favorite Olympic sport, I have no clue what\u2019s happening, but this is incredible",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-23"
  },
  {
    "text": "Perk of doing a newborn hearing screening on an SLP\u2019s baby: not having to discuss speech and language milestones",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-24"
  },
  {
    "text": "You\u2019re all sickos for being mean to Trump so much for the tolerant left \ud83d\ude44 anyways George Floyd had it coming",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-25"
  },
  {
    "text": "Fox News et al should be shut down. Absolutely heartbreaking. \ud83d\udc94 #GOPTraitors",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-26"
  },
  {
    "text": "It's nice to see some heritage organisations are doing the right thing and putting the safety of their staff, visitors and volunteers first. Wonder what that's like... ...for reasons, this is aimed at nobody.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-27"
  },
  {
    "text": "What\u2019s more embarrassing is how terrible Florida is doing with containing COVID-19. An utter disgrace. Wearing a mask to protect yourself and others is not embarrassing, it\u2019s leadership.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-28"
  },
  {
    "text": "Thinking about that time Blizzard had the brilliant idea to change everyone's name on their forums to their real names. God, what an idea that was.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-29"
  },
  {
    "text": "Yeah, Lydia! Making Alaska proud \ud83c\uddfa\ud83c\uddf8\ud83c\udfca\u200d\u2640\ufe0f",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-30"
  },
  {
    "text": "Inspired by the \u2018dinner with Jay Z\u2019 guy still going strong. I choose now to believe him",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-31"
  },
  {
    "text": "Publisher, not developer.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-32"
  },
  {
    "text": "For a good laugh, follow me over on to see my best attempt at covering sports business news for class this semester.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-33"
  },
  {
    "text": "My neice (4 or 5 at the time) *loved* playing Mario Kart 8 with her dad using the acceleration and steering assists. Before that she was mostly a spectator while he played kid-friendly games like Ape Escape.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-34"
  },
  {
    "text": "Joey the genius! I wish i was as brainy as him #towie",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-35"
  },
  {
    "text": "Rant completely warranted! Market Research is my thing, and I lose count of how many times UX appears to be a distant concern compared to \u201cbut we must gather ALL OF THE DATA\u201d",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-36"
  },
  {
    "text": "Well. That went well. #BelgianGP",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-37"
  },
  {
    "text": "So excited just seen #chitty bang bang car on the road in",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-38"
  },
  {
    "text": "You're so close to understanding baseline biasing. You can get there, I believe in you!",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-39"
  },
  {
    "text": "perhaps you could make your shop mobile and take essential items to hospitals, and other key places, so it makes it easier for staff to get items they need",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-40"
  },
  {
    "text": "Mine and snapchats are just stunning\ud83d\udc4c",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-41"
  },
  {
    "text": "ive been watching british streamers for too long. i caught myself saying aircon instead of AC",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-42"
  },
  {
    "text": "Great night last night! Muggins here is the commis chef crouched down in the corner. Seriously an honour to help raise money for and work alongside these stellar chefs. Thanks for having us !",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-43"
  },
  {
    "text": "i know starting up school again can be very stressful but pls remember to stay hydrated, don\u2019t overwhelm yourself, and reach out for help if you need it (my dms are open!) :)",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-44"
  },
  {
    "text": "You\u2019re right, it\u2019s all one big conspiracy. You should boycott the NHS too, they\u2019re in on it as well",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-45"
  },
  {
    "text": "i lost the promise ring my boyfriend got for me about a year ago\u2026 and when he left for basic he let me keep the one i gave him since he couldnt take it. well i found mine- our rings are back together :)",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-46"
  },
  {
    "text": "if i think you would have a chance against fury i mean its easy for some broken bodied old boy to beat the best in the world",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Satire",
    "id": "ex-47"
  },
  {
    "text": "Can anyone provide crutches in the eastleigh area? #help",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-48"
  },
  {
    "text": "90% of adulthood is just refilling your Brita pitcher.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-49"
  },
  {
    "text": "#PostAnUnpopularFoodOpinion salad cream on toast mmmmmmmm",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-50"
  },
  {
    "text": "Heard a rumor that Baja Blast is coming to stores and regardless if anything else I hope for in life falls through, at least I'll have this.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-51"
  },
  {
    "text": "Getting very anxious waiting for #TheGrandTour",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-52"
  },
  {
    "text": "I love not being pregnant so much it\u2019s my fave thing about myself",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-53"
  },
  {
    "text": "Oh my what was that noise? The dog isn\u2019t happy either! #loudbang",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-54"
  },
  {
    "text": "Would love a cheeky McDonald\u2019s breakfast before a busy day at work would set the day off on the right foot ! \ud83d\udc93 #FancyAMcDonalds",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-55"
  },
  {
    "text": "Wait for the car driving down the path!",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-56"
  },
  {
    "text": "i would kill a man for a forehead kiss rn",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-57"
  },
  {
    "text": "Driving to work singing along and oh story short I Michael Ball fistbumped my wrist straight into the roof of the car",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-58"
  },
  {
    "text": "Can\u2019t wait to be back at uni so I can order more shoes and clothes without my mum telling me off x",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-59"
  },
  {
    "text": "There is a boiling hot place in hell for the bloke who brought and used his nail clippers in a library.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-60"
  },
  {
    "text": "whoa! that's a little too crazy man, slow down",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-61"
  },
  {
    "text": "Fun fact: I sing I Morgan ar en annan dag to my daughter to get her to sleep and it works a charm. #eurovisionagain",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-62"
  },
  {
    "text": "the manliest thing I can think of is when the men from the World Cup passionately sing their national anthem",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-63"
  },
  {
    "text": "yet again breaking the UK formula marketing rules. Please educate your staff.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-64"
  },
  {
    "text": "Hands up who remembers when EVERY blogger and their dog was a brand ambassador for Coconut Lane \ud83d\ude02",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-65"
  },
  {
    "text": "Finally got my phone back! #crap #samsung",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-66"
  },
  {
    "text": "hello to all three of my followers, this is my big return to twitter",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-67"
  },
  {
    "text": "Leaving this assignment to the last minute was probably not a smart move #w100",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-68"
  },
  {
    "text": "How is it possible that Sly Stallone\u2019s \u2018Cobra\u2019 is both the best and the worst movie ever made?",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-69"
  },
  {
    "text": "Match play golf is just class to watch",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-70"
  },
  {
    "text": "South Park being taken off Hulu is the worst thing that\u2019s happened to me personally in 2020 and like.. my dad died",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-71"
  },
  {
    "text": "As if we\u2019re all actually going back to the footy tomorrow literally gonna be epic",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-72"
  },
  {
    "text": "its 3 30 am and I have decided the only redeeming quality of a male is that I can put my freezing cold toes on him and leach his warmth",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-73"
  },
  {
    "text": "GIVE THE BALL BOBBY AND HE WILL SCORE \u26bd\ufe0f",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-74"
  },
  {
    "text": "Just had a flashback about a boy and nearly threw up in my mouth",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-75"
  },
  {
    "text": "i love talking about feminism when I'm drunk",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-76"
  },
  {
    "text": "Just rediscovered that my nose is always in my field of vision so I will unfortunately be dropping out as I cannot continue my assigned readings in peace",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-77"
  },
  {
    "text": "quicksand is not as big of a problem in my adult life as I thought it would be",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-78"
  },
  {
    "text": "North Dakota: *has one decent week of weather* Mother Nature: NOW I SHALL CAST OUT THE SUN AND BRING THE COLDEST OF RAINS UPON THY SUPER, DUPER FLAT LAND.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-79"
  },
  {
    "text": "not really too fussed about clubs, just wanna be able to book my driving test lol",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-80"
  },
  {
    "text": "I really hate the new TikTok voice over voice - she sound annoying af",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-81"
  },
  {
    "text": "Not sure if this has been answered somewhere or not, but are the MTX going to be live for Early Access, or is that something for the 22nd?",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-82"
  },
  {
    "text": "rewatching degrassi for the millionth time",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-83"
  },
  {
    "text": "It's probably something closer to Xenophobia. Which is someone hating someone else just because they're foreign. I mean, you are an English teacher, aren't you? Figured you might know that.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-84"
  },
  {
    "text": "Matt Hancock is a top shagger",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-85"
  },
  {
    "text": "I feel that 100%, my anxiety stops me from talking to so many people. I've let so many friendships die because I can't push myself to talk to them.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-86"
  },
  {
    "text": "tanning in this heat is an extreme sport",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Overstatement",
    "id": "ex-87"
  },
  {
    "text": "Well done and , great leadership!",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-88"
  },
  {
    "text": "Why would Alexa's recipe for Yorkshire pudding be a bhaji yorkshire pudding ??",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-89"
  },
  {
    "text": "Congratulations Jayden. A worthy winner of the award and a bright future ahead of you.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-90"
  },
  {
    "text": "Holly Arnold ??? Who #ImACeleb #MBE nope not sure oh hang on you mean MBE yes that\u2019s her !!!",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-91"
  },
  {
    "text": "Amazing! Simply amazing. Well done Sky Brown. You are an inspiration to all of us.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-92"
  },
  {
    "text": "do i just blast maneskin to get hyped for my osce or??",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-93"
  },
  {
    "text": "And so it begins. The Sunday back to school preparation. \ud83d\ude29",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-94"
  },
  {
    "text": "Does he order 11 at once and drink each one at just over 5 minutes, OR do we have to take into account going to the bar? Either way it\u2019s a disgrace and not what we should be promoting to the kids.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-95"
  },
  {
    "text": "I'm settled for a night in front of the TV watching #SoccerAid",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-96"
  },
  {
    "text": "Got locked out of Twitter for saying it\u2019s embarrassing to be an arsenal fan. That\u2019s not okay, but people can be abusive and racist and nothing?!? Okay! \ud83e\udd23\ud83d\ude44",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-97"
  },
  {
    "text": "Home made pizza is in the oven! We've made one each so there'll be leftovers for lunch tomorrow. \ud83d\ude0b",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-98"
  },
  {
    "text": "Avoid mass gatherings.. does this mean that I can stay home tomorrow as I work at a school? No I thought not. #schoolclosure",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-99"
  },
  {
    "text": "drive to work with no music kinda day",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-100"
  },
  {
    "text": "Between Mikey cooking and Didi cooking for me I relaxing \ud83d\ude0e cooking?? I don\u2019t know her",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-101"
  },
  {
    "text": "attack on Titan I\u2019m not ok Saw a few leaks on purpose bc I like to torture myself and I\u2019ll wait to read the whole chapter tomorrow but oh my god oh my god I\u2019m hurting",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-102"
  },
  {
    "text": "How I flirt with boys Boy: \u201cHey I saw you from across the room and had to come over\u201d Me: \u201cWow you\u2019re super observant. Do you have 20/20 vision?\u201d",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-103"
  },
  {
    "text": "i hate when that guy on tiktok is all \u201ci uNdeRsTAnd iTs eASy tO keEp wAtChInG vIdEos..\u201d LIKE BRO MIND YA BUSINESS",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-104"
  },
  {
    "text": "how do I get my boyfriend in a maid costume?",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-105"
  },
  {
    "text": "And we still wonder why girls are having issues with their body when you have places selling LARGE and saying it is for sizes 10-12 \ud83d\ude43 stop the bus I want off",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-106"
  },
  {
    "text": "did you actually fly on a plane if you didn\u2019t post a picture of the view from your window?",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-107"
  },
  {
    "text": "am honestly so disturbed by the star signs changes?? like I\u2019m a Scorpio not a libra?? am so so stressed",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-108"
  },
  {
    "text": "omg there\u2019s a sheet of ice in front of my school. should I slip and fall?",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-109"
  },
  {
    "text": "Nothing can ruin a summer like hayfever",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-110"
  },
  {
    "text": "yeah your girl is fine but does she pass out while giving blood",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-111"
  },
  {
    "text": "I cannot stress how much I hate the noise of people eating. Can\u2019t be downstairs when my parents are eating because it\u2019s so fucking unbearable \ud83d\ude02",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-112"
  },
  {
    "text": "Few links for you. To summarise, wearing face masks seems to be more effective than not. Who'da thunk...",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-113"
  },
  {
    "text": "Worst mistake you can ever make is not taking ur mates advice, hands down",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-114"
  },
  {
    "text": "dont you love it when youre just chilling in your room and then theres a spider and you kill it but when you kill it you spill soda all over your keyboard yeah me too",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-115"
  },
  {
    "text": "The world we live in today actually disgusts me.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-116"
  },
  {
    "text": "dont u just love when u get ready for a cancelled date two hours early . . . yeah i wasnt excited or anything",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-117"
  },
  {
    "text": "The world according to Jeff Goldblum is such a gift",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-118"
  },
  {
    "text": "wouldn\u2019t it be cool if i could spontaneously combust",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-119"
  },
  {
    "text": "#DominicCummings Sack him. Or better yet, charge him.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-120"
  },
  {
    "text": "Hey Siri, how do I stop simping?",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-121"
  },
  {
    "text": "PLT slamming their brand name on everything winds me up. You\u2019ll find something really nice but it\u2019s got \u2018PRETTY LITTLE THING\u2019 written in caps all over the front \ud83d\ude29",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-122"
  },
  {
    "text": "Hey does anyone know of any organizations that have massive stockpiles of money that could be super useful to the world during a public crisis?????",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-123"
  },
  {
    "text": "Meh\u2026Drakes album. Don\u2019t feel like there\u2019s a song on there that I wanna listen to twice. Maybe it will grow on me \ud83e\udd37\ud83c\udffc\u200d\u2640\ufe0f",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-124"
  },
  {
    "text": "hey quick question is it fall or spring???",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-125"
  },
  {
    "text": "finding vegetarian chocolate mousse is such an annoyingly hard task to do",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-126"
  },
  {
    "text": "Hey what's the weather like today? Am I going to need an umbrella?",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Rhetorical Question",
    "id": "ex-127"
  },
  {
    "text": "I haven\u2019t seen my best friend in over a year I am not coping well :((",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-128"
  },
  {
    "text": "The only thing I got from college is a caffeine addiction",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-129"
  },
  {
    "text": "happy one year vegetarian to me \u2764\ufe0f\ud83c\udf31",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-130"
  },
  {
    "text": "ANY PENSIONER AND 4 YEAR OLD WHO DARE TAKE ME ON AT DINOSAUR THEMED CRAZY GOLF WILL BE CRUSHED, CRUSHED I TELL YOU.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-131"
  },
  {
    "text": "There are so many films I want to see atm! This would be amazing \ud83d\ude4c",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-132"
  },
  {
    "text": "My eldest is having a wild Friday night out. She's going to bingo. \ud83d\ude02",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-133"
  },
  {
    "text": "One positive of being stuck inside all the time is I've almost got back to being as good at FIFA as when I was 15, and I consider that an achievement",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-134"
  },
  {
    "text": "gaslight gatekeep girl boss",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-135"
  },
  {
    "text": "Having my first experience of a Whetherspoon hotel tonight and pleased to report that while the bed is comfy, the bathroom smells suspiciously of cider",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-136"
  },
  {
    "text": "Not got one lynx Africa for Christmas Day this year, shocked and outraged. #RuinedChristmas",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-137"
  },
  {
    "text": "There's a gigantic, newly opened, posh box of chocolates in the kitchen at work marked 'for everyone' and now I'm wondering which one of my colleagues got dumped on Valentine's Day",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-138"
  },
  {
    "text": "teams is down what a shame I can\u2019t do my assignments \ud83d\udc49\ud83c\udffd\ud83d\udc48\ud83c\udffd",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-139"
  },
  {
    "text": "I think France will win #Euro2016. Predict who will flop and come out on top at",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-140"
  },
  {
    "text": "July 1st. Half way point of the year. Well I think we can all agree that 2020 has gone swimmingly so far. Can\u2019t wait for part 2. #murderhornets",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-141"
  },
  {
    "text": "This is the XI I think should start against Russia at Euro 2016. Who would you pick? #MyEnglandXI via",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-142"
  },
  {
    "text": "I just absolutely LOVE how I've got to work outside for the next 3 days in the heatwave. #sweatingmyballsoff",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-143"
  },
  {
    "text": "Two goals caused by two awful goalkeepers #Capitalonecup",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-144"
  },
  {
    "text": "Ah yes, it really is wood-burning stoves in sub-Saharan Africa thats driving the climate crisis \ud83e\udde0",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-145"
  },
  {
    "text": "i despise the racism within oldham",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-146"
  },
  {
    "text": "What a Race ! #sarcastic #WTF1",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-147"
  },
  {
    "text": "i am 21 years old and i still love harry styles as much as i did when i was 11",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-148"
  },
  {
    "text": "help! i'm being haunted by dead people! (my dissertations)",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-149"
  },
  {
    "text": "let\u2019s bring it home biden",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-150"
  },
  {
    "text": "considering crowd surfing the next time the hallways are too packed",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-151"
  },
  {
    "text": "Whenever I text Scott in the middle of the night and tell him it\u2019s been a rough night or that I\u2019m tired, he brings me breakfast home and this is the type of love language I\u2019m here for \ud83e\udd17",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-152"
  },
  {
    "text": "You know the wolves match is boring when you're talking with your mate about the best way to wire up his new shed!",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-153"
  },
  {
    "text": "I\u2019m going back to work exactly 8 weeks postpartum and that just doesn\u2019t sit right with me",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-154"
  },
  {
    "text": "What a wonderful time to have your AC go out",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-155"
  },
  {
    "text": "I\u2019m on a serious treat myself kick and I\u2019m not mad about it",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-156"
  },
  {
    "text": "absolutely love waking up to the fire alarm at 7 am \ud83d\ude0d",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-157"
  },
  {
    "text": "I just wanna lie in bed and eat skips and get paid for it",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-158"
  },
  {
    "text": "Raging debate on the importance of an Orlando Magic Summer League Championship. Definitely a notch below 6 if decided by coin flip.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-159"
  },
  {
    "text": "I am late to the same lecture every single week it's so embarrassing",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-160"
  },
  {
    "text": "Ah gotta love that Friday morning burnt out feeling \ud83c\udf04",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-161"
  },
  {
    "text": "Cannot cope with uni reading it's doing my head in!",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-162"
  },
  {
    "text": "My work email isn\u2019t working so I can just log off for the day right? \ud83d\ude44",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-163"
  },
  {
    "text": "I ask myself everyday why did i pick art?",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-164"
  },
  {
    "text": "there\u2019s no better way to wake up than having one dog jump directly on your stomach and knock the wind out of you while the other drop a dead rodent on the end of the bed. \ud83d\ude11",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-165"
  },
  {
    "text": "Bring me the horizon's new song drown is my new favourite",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-166"
  },
  {
    "text": "STOP TREATING MARS LIKE A BACK-UP BOYFRIEND JUST FIX YOUR CURRENT RELATIONSHIP WITH EARTH BECAUSE YOU CAN'T LIVE HERE.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Irony",
    "id": "ex-167"
  },
  {
    "text": "spaghetti bolognese isn\u2019t the same without garlic bread",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-168"
  },
  {
    "text": "I love it when professors draw a big question mark next to my answer on an exam because I\u2019m always like yeah I don\u2019t either \u00af\\_(\u30c4)_/\u00af",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-169"
  },
  {
    "text": "bloody buzzing i\u2019ve got a new job !!!",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-170"
  },
  {
    "text": "Today my pop-pop told me I was not \u201cforced\u201d to go to college \ud83d\ude43 okay sure sureeee",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-171"
  },
  {
    "text": "elrow at ushua\u00efa was bloody great",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-172"
  },
  {
    "text": "I did too, and I also reported Cancun Cruz not worrying about the heartbeats of his constituents without electricity or heat when he fled to Mexico.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-173"
  },
  {
    "text": "Trains are so unreliable \ud83d\ude44",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-174"
  },
  {
    "text": "someone hit me w a horse tranquilizer istg ive been in a pool of sweat for 6 hours and i havent slept im so tired but i love my friend so much and oh my fucking god i cant rn",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-175"
  },
  {
    "text": "Love Frank Oceans new album\ud83d\udc4c\ud83c\udffb",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-176"
  },
  {
    "text": "Loving season 4 of trump does America. Funniest season yet #DonaldTrump #Trump #MAGA #MAGA2020",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-177"
  },
  {
    "text": "Mom put powdered carpet cleaner all over the floor and now it legit smells like we are living in a stable",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-178"
  },
  {
    "text": "Just like to congratulate everyone on the Kop today for the fastest ever Poor Scouser Tommy. Slow the fuck down",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-179"
  },
  {
    "text": "Rust is basically turning into Subnautica 2.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-180"
  },
  {
    "text": "I never thought I'd say this, but I have become one of those people who like bounty bars.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-181"
  },
  {
    "text": "He's right, not enough to warrant resubbing and at this point people are already talking about the next expansion because they're completely over this one.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-182"
  },
  {
    "text": "Whoever\u2019s toddler ass sprayed the entire toilet backstage, I hope you stub your toe and bite your tongue really hard. also you were clearly dehydrated, go drink some damn water like an adult",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-183"
  },
  {
    "text": "Really interesting map, you can tell a lot of love and care went into it.",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-184"
  },
  {
    "text": "I was only in Taylor Swift\u2019s top 0.10% of listeners on Spotify but last year but yeah totally sound that Swiftogeddan in Glasgow is sold out",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-185"
  },
  {
    "text": "Selling 2 X Zutekh Presents Mella Dee at Square One Manchester Tickets 22nd August - \u00a318 Each, cheaper than face value Message me or to buy",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-186"
  },
  {
    "text": "Imagine going to university for 4 years when you could just follow Elon Musk on twitter for free",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-187"
  },
  {
    "text": "I\u2019ve got 4 weekend tickets available, DM me",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-188"
  },
  {
    "text": "The villains in super hero films are awfully polite. They always confine their invasions to being above one particular city",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-189"
  },
  {
    "text": "Wouldn\u2019t change you mads\ud83d\udc98",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-190"
  },
  {
    "text": "Oh my goodness. It\u2019s the first week of the summer holidays and Harrison has found his recorder. Give. Me. Strength.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-191"
  },
  {
    "text": "Off to london today for the Aurora Programme! See all you girl bosses there! \ud83d\udc81\ud83c\udffd\u200d\u2640\ufe0f\ud83d\udc95 #Iamaurora",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-192"
  },
  {
    "text": "Well I doubt they're trying to smash the doors in to change the regulation of cough medicine.",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-193"
  },
  {
    "text": "One positive of the dark mornings is you can walk the dogs in your pyjamas and no one can tell \ud83e\udd17\ud83e\udd17\ud83e\udd17",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-194"
  },
  {
    "text": "Not at all concerning that a man's just been round to fiddle with the boiler and now he's left the carbon monoxide alarm won't stop beeping",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-195"
  },
  {
    "text": "Submitted my application for PhD funding today, then shit myself and wanted to withdraw it \ud83d\ude02\ud83d\ude48",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-196"
  },
  {
    "text": "Not telling anyone how I voted in case it doesn't come true #EUref",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-197"
  },
  {
    "text": "Been playing Ghost of Tsushima and I love it!!!",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-198"
  },
  {
    "text": "just wondering how to get my diss down by 1500 words .. such fun",
    "isSarcastic": true,
    "expected": "YES",
    "category": "Social Media",
    "sarcasmType": "Sarcasm",
    "id": "ex-199"
  },
  {
    "text": "Trying to meet my friend and she\u2019s literally lost in John Lewis omg",
    "isSarcastic": false,
    "expected": "NO",
    "category": "Genuine Statement",
    "sarcasmType": null,
    "id": "ex-200"
  }
];
