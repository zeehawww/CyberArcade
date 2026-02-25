"""
Structured cybersecurity awareness learning modules for Student, Digital Citizen, and IT Professional.
Awareness-focused (not gaming). Implementation-ready for web app.
"""

# ---------------------------------------------------------------------------
# STUDENT AWARENESS MODULE
# ---------------------------------------------------------------------------
STUDENT_AWARENESS = {
    "title": "Cybersecurity Awareness for Students",
    "target_audience": "This module is for students in school or college who use the internet for learning, social media, and gaming. It uses simple language and examples from everyday student life.",
    "learning_objective": "Develop a cautious, questioning mindset: pause before clicking or sharing, spot when something feels off, and know where to get help.",
    "content": {
        "sections": [
            {
                "section_title": "Introduction to Cybersecurity",
                "concept_explanation": "Cybersecurity means protecting computers, phones, and online accounts from people who try to steal information, money, or control. It's like locking your door and not sharing your house key with strangers.",
                "real_world_example": "Your school tells you not to share your login details. You understand that those details are valuable, just like money or a bicycle you wouldn't leave unlocked.",
                "how_attack_works": "Attackers try to trick you, guess passwords, or sneak malicious software onto your device so they can take over your account or see your files.",
                "warning_signs": "Being asked for your password by someone online, messages that seem too good to be true, or apps that ask for lots of permissions.",
                "how_to_prevent": "Keep your passwords private, update software, use strong passwords, and ask a trusted adult when something seems strange.",
                "quiz_mcqs": [
                    {"q": "What is cybersecurity about?", "options": ["Locking doors", "Protecting your online accounts and devices from bad people", "Playing video games", "Writing code"], "correct": 1},
                    {"q": "Which is a good cybersecurity habit?", "options": ["Sharing your password with friends", "Using strong passwords and not clicking suspicious links", "Posting your address online", "Ignoring software updates"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A friend asks for your school account password so they can 'borrow' it for a game. What should you do?", "options": ["Give it to them", "Tell them no and explain it's private; suggest they create their own account", "Change your password then give it", "Tell a teacher you lost the password"], "correct": 1}
            },
            {
                "section_title": "Types of Cyber Threats",
                "concept_explanation": "There are many threats online, like malware (bad software), phishing (fake messages), social engineering (people tricking you), hacking (breaking into systems), and scams.",
                "real_world_example": "A classmate gets a weird email with a link; when clicked, malware installs. Another gets a fake friend request asking for money.",
                "how_attack_works": "Each threat works differently: malware infects a device, phishing tricks you into revealing info, social engineering plays on trust, and hacks exploit weak security.",
                "warning_signs": "Unknown downloads, urgent or odd messages, people you don't really know asking for favors, doors (accounts) with weak or no locks.",
                "how_to_prevent": "Learn the common threats, be cautious with links and downloads, verify people before trusting, and keep your devices and passwords strong.",
                "quiz_mcqs": [
                    {"q": "Which of these is NOT a type of cyber threat?", "options": ["Phishing", "Malware", "Ice cream", "Social engineering"], "correct": 2},
                    {"q": "What does malware do?", "options": ["Cools your computer", "Runs without your permission and can damage data", "Makes your screen brighter", "Saves your game progress"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You get a message about a prize and click the link; a program starts installing and you didn't expect it. What type of threat is this?", "options": ["Phishing", "Malware", "Social engineering", "Hacking"], "correct": 1}
            },
            {
                "section_title": "Safe Browsing Habits",
                "concept_explanation": "Browsing safely means visiting only trusted websites, looking for HTTPS and padlock icons, and not clicking on suspicious pop‑ups or ads.",
                "real_world_example": "A student avoids a 'free movie' link on a sketchy site and instead watches on a legitimate streaming service, avoiding malware.",
                "how_attack_works": "Malicious sites trick you into downloading bad files or steal your info when you type it in.",
                "warning_signs": "'Free stuff' pop-ups, sites that keep redirecting you, URLs that look weird or misspelled.",
                "how_to_prevent": "Type addresses yourself or use bookmarks, avoid clicking ads, close sketchy tabs, and keep your browser updated.",
                "quiz_mcqs": [
                    {"q": "What is a sign of a suspicious website?", "options": ["Padlock icon in the address bar", "URL with strange spelling like 'g00gle.com'", "Easy-to-read content", "HTTPS prefix"], "correct": 1},
                    {"q": "If a site has lots of pop-ups saying you won a prize, you should:", "options": ["Click them", "Leave the site and don't download anything", "Enter your password to claim it", "Share it with friends"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You land on a site that says 'Your computer is infected! Click here to scan.' What do you do?", "options": ["Click the scan button", "Close the tab and run a real antivirus program if you're worried", "Share it on social media", "Restart your device"], "correct": 1}
            },
            {
                "section_title": "Email Security Basics",
                "concept_explanation": "Emails can carry links and attachments that are dangerous. Only open messages from people you know, and don't click links asking for passwords or money.",
                "real_world_example": "A student receives an email with an attachment claiming to be homework. Opening it installs malware.",
                "how_attack_works": "Attackers send emails pretending to be someone else, including links to fake login pages or harmful attachments.",
                "warning_signs": "Unexpected attachments, messages asking for personal info, emails from odd addresses.",
                "how_to_prevent": "Verify sender addresses, don't open attachments from strangers, hover over links to see where they go, and when in doubt ask an adult.",
                "quiz_mcqs": [
                    {"q": "An email from a friend has an attachment you weren't expecting. You should:", "options": ["Open it immediately", "Check with your friend before opening", "Forward to others", "Delete your inbox"], "correct": 1},
                    {"q": "What should you do before clicking a link in an email?", "options": ["Hover to see the real URL", "Click right away", "Reply 'Thanks'", "Post it online"], "correct": 0}
                ],
                "scenario_question": {"scenario": "You get an email saying your password will expire and includes a link to 'renew'. The sender address looks slightly odd. What do you do?", "options": ["Click the link and enter your password", "Ignore it and log in to the site the normal way to check the notice", "Reply asking if it's real", "Forward it to your teacher"], "correct": 1}
            },
            {
                "section_title": "Mobile Security Basics",
                "concept_explanation": "Phones and tablets can also get infected. Keep them updated, only install apps from official stores, and avoid public Wi‑Fi for sensitive tasks.",
                "real_world_example": "A student installs a 'free' game APK from a website and the app steals their login data.",
                "how_attack_works": "Malicious apps or network snooping on public Wi‑Fi can pick up passwords or personal info.",
                "warning_signs": "Apps asking for too many permissions, slow performance after installing a new app, warnings about unknown certificates.",
                "how_to_prevent": "Use the official app store, check app permissions, install updates, and use mobile data or a VPN instead of unknown Wi‑Fi.",
                "quiz_mcqs": [
                    {"q": "Where should you install apps from?", "options": ["Any website", "Official app store (Google Play/App Store)", "A friend’s link", "Email attachment"], "correct": 1},
                    {"q": "Why should you avoid using public Wi‑Fi for logging into your email?", "options": ["It’s slow", "It may let others see what you type", "It's expensive", "It drains battery"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You're at a café with free Wi‑Fi and want to check your bank account on your phone. What do you do?", "options": ["Use the café Wi‑Fi and log in", "Use mobile data or a VPN, not the open Wi‑Fi", "Ask the barista for their password", "Don't check at all"], "correct": 1}
            },
            {
                "section_title": "Cyberbullying & Online Etiquette",
                "concept_explanation": "Being kind and respectful online keeps you and others safe. Cyberbullying is when someone uses the internet to hurt or embarrass someone else.",
                "real_world_example": "A classmate posts mean comments on another’s game video causing them to feel upset.",
                "how_attack_works": "Bullies may spread rumors, post private messages, or pressure others; they rely on anonymity and audience.",
                "warning_signs": "Repeated mean messages, being excluded from groups, pressure to share secrets or photos.",
                "how_to_prevent": "Don't join in bullying, block or report bullies, think before you post, and talk to a trusted adult if you or a friend is targeted.",
                "quiz_mcqs": [
                    {"q": "If someone keeps sending you nasty messages, you should:", "options": ["Respond with mean messages", "Block them and tell a trusted adult", "Share your password", "Quit the internet"], "correct": 1},
                    {"q": "How should you treat others online?", "options": ["Say whatever you want since it’s not real", "Treat them as you would in person and respect their feelings", "Only be nice to people you know", "Only post funny stuff"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You see a group chat where someone is making fun of another student. What do you do?", "options": ["Join in to fit in", "Tell them to stop and, if it continues, leave the chat and tell an adult", "Ignore it and scroll away", "Share the chat with others"], "correct": 1}
            },
            {
                "section_title": "Phishing: When Messages Try to Trick You",
                "concept_explanation": "Phishing is when someone sends you a message (email, DM, or text) that looks real but is meant to steal your password, money, or personal info. They pretend to be your school, a game company, or a friend to get you to click a link or type your password somewhere fake.",
                "real_world_example": "A student gets a DM that says 'Your Roblox account will be banned in 24 hours. Click here to verify.' The link goes to a fake login page. When they enter their password, the scammer takes over their account.",
                "how_attack_works": "The attacker sends a message that looks official or urgent. You click a link that opens a fake site that looks like the real one. You type your password or other details. The attacker saves them and uses them to get into your real account.",
                "warning_signs": "Urgent language ('Act now or your account will be locked'), messages from addresses or accounts that look slightly wrong, links that don't match the real website when you hover, asking for your password or payment in a message.",
                "how_to_prevent": "Never click 'verify' or 'confirm' links in messages. Go to the real app or website by typing the address or using your bookmark, then log in there. Don't type your password on a page you reached from a link in a message. When in doubt, ask a parent or teacher.",
                "quiz_mcqs": [
                    {"q": "A DM says 'Click here to get free V-Bucks.' What should you do?", "options": ["Click the link", "Ignore it and don't click", "Forward it to friends", "Reply and ask for more"], "correct": 1},
                    {"q": "What is a sign that a message might be phishing?", "options": ["It's from someone you know", "It asks you to click a link to fix something urgently", "It has no links", "It's long and detailed"], "correct": 1},
                    {"q": "Where should you type your password when you're not sure?", "options": ["On any page that looks like the real site", "Only on the real site you opened yourself (e.g. by typing the URL)", "In a reply to an email", "In a DM"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You get an email that says your school email will be deleted unless you 'confirm' by clicking a link in the email. What do you do?", "options": ["Click the link and enter your password", "Ignore the email and log in to your school account the way you usually do to check", "Forward the email to everyone so they know", "Reply to the email asking if it's real"], "correct": 1}
            },
            {
                "section_title": "Malware: When Downloads or Links Hurt Your Device",
                "concept_explanation": "Malware is software that can harm your phone or computer—like stealing your photos, locking your files, or watching what you type. It often gets on your device when you download something from an untrusted place or click a bad link.",
                "real_world_example": "A student downloads a 'free hack' for a game from a random website. The file installs malware that locks their files and shows a message demanding money to unlock them (ransomware).",
                "how_attack_works": "You download a file (game cheat, free app, attachment) or click a link. The file or link installs or runs harmful code. The malware might steal data, show ads, or lock your device until you pay.",
                "warning_signs": "Downloads from sites you don't trust, 'free' game hacks or cheats from random links, pop-ups saying 'Your device is infected—click here to fix,' email attachments from people you don't know.",
                "how_to_prevent": "Only download apps from the official app store or the real company website. Don't use game hacks or cheats from random sites. Don't open email attachments from strangers. If a pop-up says your device is infected, close the tab and don't click—real security messages don't look like that.",
                "quiz_mcqs": [
                    {"q": "Where is it safest to download an app?", "options": ["From a link in a YouTube comment", "From the official App Store or Google Play", "From a random website", "From a DM"], "correct": 1},
                    {"q": "A pop-up says 'Your computer has a virus! Click here to fix.' What should you do?", "options": ["Click it to fix the virus", "Close the tab and don't click", "Restart the computer", "Tell your friends"], "correct": 1},
                    {"q": "What can happen if you download a 'free game hack' from an unknown site?", "options": ["Your game gets better", "Your device can get malware (e.g. virus or ransomware)", "Nothing", "You get free in-game items"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A friend sends you a link on Discord saying 'This gives you free skins.' You've never used this site before. What do you do?", "options": ["Click the link", "Don't click; tell your friend it might be unsafe and play without the link", "Forward the link to others", "Reply asking for more links"], "correct": 1}
            },
            {
                "section_title": "Social Engineering: When People Trick You on Purpose",
                "concept_explanation": "Social engineering is when someone uses lies or pressure to get you to do something that helps them—like giving your password, sending money, or sharing private photos. They might pretend to be a friend, a company, or someone in trouble.",
                "real_world_example": "Someone you 'met' in a game says they're your age and asks you to move to a private app to chat. After a while they ask for a photo 'just for them.' Later they threaten to share it unless you send money or more photos.",
                "how_attack_works": "The person builds trust or creates urgency. They ask for something small first, then something bigger (password, money, photos). They may threaten to embarrass you or tell your parents if you don't comply.",
                "warning_signs": "Someone you only know online asking to move to a private app, asking for photos or personal details, saying something bad will happen if you don't do what they say, pretending to be in an emergency and needing money or info fast.",
                "how_to_prevent": "Don't send photos or personal details to people you only know online. Don't send money or gift cards to someone you've never met in person. If someone pressures or threatens you, stop talking and tell a trusted adult. Real friends don't pressure you.",
                "quiz_mcqs": [
                    {"q": "Someone you met in a game asks you to send a photo of yourself. You've never met them in person. What should you do?", "options": ["Send the photo", "Don't send it; say no and tell a trusted adult if they keep asking", "Send a photo of someone else", "Ask them to send their photo first"], "correct": 1},
                    {"q": "What is social engineering?", "options": ["A type of video game", "When someone uses lies or pressure to trick you into doing something", "A kind of password", "A type of phone"], "correct": 1},
                    {"q": "A person online says they'll share your chat with your parents unless you send money. What should you do?", "options": ["Send the money", "Stop talking to them and tell a trusted adult", "Delete the app", "Send more messages to convince them not to"], "correct": 1}
                ],
                "scenario_question": {"scenario": "Someone in a game says they work for the game company and need your password to 'give you a reward.' What do you do?", "options": ["Give them your password", "Don't give your password; real companies never ask for it in-game", "Give them a fake password", "Ask them to prove they work there first"], "correct": 1}
            },
            {
                "section_title": "Password and Authentication Safety",
                "concept_explanation": "Your password is the key to your accounts. If someone gets it, they can pretend to be you. Using the same password everywhere or a weak password makes it easy for attackers. Two-factor authentication (2FA) adds an extra step so even if they have your password, they still can't get in.",
                "real_world_example": "A student uses the same password for a game site and their email. The game site gets hacked and passwords are stolen. Attackers use that password to get into their email and then reset passwords for other accounts.",
                "how_attack_works": "Attackers get passwords by phishing, data breaches, or guessing weak passwords. They try the same password on other sites (email, social, school). If 2FA is off, they only need the password to take over the account.",
                "warning_signs": "Using the same password on many sites, short or simple passwords (name + numbers), no 2FA on important accounts (email, school), sharing your password with friends or typing it on a shared computer and not logging out.",
                "how_to_prevent": "Use a different password for each important account. Make passwords long and mix letters, numbers, and symbols. Turn on 2FA for email and any account that offers it. Never share your password with anyone, including friends. Log out on shared devices.",
                "quiz_mcqs": [
                    {"q": "Why is it bad to use the same password on many sites?", "options": ["It's hard to remember", "If one site is hacked, attackers can use that password on your other accounts", "Sites don't allow it", "It makes the password stronger"], "correct": 1},
                    {"q": "What does two-factor authentication (2FA) do?", "options": ["Makes your password longer", "Adds a second step (e.g. code on your phone) so only you can log in", "Deletes your account", "Shares your password with your parents"], "correct": 1},
                    {"q": "Should you share your password with your best friend?", "options": ["Yes, best friends share everything", "No, you should never share your password with anyone", "Only for game accounts", "Only if they share theirs first"], "correct": 1}
                ],
                "scenario_question": {"scenario": "Your friend says they forgot their password and asks to log in on your account 'just for one game.' What do you do?", "options": ["Let them use your password", "Say no; they can reset their own password or make a new account", "Give them a different password you don't use", "Log in for them and stay next to them"], "correct": 1}
            },
            {
                "section_title": "Privacy and Data Protection",
                "concept_explanation": "What you post and share online can be seen, saved, and spread. Think of your digital footprint as the trail of posts and info you leave – treat it like a diary you wouldn't want strangers to read. Privacy settings control who sees your posts and profile. Once something is online, it's hard to take back. Some apps and sites collect a lot of data about you—know what you're sharing and protect it like you protect your personal documents.",
                "real_world_example": "A student posts their school name and a photo of their team jersey. Someone they don't know uses that to find their school and send them messages pretending to go there. Later they realize their profile was public and had too much info.",
                "how_attack_works": "Information you share (location, school, photos, habits) can be used to target you with scams, bullying, or grooming. Apps and sites may collect data and use it for ads or sell it. Public or loose privacy settings mean more people can see and misuse your info.",
                "warning_signs": "Profile is public so anyone can see posts, location is on for all posts, sharing full name and school in bio, accepting follow requests from people you don't know, apps asking for more permissions than they need (e.g. contacts, camera for a simple game).",
                "how_to_prevent": "Set your profile to private so only people you approve can see your posts. Turn off location for posts if you don't need it. Don't put your full name, school, or address in your bio. Only accept or add people you know in real life. Check app permissions and say no when something doesn't need access.",
                "quiz_mcqs": [
                    {"q": "Why should you use private or 'friends only' settings on social media?", "options": ["So teachers can't see", "So only people you trust can see your posts and info", "So you get more followers", "So the app runs faster"], "correct": 1},
                    {"q": "Can you always delete something after you post it?", "options": ["Yes, once you delete it it's gone forever", "Not really; others may have saved or shared it", "Only if you report it", "Only on some apps"], "correct": 1},
                    {"q": "An app asks for access to your contacts and camera, but it's just a simple game. What should you do?", "options": ["Allow everything so the game works", "Only allow what the game needs; say no to contacts/camera if it doesn't need them", "Uninstall the app", "Allow and tell everyone"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You're about to post a photo that shows your school name and your face. Your profile is public. What should you do?", "options": ["Post it as is", "Don't post it, or make your profile private and remove the school name from the photo or caption", "Post it but delete it later", "Ask a stranger if it's okay"], "correct": 1}
            }
        ],
        "final_assessment": [
            {"scenario": "You get a text: 'Your package couldn't be delivered. Click here to reschedule.' You weren't expecting a package. What do you do?", "options": ["Click the link", "Ignore the text; don't click. If you ordered something, check the real delivery site or app yourself", "Reply to the number", "Forward the text to family"], "correct": 1},
            {"scenario": "A new friend from an online game wants to chat on a private app and later asks for a photo of you. What do you do?", "options": ["Send the photo", "Don't send it; say no and consider telling a trusted adult", "Send an old photo", "Block them immediately without saying anything"], "correct": 1},
            {"scenario": "A pop-up on a free game site says 'Your device has a virus. Call this number to fix it.' What do you do?", "options": ["Call the number", "Close the tab and don't call; real security software doesn't ask you to call a number from a pop-up", "Restart the device", "Take a screenshot and post it"], "correct": 1},
            {"scenario": "You want to log in to your school email on a shared library computer. What should you do when you're done?", "options": ["Just close the browser", "Log out of your account and close the browser", "Leave the tab open", "Change your password"], "correct": 1},
            {"scenario": "Someone you don't know follows you and likes a lot of your posts. They DM you asking where you go to school. What do you do?", "options": ["Tell them your school", "Don't share; you can ignore or block them. Don't give personal details to people you don't know", "Ask them their school first", "Report them immediately"], "correct": 1}
        ],
        "risk_score_logic": "Your Personal Risk Awareness Score is based on how many scenario and quiz answers you got right. More correct answers = higher awareness and lower risk. The score does not track you over time; it only reflects this module. Use it to see which topics to review.",
        "key_takeaways": [
            "Pause before you click. If a message is urgent or too good to be true, check the real site or app yourself.",
            "Never give your password to anyone, including people who say they work for a company or game.",
            "Only download apps from official stores and don't use 'free hacks' or unknown links.",
            "Don't send photos or personal details to people you only know online. Say no to pressure.",
            "Use strong, different passwords and turn on 2FA where you can. Log out on shared devices.",
            "Keep your profile private and limit what you share (school, location, full name). When in doubt, talk to a trusted adult."
        ]
    }
}

# ---------------------------------------------------------------------------
# DIGITAL CITIZEN AWARENESS MODULE
# ---------------------------------------------------------------------------
DIGITAL_CITIZEN_AWARENESS = {
    "title": "Enterprise Mode: Employee Cybersecurity Training",
    "target_audience": "This module is for employees in any organisation who handle company data, communicate by email, use cloud tools, or work remotely. It uses workplace scenarios and practical rules that reduce risk for both the individual and the business.",
    "learning_objective": "Build a security-aware work culture: verify before acting, protect company and customer data, follow policies, and report incidents promptly.",
    "content": {
        "sections": [
            {
                "section_title": "Information Security Fundamentals",
                "concept_explanation": "Information security means protecting data from unauthorized access, use, disclosure, disruption, modification, or destruction. It is not just about computers—it includes paper records and conversations. The three pillars are Confidentiality (only the right people see data), Integrity (data is accurate and unaltered), and Availability (data is accessible when needed).",
                "real_world_example": "A company stores customer records only on encrypted servers, restricts access to staff who need it, and keeps backups so records are always available. An employee who prints a report and leaves it on a public printer violates confidentiality.",
                "how_attack_works": "If access controls are weak, someone without authorisation may view, steal, or alter sensitive information—whether a customer database, financial records, or internal strategy documents.",
                "warning_signs": "Sensitive documents left on desks or printers, shared drives with no password, people sharing login credentials, systems accessed outside working hours for no clear reason.",
                "how_to_prevent": "Follow company guidelines for data handling, lock your screen when away from your desk, use only approved storage and sharing methods, and report any policy gaps you notice to IT or your manager.",
                "quiz_mcqs": [
                    {"q": "What is the primary goal of information security?", "options": ["Make files look tidy", "Protect data from unauthorised access, change, or loss", "Speed up the network", "Delete old emails"], "correct": 1},
                    {"q": "Which practice best protects information security?", "options": ["Sharing passwords with colleagues", "Locking your computer when you leave your desk", "Posting confidential info in a public chat", "Using the same password everywhere"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You print a report containing customer data and leave it on the shared printer overnight. What should you have done?", "options": ["Left it; someone else might need it", "Collected it immediately and stored or shredded it securely", "Thrown it in the bin", "Emailed a copy to yourself"], "correct": 1}
            },
            {
                "section_title": "Organizational Security Policies",
                "concept_explanation": "Security policies are rules the organisation sets about passwords, device use, remote access, data handling, and more. They exist to standardise safe behaviour and reduce risk. Ignoring them—even accidentally—can create gaps attackers exploit.",
                "real_world_example": "Your employer requires you to change your password every 90 days and forbids installing unapproved software. An employee who installs a free utility from an unknown site violates policy and may introduce malware.",
                "how_attack_works": "Bypassing policies—using personal devices for work, ignoring update prompts, sharing accounts—creates unmonitored entry points that attackers can use to access systems or data.",
                "warning_signs": "Colleagues bypassing rules, using personal devices or apps for work, ignoring software update prompts, sharing login credentials.",
                "how_to_prevent": "Read and follow the security policy, ask IT or your manager if something is unclear, and report policy violations you observe through the proper channel.",
                "quiz_mcqs": [
                    {"q": "What should you do if a security policy is unclear?", "options": ["Ignore it", "Ask your manager or IT for clarification", "Guess and hope for the best", "Search the internet"], "correct": 1},
                    {"q": "Why do organisations have security policies?", "options": ["To make work harder", "To standardise safe behaviour and reduce risk", "To fill compliance checklists", "To confuse employees"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A colleague asks to use your login because they forgot theirs. Policy states accounts must not be shared. What do you do?", "options": ["Share your login to be helpful", "Tell them to use the self-service password reset or contact IT", "Let them borrow your laptop while logged in", "Ignore them"], "correct": 1}
            },
            {
                "section_title": "Phishing & Spear Phishing",
                "concept_explanation": "Phishing is a mass-sent fake message (email, text, or call) designed to steal credentials, money, or data. Spear phishing is a targeted version—attackers research a specific person or team (using LinkedIn, company websites, or leaked data) and craft a convincing, personalised message. In a work context both are used to steal login details, trick staff into transferring money, or deploy malware.",
                "real_world_example": "A finance employee receives an email that appears to come from their CFO, uses their real name, references an ongoing project, and asks them to click a link to 'review an updated invoice.' The link goes to a fake login page. After entering credentials, the attacker accesses the company's finance system.",
                "how_attack_works": "Attacker gathers information about the target (name, role, colleagues, current projects). They craft a convincing email with correct branding and context. The employee clicks a link or opens an attachment. Credentials are captured or malware is installed. The attacker then uses that access for fraud or further attacks.",
                "warning_signs": "Unexpected urgency or pressure to act immediately; sender address that doesn't match the real domain exactly; links that display a different URL when hovered; requests to 'verify', 'reset' or 'confirm' credentials via a link; messages referencing real colleagues or projects to seem legitimate.",
                "how_to_prevent": "Never click credential or payment links in email—go directly to the system yourself. Hover over links to see the real destination before clicking. Report suspicious emails to IT using the phishing report button or process. Attend simulated phishing training so you recognise the patterns before a real attack arrives.",
                "quiz_mcqs": [
                    {"q": "What distinguishes spear phishing from regular phishing?", "options": ["It uses harder words", "It is targeted and personalised using research about the recipient", "It only targets IT staff", "It uses phone calls instead of email"], "correct": 1},
                    {"q": "You receive an email that looks like your company's IT helpdesk asking you to verify your password via a link. You should:", "options": ["Click the link and verify", "Log in to the real system yourself to check for any notices", "Reply with your password", "Forward to a colleague"], "correct": 1},
                    {"q": "What is a key warning sign of a phishing email?", "options": ["It has no images", "It creates urgency and asks you to click a link or open an attachment", "It is long", "It has a friendly tone"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You receive an email appearing to be from HR with your name and employee number, asking you to update your payroll bank details by clicking a link. What do you do?", "options": ["Click the link and update your details", "Do not click; contact HR directly through their known contact details to verify", "Reply to the email asking if it is real", "Forward to your manager"], "correct": 1}
            },
            {
                "section_title": "Business Email Compromise (BEC)",
                "concept_explanation": "Business Email Compromise (BEC) is a targeted scam where attackers impersonate an executive, manager, or trusted supplier—via a spoofed or compromised email account—to trick employees into transferring money, changing payment details, or sharing sensitive data. BEC attacks are carefully researched and do not need malicious links or attachments to succeed.",
                "real_world_example": "A supplier's email account is compromised. The attacker sends a message to your accounts payable team from the real supplier address, with a legitimate invoice, but replaces the bank account number with their own. The team processes the payment—only noticing weeks later when the real supplier chases payment.",
                "how_attack_works": "Attackers research the organisation's structure, key vendors, and ongoing deals (via social media, leaked documents, or a compromised email). They send a convincing request—often a payment change, urgent wire transfer, or payroll redirect—that mimics normal communication. They may add pressure ('CEO is travelling,' 'deal closes today') to prevent verification.",
                "warning_signs": "Requests to change bank or payment details arriving only by email; urgency or secrecy ('do not discuss with others'); a reply-to address that differs from the sender; last-minute changes to wire instructions before a deal closes; requests that bypass normal approval processes.",
                "how_to_prevent": "Always verify payment or bank-detail change requests through a separate, trusted channel—call the person on a known number before processing. Follow the organisation's dual-authorisation process for transfers above a set threshold. Never rely solely on email confirmation for financial actions.",
                "quiz_mcqs": [
                    {"q": "What makes BEC attacks particularly dangerous?", "options": ["They use complex malware", "They rely on trust and impersonation—no malicious link or attachment is needed", "They only target large companies", "They are always sent from unknown senders"], "correct": 1},
                    {"q": "You receive an email from what appears to be your CEO asking for an urgent wire transfer before the end of day. What should you do?", "options": ["Process it immediately", "Verify through a separate trusted channel such as a known phone number before taking action", "Reply to the email asking for confirmation", "Forward to a colleague to handle"], "correct": 1},
                    {"q": "A supplier emails to say their bank details have changed. Your next step should be:", "options": ["Update the details and process the next payment", "Call the supplier on a number you already have to verify before changing anything", "Reply to the email to confirm", "File the email and update later"], "correct": 1}
                ],
                "scenario_question": {"scenario": "An email from 'the CEO' says to buy 10 gift cards for a client surprise and send the codes urgently. The sender domain looks slightly different. What do you do?", "options": ["Buy the cards and send codes", "Do not act; verify directly with the CEO via an internal channel and treat this as a likely BEC attempt", "Forward to finance to handle", "Reply asking for clarification"], "correct": 1}
            },
            {
                "section_title": "Malware and Ransomware: Protecting Your Devices and Data",
                "concept_explanation": "Malware is harmful software that can steal your data, spy on you, or lock your files. Ransomware is a type that encrypts your files and demands payment to unlock them. It often gets in through bad links, attachments, or fake software updates.",
                "real_world_example": "A family clicks a pop-up that says 'Your computer is infected—click to scan.' The 'scan' installs ransomware. Photos and documents get encrypted and a message demands payment in cryptocurrency to get them back. Paying doesn't guarantee you get your files back.",
                "how_attack_works": "You click a link, open an attachment, or install something from an untrusted source. Malware runs and may steal passwords, log keystrokes, or encrypt files. Ransomware then shows a message demanding payment. Attackers may also threaten to publish your data.",
                "warning_signs": "Pop-ups saying your device is infected and to call a number or click to fix, email attachments from unknown senders, downloads from sites that aren't the official vendor, software that asks for permission to access everything on your device.",
                "how_to_prevent": "Don't click pop-ups that say your device is infected. Use a reputable antivirus and keep it and your OS updated. Only download software from official or trusted sources. Back up important files to an external drive or cloud so you can restore if something happens. Don't pay ransom without talking to an expert; it funds crime and doesn't guarantee recovery.",
                "quiz_mcqs": [
                    {"q": "A pop-up says 'Virus detected! Call this number now.' What should you do?", "options": ["Call the number", "Close the window; don't call. Real security software doesn't ask you to call a number in a pop-up", "Restart the computer", "Click 'Remove virus'"], "correct": 1},
                    {"q": "What is ransomware?", "options": ["A type of antivirus", "Malware that locks your files and demands payment to unlock them", "A backup tool", "A kind of password"], "correct": 1},
                    {"q": "Why is backing up your files important?", "options": ["It makes the computer faster", "If malware or ransomware hits, you can restore your files from the backup", "It's required by law", "It stops viruses"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You get an email with an attachment labeled 'Invoice.' You weren't expecting an invoice from this sender. What do you do?", "options": ["Open the attachment", "Don't open it; delete the email. If you need an invoice, contact the sender through a known channel", "Forward it to your accountant", "Reply and ask if they sent it"], "correct": 1}
            },
            {
                "section_title": "Social Engineering: When Strangers Use Trust to Steal",
                "concept_explanation": "Social engineering is when someone uses psychology and lies to get you to do something that helps them—give money, share account details, or install software. They might pretend to be tech support, a relative in trouble, or a prize promoter.",
                "real_world_example": "A caller says they're from 'Microsoft Support' and that your computer is sending errors. They ask you to go to a website and give them remote access 'to fix it.' Once in, they install malware or steal your files and may demand payment.",
                "how_attack_works": "The attacker contacts you (phone, email, message) and creates trust or fear. They guide you step-by-step to hand over access, money, or data. They may use real-looking names, numbers, or websites. By the time you're unsure, you've already given something away.",
                "warning_signs": "Unexpected contact from 'support' or 'your bank,' pressure to act immediately, requests for remote access to your computer, gift card or wire transfer requests, someone claiming to be a relative in trouble and needing money fast.",
                "how_to_prevent": "Don't give remote access to your computer to someone who called or messaged you. Hang up and call the company yourself using the number on their official website. Don't send money or gift cards to someone you've only spoken to online or on the phone. Verify family emergencies by calling the person on a number you already have.",
                "quiz_mcqs": [
                    {"q": "Someone calls saying they're from tech support and need to 'fix' your computer remotely. What should you do?", "options": ["Let them connect", "Hang up. If you have a problem, contact your provider or manufacturer yourself using a number from their real website", "Give them your password", "Restart the computer while they're on the line"], "correct": 1},
                    {"q": "A message says your cousin is stuck abroad and needs money wired immediately. What should you do?", "options": ["Wire the money right away", "Contact your cousin on a number or account you already have to verify before sending anything", "Reply to the message", "Ignore it"], "correct": 1},
                    {"q": "What do scammers often use to pressure you?", "options": ["Long emails", "Urgency, fear, or too-good-to-be-true offers", "Correct grammar", "Official-looking logos only"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You get a call from a number that looks like your bank's. The caller says there's fraud on your account and asks you to confirm your full card number and PIN. What do you do?", "options": ["Give the details", "Don't give them. Hang up and call the number on the back of your card to report and verify", "Give the last 4 digits only", "Ask them to send an email instead"], "correct": 1}
            },
            {
                "section_title": "Password and Authentication Safety",
                "concept_explanation": "Your password and second factor (2FA) protect your email, banking, and other accounts. Weak or reused passwords make it easy for attackers after a breach or phishing. Strong, unique passwords and 2FA keep your identity and money safer.",
                "real_world_example": "A person reuses the same password on a shopping site and their email. The shopping site is breached and passwords leak. Attackers use the password to get into their email, then reset passwords for banks and other accounts and steal money.",
                "how_attack_works": "Attackers get passwords from data breaches, phishing, or guessing. They try the same password on other sites. Without 2FA, one stolen password can be enough to take over an account and then others linked to the same email.",
                "warning_signs": "Using one password everywhere, short or simple passwords (e.g. name + year), no 2FA on email or banking, writing passwords in notes or sharing them with family in insecure ways.",
                "how_to_prevent": "Use a password manager to create and store strong, unique passwords. Turn on 2FA (app or security key preferred over SMS) for email, banking, and important accounts. Don't reuse passwords. If a site is breached, change that password and any similar ones elsewhere.",
                "quiz_mcqs": [
                    {"q": "Why shouldn't you reuse the same password on multiple sites?", "options": ["It's hard to remember", "If one site is hacked, that password can be used to access your other accounts", "Sites don't allow it", "It makes 2FA unnecessary"], "correct": 1},
                    {"q": "What is two-factor authentication (2FA)?", "options": ["A second password", "A second step when logging in (e.g. code on your phone) so only you can access the account", "A type of email", "A backup password"], "correct": 1},
                    {"q": "Where should you store your passwords?", "options": ["In a text file on your desktop", "In a reputable password manager or your browser's built-in manager (with a strong master password)", "In an email to yourself", "On a sticky note"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You hear that a website you use was hacked and passwords were stolen. You use the same password there and for your email. What do you do?", "options": ["Do nothing", "Change the password on the breached site and on your email (and any other account that had the same password)", "Only change the breached site", "Delete your email account"], "correct": 1}
            },
            {
                "section_title": "Privacy and Data Protection for You and Your Family",
                "concept_explanation": "Your personal data—where you live, what you buy, who you talk to—has value to companies and criminals. Privacy settings and careful sharing reduce who can see and misuse your data. For families, this also means helping kids understand what not to share and who not to trust online.",
                "real_world_example": "A parent posts a photo of their child's first day at school, including the school name and a visible street. Someone uses that to target the family with a scam or to learn the child's routine. Once shared, the photo can be copied and spread.",
                "how_attack_works": "Data you share (location, habits, family details) can be combined and used for targeted scams, identity theft, or physical risk. Apps and sites collect data for ads or resale. Weak privacy settings or oversharing increase exposure.",
                "warning_signs": "Posting full names, locations, and routines; having all accounts public; apps with access to contacts, camera, or location when they don't need it; kids sharing school name, address, or photos with strangers online.",
                "how_to_prevent": "Tighten privacy settings on social accounts (who can see posts, who can contact you). Limit what you post about your family and where you are. Review app permissions and turn off what isn't needed. Talk to kids about not sharing personal details or photos with people they don't know in person. Use strong passwords and 2FA on family accounts.",
                "quiz_mcqs": [
                    {"q": "Why should you limit what you post about your kids (e.g. school name, location)?", "options": ["So they don't see it", "To reduce the chance that strangers or criminals can use that info to target your family", "To get more likes", "Because it's illegal"], "correct": 1},
                    {"q": "What should you do when an app asks for access to your contacts or location?", "options": ["Always allow", "Only allow if the app clearly needs it for a feature you use", "Never allow", "Allow and then revoke later"], "correct": 1},
                    {"q": "Who can see your posts if your account is set to 'Public'?", "options": ["Only friends", "Anyone on the internet", "Only you", "Only people you tag"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You're about to post a family photo that shows your home address in the background. What should you do?", "options": ["Post it as is", "Don't post it, or crop/edit so the address isn't visible, and check your privacy settings", "Post it but make the account private later", "Post it only to close friends"], "correct": 1}
            },

            {
                "section_title": "Secure Remote Work Practices",
                "concept_explanation": "When working from home or elsewhere, use VPNs, keep devices updated, and avoid public Wi‑Fi without protection. Your home network should be as secure as the office.",
                "real_world_example": "An employee uses a company VPN to access files from home, and locks their laptop when not in use.",
                "how_attack_works": "Attackers on the same public network can intercept unencrypted data or infect your device with malware.",
                "warning_signs": "Using public Wi‑Fi without VPN, leaving your laptop unlocked in public, or mixing personal with work data on the same device.",
                "how_to_prevent": "Always connect via the corporate VPN, install updates promptly, use strong passwords and lock your screen, and separate work and personal use.",
                "quiz_mcqs": [
                    {"q": "What is a safe way to access company resources from a café?", "options": ["Connect using the company VPN", "Use the café's Wi‑Fi directly", "Share your password with a friend", "Use someone else's device"], "correct": 0},
                    {"q": "Why should you lock your laptop when you're away?", "options": ["It looks professional", "To prevent someone else from using it and possibly exposing company data", "To save power", "To keep dust out"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You're working from a library and the Wi‑Fi asks you to enter your email to access it. What should you do?", "options": ["Use your work email and password to get on", "Avoid using that network for work and use VPN or mobile data instead", "Ignore it and leave the network", "Pay for the Wi‑Fi"], "correct": 1}
            },
            {
                "section_title": "Endpoint Security",
                "concept_explanation": "Endpoints are devices like laptops and phones that connect to the company network. They need antivirus, updates, and controls to stop malware and unauthorized access.",
                "real_world_example": "The company installs antivirus and enforces updates on all employee laptops; one laptop catches malware and IT quarantines it before it spreads.",
                "how_attack_works": "An unprotected device can be infected and then used as a foothold to reach other systems on the network.",
                "warning_signs": "Slow performance, unexpected pop-ups, or security software disabled.",
                "how_to_prevent": "Keep your device's operating system and apps updated, don't disable security tools, and report anything unusual to IT.",
                "quiz_mcqs": [
                    {"q": "What should you do if your company laptop starts showing strange pop-ups?", "options": ["Ignore them", "Report to IT immediately", "Turn off and on repeatedly", "Install a random app to fix it"], "correct": 1},
                    {"q": "Why is endpoint security important?", "options": ["It makes laptops look nicer", "To prevent infected devices from bringing malware into the company network", "It speeds up the internet", "It allows remote control by anyone"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You borrow a friend's USB drive and plug it into your work laptop. Later you notice odd files. What should you do?", "options": ["Keep using it", "Disconnect the drive, don't open any files, and inform IT about the possible infection", "Format the drive yourself", "Turn off the laptop"], "correct": 1}
            },
            {
                "section_title": "Data Classification & Handling",
                "concept_explanation": "Data is often labeled (e.g., public, internal, confidential) and must be handled accordingly. Confidential data needs extra protection like encryption and limited access.",
                "real_world_example": "A spreadsheet marked confidential is stored in an encrypted folder and only shared with people who need it.",
                "how_attack_works": "If confidential data is accidentally emailed to the wrong person or left on a public drive, it can be leaked and cause harm.",
                "warning_signs": "Seeing sensitive info in email without warning labels or in shared drives open to everyone.",
                "how_to_prevent": "Check classification labels, follow handling rules (e.g., encrypt, use approved sharing), and double-check recipients before sending.",
                "quiz_mcqs": [
                    {"q": "What should you do before emailing a file marked 'Confidential'?", "options": ["Just send it", "Ensure the recipient is authorized and use encryption or approved secure tools", "Post it in a public chat", "Print it and walk it over"], "correct": 1},
                    {"q": "Why classify data?", "options": ["So everyone knows what it's about", "So the right protection measures are used depending on sensitivity", "For fun", "Because IT likes labels"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You need to share customer contact details with a contractor. The data is labeled 'Internal Only.' What do you do?", "options": ["Email it directly", "Check your company's policy and ask if you can share, using a secure method if allowed", "Put it on a public website", "Text it"], "correct": 1}
            },
            {
                "section_title": "Insider Threat Awareness",
                "concept_explanation": "Insiders are people with access to systems or data. Some may accidentally or intentionally misuse that access, so everyone should be alert to unusual behavior.",
                "real_world_example": "An employee copies sensitive files to a USB and leaves them in a public area, which are later found by a stranger.",
                "how_attack_works": "Insiders can steal, leak, or manipulate data; even well-meaning mistakes (sending to wrong email) can cause breaches.",
                "warning_signs": "Colleagues accessing data they don't need, using personal accounts for work, or acting secretive.",
                "how_to_prevent": "Follow least-privilege principles, report suspicious actions, and use monitoring tools the company provides.",
                "quiz_mcqs": [
                    {"q": "What is an insider threat?", "options": ["A hacker from outside", "A risk posed by someone with legitimate access who misuses it, whether accidentally or intentionally", "A new employee", "A software update"], "correct": 1},
                    {"q": "If you see a coworker downloading large amounts of data they don't need, you should:", "options": ["Ignore it", "Report it through the proper channel anonymously if needed", "Join them", "Ask for some of the data"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You overhear a colleague say they'll email customer info to take home 'to work on it.' The company policy forbids emailing such data. What do you do?", "options": ["Say nothing", "Remind them of policy and, if they don't stop, report it to your manager or security team", "Offer to help them", "Send the email yourself"], "correct": 1}
            },
            {
                "section_title": "Incident Reporting Procedures",
                "concept_explanation": "If you notice a security problem (phishing email, lost device, suspicious activity), you should report it immediately using the company's incident reporting process.",
                "real_world_example": "An employee clicks a phishing link and notices unusual network behavior; they notify IT using the incident form and the issue is contained quickly.",
                "how_attack_works": "Delayed reporting gives attackers time to move laterally or exfiltrate data, making recovery harder.",
                "warning_signs": "Unusual emails, unknown devices on the network, unexpected password prompts, or lost/stolen equipment.",
                "how_to_prevent": "Know the reporting process (phone number, form, email), act quickly, and don't be embarrassed—early reports help everyone.",
                "quiz_mcqs": [
                    {"q": "What should you do if you think you clicked a phishing link?", "options": ["Nothing", "Report it right away to IT using the proper channel", "Try to fix it yourself", "Wait until later"], "correct": 1},
                    {"q": "Why is timely incident reporting important?", "options": ["It makes you look good", "It allows the security team to contain the issue before it spreads", "It keeps IT busy", "It's not important"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You find a USB drive in the company parking lot. What do you do?", "options": ["Plug it into your computer to see what's on it", "Turn it in to IT or security without plugging it in", "Leave it there", "Throw it away"], "correct": 1}
            },
            {
                "section_title": "Secure Cloud Usage",
                "concept_explanation": "Cloud services (like Google Drive, Dropbox, AWS) are convenient but require secure configuration, strong passwords, and proper sharing settings.",
                "real_world_example": "A team accidentally leaves an S3 bucket public, exposing customer data. They then tighten permissions and enable logging.",
                "how_attack_works": "Misconfigured cloud storage or excessive sharing can leak data to the internet.",
                "warning_signs": "Shared links with 'anyone with the link' access, unprotected buckets, or unknown files appearing in your cloud account.",
                "how_to_prevent": "Use approved cloud services, follow sharing guidelines, use MFA, and verify permissions before sharing.",
                "quiz_mcqs": [
                    {"q": "What is a risky cloud sharing setting?", "options": ["Only people in the company can view", "Anyone with the link can edit", "A password-protected link", "No sharing"], "correct": 1},
                    {"q": "If you see files in a shared drive that shouldn't be there, you should:", "options": ["Delete them", "Notify the owner or IT to fix permissions", "Share them with everyone", "Ignore them"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You need to send a report to a contractor. The easiest way is to create a public link in your cloud storage. What should you do?", "options": ["Create the public link", "Share the file with their company account or ask IT for a secure transfer method", "Email it as an attachment", "Put it on social media"], "correct": 1}
            },
            {
                "section_title": "Compliance & Regulatory Basics",
                "concept_explanation": "Laws like GDPR and standards like ISO 27001 require organizations to protect personal and sensitive data. Employees play a role by following policies and reporting breaches.",
                "real_world_example": "A company subject to GDPR must notify customers within 72 hours if their personal data is exposed. Failing to do so can result in heavy fines.",
                "how_attack_works": "Data breaches can trigger legal obligations; not following rules can lead to penalties and loss of trust.",
                "warning_signs": "Handling customer data carelessly, or not knowing which rules apply to your work.",
                "how_to_prevent": "Be aware of applicable laws, follow company procedures for data handling and breach reporting, and attend any required compliance training.",
                "quiz_mcqs": [
                    {"q": "What does GDPR mainly protect?", "options": ["Company secrets", "Personal data of individuals in the EU", "Internet speeds", "Employee salaries"], "correct": 1},
                    {"q": "What might happen if a regulated company fails to report a data breach?", "options": ["Nothing", "They could face fines and legal action", "They get a bonus", "They get more customers"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You discover customer email addresses were accidentally posted to a public website. What should you do?", "options": ["Ignore it", "Report it immediately to the compliance/security team so they can notify affected individuals as required", "Delete the website yourself", "Tell your manager tomorrow"], "correct": 1}
            },
            {
                "section_title": "Physical Security Awareness",
                "concept_explanation": "Keeping the physical workplace secure is part of cybersecurity. Lock doors, badge in visitors, and don't leave sensitive papers or devices unattended.",
                "real_world_example": "A locked server room prevents a stranger from plugging in a rogue device. A visitor is escorted and badged while in the building.",
                "how_attack_works": "Physical access can let attackers plug in malware, steal laptops, or read confidential documents left on desks.",
                "warning_signs": "Doors propped open, unknown people in restricted areas, unattended unlocked laptops or printed documents.",
                "how_to_prevent": "Always lock doors, challenge or report strangers, keep devices and papers secure, and follow visitor procedures.",
                "quiz_mcqs": [
                    {"q": "What should you do if you see someone without a badge in a restricted area?", "options": ["Ignore them", "Ask if they need assistance or report to security", "Give them a badge", "Follow them"], "correct": 1},
                    {"q": "Why shouldn't you leave your laptop unlocked on your desk?", "options": ["It looks messy", "Someone could walk by and access it or steal it", "It uses too much power", "It's against the law"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You find the server room door open and no one around. What should you do?", "options": ["Go in and check", "Close and lock the door, then notify security or IT", "Leave it open", "Leave and forget about it"], "correct": 1}
            }
        ],
        "final_assessment": [
            {"scenario": "You receive a spear phishing email that uses your real name, mentions your manager, and asks you to click a link to reset your work password. What do you do?", "options": ["Click the link and reset", "Do not click; go directly to your company's IT portal yourself and report the email to IT security", "Reply asking if it is real", "Forward to your manager"], "correct": 1},
            {"scenario": "An email from 'the CFO' asks you to urgently wire funds to a new account for a confidential deal. No one else should know. What do you do?", "options": ["Process the wire immediately", "Do not act; verify through a separate trusted channel (e.g. call the CFO on their known number) and follow payment policy", "Reply to the email asking for more details", "Forward to your manager by email"], "correct": 1},
            {"scenario": "You find a USB drive in the car park outside your office. What do you do?", "options": ["Plug it into your laptop to see what's on it", "Hand it to IT or security without plugging it in; it may contain malware", "Leave it where you found it", "Throw it away"], "correct": 1},
            {"scenario": "You need to share a confidential report with a contractor. The quickest method is a public cloud link. What do you do?", "options": ["Create the public link and share it", "Use an approved secure method (company file share or secure email) and check with IT if unsure", "Email it as an unencrypted attachment", "Post it on the company intranet"], "correct": 1},
            {"scenario": "You accidentally click a link in a suspicious email and a page opens briefly before you close it. What do you do?", "options": ["Do nothing since you closed it quickly", "Report it immediately to IT security using the incident reporting process", "Wait to see if anything happens", "Tell a colleague"], "correct": 1}
        ],
        "risk_score_logic": "Your Employee Security Awareness Score reflects how many quiz and scenario questions you answered correctly. A higher score means stronger awareness and lower risk to the organisation. The score covers this module only and is not used for performance review. Use it to identify which topics to revisit.",
        "key_takeaways": [
            "Verify before acting: never process payments, reset credentials, or share data based on email alone—use a separate, trusted channel.",
            "Report incidents immediately. Early reporting lets the security team contain issues before they escalate; there is no shame in reporting a mistake.",
            "Follow data handling rules: use only approved storage and sharing methods; never send confidential data to personal accounts or public links.",
            "Physical security is cybersecurity: lock your screen, challenge unknown visitors, and never plug in unknown USB drives.",
            "Use strong, unique passwords and MFA on all work accounts. Never share credentials with colleagues—use proper access requests instead.",
            "Know your company's incident reporting process and use it the moment something feels wrong."
        ]
    }
}

# ---------------------------------------------------------------------------
# IT PROFESSIONAL AWARENESS MODULE
# ---------------------------------------------------------------------------
ITPRO_AWARENESS = {
    "title": "Cybersecurity Awareness for IT Professionals",
    "target_audience": "This module is for IT and security practitioners who need to recognize advanced threats, protect systems and data, and align with secure operations and compliance. It uses technical terminology and real-world attack lifecycles.",
    "learning_objective": "Develop a defense-in-depth and verification mindset: assume breach, verify before trusting, and apply secure-by-default and least-privilege practices in line with organizational and compliance requirements.",
    "content": {
        "sections": [
            {
                "section_title": "Advanced Phishing and Business Email Compromise (BEC)",
                "concept_explanation": "Beyond generic phishing, BEC and targeted campaigns use reconnaissance (OSINT, breached credentials) to impersonate executives, vendors, or partners. Goals include wire fraud, credential theft, and initial access for follow-on attacks (e.g. ransomware).",
                "real_world_example": "An attacker compromises a vendor's email or spoofs it, then sends a legitimate-looking request to change payment details. Finance processes the change and wires funds to the attacker. The same initial access may be used to drop malware or move laterally.",
                "how_attack_works": "Attacker researches targets (org chart, vendors, recent deals). They spoof or compromise email and send a convincing request (payment change, urgent transfer, credential 'verification'). They may use lookalike domains, compromised accounts, or thread hijacking. Once trusted, they escalate to fraud or deploy malware.",
                "warning_signs": "Unusual payment or bank change requests, sender address or reply-to not matching known contacts, last-minute changes to wiring instructions, requests to bypass normal approval, urgency or 'confidential' pressure.",
                "how_to_prevent": "Verify payment and bank changes through a separate, trusted channel (known phone number, in person). Enforce MFA and conditional access; use anti-spoofing (SPF, DKIM, DMARC) and secure email gateway. Train staff on BEC and run simulated campaigns. Enforce separation of duties and out-of-band verification for high-value actions.",
                "quiz_mcqs": [
                    {"q": "A request to change vendor payment details arrives by email. What should you do?", "options": ["Process the change from the email", "Verify through a separate, trusted channel (e.g. known phone) before changing any payment details", "Forward to finance", "Reply to the email to confirm"], "correct": 1},
                    {"q": "What is Business Email Compromise (BEC) often aimed at?", "options": ["Slowing down email", "Wire fraud, credential theft, or initial access for further attacks", "Improving spam filters", "Encrypting email"], "correct": 1},
                    {"q": "Which helps reduce BEC success?", "options": ["Disabling MFA", "Enforcing MFA, anti-spoofing (DMARC), and out-of-band verification for payment changes", "Using one shared mailbox for finance", "Ignoring reply-to headers"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You receive an email from 'CEO' asking you to buy gift cards and send codes immediately for 'urgent employee recognition.' The sender address is similar but not the usual internal domain. What do you do?", "options": ["Buy and send the codes", "Verify through a known channel (e.g. internal chat or walk to office) before taking any action; treat as potential BEC", "Forward to IT", "Reply to the email asking for confirmation"], "correct": 1}
            },
            {
                "section_title": "Malware and Ransomware Lifecycle",
                "concept_explanation": "Ransomware operations follow a lifecycle: initial access (phishing, RDP, vulns), execution, persistence, lateral movement, credential harvesting, and then encryption and ransom. Understanding the chain helps you defend at multiple stages and recover.",
                "real_world_example": "A user opens a malicious attachment; the payload establishes persistence and disables backups. The actor moves laterally using harvested credentials, deploys the encryptor across the network, and then demands ransom. Backups were the only recovery path; paying did not guarantee decryption keys.",
                "how_attack_works": "Initial access (phish, RDP, exploit) → execution and persistence → discovery and credential dumping → lateral movement → data exfiltration (increasingly common) → encryption and ransom note. Backups may be deleted or encrypted. Double extortion: pay or data is published.",
                "warning_signs": "Unusual RDP or SMB traffic, mass file changes or shadow-copy deletion, new scheduled tasks or services, disabled backup or security tools, C2 traffic to unknown IPs/domains, ransom note or encrypted file extensions.",
                "how_to_prevent": "Patch promptly; restrict RDP (VPN + MFA, or lock down to jump hosts). Use EDR and network segmentation; enforce least privilege and credential hardening. Maintain offline or immutable backups and test restore. Have an incident response and communication plan. Don't assume paying restores access or prevents publication.",
                "quiz_mcqs": [
                    {"q": "Why are offline or immutable backups critical for ransomware?", "options": ["They're faster", "Attackers often delete or encrypt on-line backups; offline/immutable copies can allow recovery without paying", "They're cheaper", "Compliance requires them"], "correct": 1},
                    {"q": "What is 'double extortion' in ransomware?", "options": ["Two ransom amounts", "Encryption plus threat to publish stolen data if not paid", "Two different malware families", "Backup plus primary encrypted"], "correct": 1},
                    {"q": "Where in the attack chain can you still disrupt ransomware?", "options": ["Only at initial access", "At multiple stages: block initial access, detect execution/persistence, limit lateral movement, protect backups", "Only after encryption", "Only with payment"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You notice a spike in SMB traffic from a workstation to file servers and new scheduled tasks on that host. Backups on the same network are still running. What do you do?", "options": ["Wait and see", "Treat as potential ransomware activity: isolate the host, preserve evidence, check backups and restore capability, and follow incident response", "Restart the workstation", "Run a full scan only"], "correct": 1}
            },
            {
                "section_title": "Social Engineering and Physical Security",
                "concept_explanation": "Social engineering targets people to gain access, information, or physical entry. Pretexting, tailgating, and vishing are used to obtain credentials, PII, or facility access. Security awareness and verification procedures reduce success.",
                "real_world_example": "A caller claims to be from IT and needs a password reset for 'an executive.' The target provides a temporary password. The attacker uses it to access email and exfiltrate data or prepare BEC. Alternatively, an outsider tailgates into the building and plugs a device into an internal port.",
                "how_attack_works": "Attacker gathers information (OSINT, prior breaches) and contacts the target (phone, email, in person). They create a plausible pretext and request credentials, access, or a physical favor. They may use urgency or authority. Once they have access, they use it for further attacks.",
                "warning_signs": "Unexpected requests for passwords or MFA codes, callers who pressure you to bypass policy, visitors without badges or escort, requests to 'help' with a device or plug something in.",
                "how_to_prevent": "Never share passwords or MFA codes with anyone; IT does not need your password. Verify identity through a known process (call back on official number, ticket, in-person with badge). Enforce physical access (badges, escort, challenge). Report suspicious contact and tailgating.",
                "quiz_mcqs": [
                    {"q": "Someone claiming to be from IT asks for your password to 'fix your account.' What do you do?", "options": ["Give it to them", "Refuse; IT does not need your password. Verify through official channel (e.g. ticket, call back to known number)", "Give a temporary password", "Ask for their badge number"], "correct": 1},
                    {"q": "What is pretexting?", "options": ["A type of encryption", "Creating a false scenario or identity to get someone to divulge info or access", "A backup method", "A firewall rule"], "correct": 1},
                    {"q": "Why does tailgating matter for cybersecurity?", "options": ["It doesn't", "Physical access can allow device connection, theft, or installation of malware", "It only affects physical safety", "It's a compliance checkbox only"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A person at the door says they're from a vendor and forgot their badge; they ask you to hold the door. What do you do?", "options": ["Let them in", "Don't allow tailgating; direct them to reception or security to be verified and badged", "Let them in if they look professional", "Ask for a business card"], "correct": 1}
            },
            {
                "section_title": "Password and Authentication: Policy and Technical Controls",
                "concept_explanation": "Credentials are a primary target. Strong policy (length, complexity, no reuse) and technical controls (MFA, SSO, credential hardening, monitoring) reduce the risk of credential theft and misuse. Assume passwords can be phished or breached; make MFA and conditional access the norm.",
                "real_world_example": "An employee reuses an internal password on a personal site that is breached. Credentials are sold; attackers use them to access corporate SSO. MFA blocks some attempts, but legacy systems without MFA are compromised. Lateral movement and data theft follow.",
                "how_attack_works": "Passwords are obtained via phishing, breaches, or brute force. Without MFA or with weak MFA (e.g. SMS), one credential can grant access. Attackers use valid accounts to move laterally, escalate, and exfiltrate. Legacy and service accounts with no MFA are high value.",
                "warning_signs": "No MFA on critical systems, shared or default credentials, password reuse across systems, service accounts with excessive rights and no rotation, lack of conditional access or device compliance.",
                "how_to_prevent": "Enforce MFA (phish-resistant where possible) and conditional access. Use SSO and strong password policy; prohibit reuse and check against known breaches. Harden and monitor service accounts; apply least privilege. Monitor for impossible travel, new device, and anomalous logins.",
                "quiz_mcqs": [
                    {"q": "Why is MFA critical even with strong passwords?", "options": ["Passwords are obsolete", "Passwords can be phished or breached; MFA adds a second factor so stolen passwords alone are insufficient", "It's required by law", "It replaces passwords"], "correct": 1},
                    {"q": "What is 'phish-resistant' MFA?", "options": ["SMS-based codes", "Methods that resist real-time phishing (e.g. FIDO2/WebAuthn, hardware keys) rather than codes that can be relayed", "Longer passwords", "Biometrics only"], "correct": 1},
                    {"q": "Why should service accounts be tightly controlled?", "options": ["They're rarely used", "They often have broad access and no MFA; compromise can mean full environment access", "They're cheap", "Compliance only"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You discover a legacy application that still uses username/password only and has access to sensitive data. What do you do?", "options": ["Leave it as is", "Document and work to add MFA, restrict access, and move to a more secure auth method; treat as high risk until then", "Change the password only", "Disable the application"], "correct": 1}
            },
            {
                "section_title": "Privacy, Data Protection, and Compliance Awareness",
                "concept_explanation": "Handling PII and sensitive data carries legal and regulatory obligations (e.g. GDPR, CCPA, sector rules). Data classification, access control, encryption, and breach response must align with policy and compliance. Awareness of what data you handle and how it must be protected reduces insider risk and violations.",
                "real_world_example": "An employee emails a spreadsheet with customer PII to a personal account to 'work from home.' The personal account is compromised. The data is exposed and the organization faces regulatory action and reputational damage.",
                "how_attack_works": "Data is exposed via misconfiguration, insider action (accidental or malicious), or external breach. Unclassified or over-shared data increases impact. Lack of encryption or access controls makes exfiltration and misuse easier. Delayed or inadequate breach response worsens legal and reputational impact.",
                "warning_signs": "PII or sensitive data in unencrypted email, personal drives, or shadow IT; unclear classification; excessive access rights; no DLP or monitoring; missing or untested breach response and notification procedures.",
                "how_to_prevent": "Classify data and enforce handling rules. Apply encryption in transit and at rest for sensitive data. Use access controls and DLP; audit and review access. Train staff on data handling and reporting. Maintain and test incident and breach response and notification procedures in line with compliance.",
                "quiz_mcqs": [
                    {"q": "Why does data classification matter?", "options": ["It's only for compliance", "It determines how data must be stored, transmitted, and who can access it; wrong handling increases risk and compliance failure", "It's optional", "It slows down work"], "correct": 1},
                    {"q": "What should you do with PII when sending or storing it?", "options": ["Use the easiest method", "Follow policy: use approved, encrypted channels and storage; don't send to personal email or unapproved cloud", "Only encrypt in email", "Share only with your team"], "correct": 1},
                    {"q": "What is a typical requirement after a breach involving PII?", "options": ["Ignore it", "Contain, assess, notify affected individuals and regulators per applicable law, and document", "Only notify management", "Delete the data"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You need to work on a file containing customer PII from home. The approved method is the corporate VPN and sanctioned cloud. Your VPN is down. What do you do?", "options": ["Email the file to your personal email", "Use only approved methods; wait for VPN or use a sanctioned alternative. Don't send PII to personal email or unapproved storage", "Put it on a USB and take it home", "Use a personal cloud account"], "correct": 1}
            },
            {
                "section_title": "Networking Fundamentals",
                "concept_explanation": "Understanding TCP/IP, the OSI model, and how data moves through networks is the foundation for securing them.",
                "real_world_example": "Knowing that port 22 is SSH and port 80 is HTTP helps you recognise unexpected open ports during a scan.",
                "how_attack_works": "Attackers scan networks to find open ports and services they can exploit; misconfigurations make this easier.",
                "warning_signs": "Unexpected services listening on unusual ports or high traffic on unknown ports.",
                "how_to_prevent": "Keep unnecessary ports closed, segment networks, and monitor traffic for anomalies.",
                "quiz_mcqs": [
                    {"q": "What does the OSI model help you understand?", "options": ["How to cook", "Layers of network communication", "Music theory", "Passwords"], "correct": 1},
                    {"q": "Why block unused ports on a firewall?", "options": ["To make it faster", "To reduce the attack surface by limiting entry points", "To save power", "To confuse attackers"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A scanning tool shows port 3389 (RDP) open on a server that shouldn't have remote desktop enabled. What do you do?", "options": ["Ignore it", "Investigate and close or secure the service; unauthorized RDP can be an entry for attackers", "Open more ports", "Change the server name"], "correct": 1}
            },
            {
                "section_title": "Cryptography Basics",
                "concept_explanation": "Cryptography uses algorithms to protect data by transforming it into unreadable form unless you have the key. Symmetric uses one key, asymmetric uses a public/private pair, and hashing produces fixed-size digests.",
                "real_world_example": "HTTPS uses asymmetric cryptography to establish a secure connection, then symmetric cryptography for data transfer.",
                "how_attack_works": "Weak keys or poor implementation can be broken, exposing the data.",
                "warning_signs": "Using outdated algorithms (MD5, SHA1) or unencrypted protocols (HTTP instead of HTTPS).",
                "how_to_prevent": "Use strong, modern algorithms and proper key management; encrypt sensitive data in transit and at rest.",
                "quiz_mcqs": [
                    {"q": "Which is an asymmetric algorithm?", "options": ["AES", "RSA", "SHA-256", "Blowfish"], "correct": 1},
                    {"q": "What does hashing do?", "options": ["Encrypts data so it can be decrypted", "Produces a fixed-size fingerprint of data, not meant to be reversed", "Slows down the network", "Generates keys"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A developer stores passwords in the database using MD5 hashing. What is the issue?", "options": ["Nothing, MD5 is secure", "MD5 is weak and can be reversed with modern tools; use a stronger hash with salt", "The passwords are too long", "Passwords should be in plain text"], "correct": 1}
            },
            {
                "section_title": "Web Application Security (OWASP Top 10)",
                "concept_explanation": "Web apps are common attack targets. The OWASP Top 10 lists common issues like SQL injection, XSS, and insecure deserialization.",
                "real_world_example": "A forum allows users to submit posts without escaping input; an attacker injects a script that steals other users' cookies.",
                "how_attack_works": "Unsanitized input or improper configuration lets attackers execute code, access data, or escalate privileges.",
                "warning_signs": "Applications crash with unusual inputs, or error messages reveal database queries.",
                "how_to_prevent": "Validate and sanitize input, use prepared statements, keep frameworks updated, and perform regular security testing.",
                "quiz_mcqs": [
                    {"q": "What is SQL injection?", "options": ["Injecting SQL to speed up queries", "Entering malicious database commands through input fields", "Updating software", "A type of malware"], "correct": 1},
                    {"q": "Which practice helps prevent XSS?", "options": ["Encoding output before rendering on pages", "Using public Wi‑Fi", "Disabling JavaScript", "Encrypting cookies"], "correct": 0}
                ],
                "scenario_question": {"scenario": "You find an input field that reflects your input back without changes and allows <script> tags. What should you do?", "options": ["Ignore it", "Report it as a potential XSS vulnerability to the development team", "Use it to execute arbitrary scripts on the site", "Disable your browser"], "correct": 1}
            },
            {
                "section_title": "Vulnerability Assessment & Penetration Testing",
                "concept_explanation": "Assessments identify weaknesses; penetration tests simulate attacks to exploit them. Both help you fix issues before real attackers do.",
                "real_world_example": "A company hires a tester who finds an unpatched web server; the IT team updates it before attackers notice.",
                "how_attack_works": "Attackers use automated tools and manual techniques to find and exploit weaknesses, often the same ones testers look for.",
                "warning_signs": "Outdated software, default credentials, missing patches, or error messages revealing details.",
                "how_to_prevent": "Regularly run scans, apply patches, conduct authorized penetration tests, and remediate findings.",
                "quiz_mcqs": [
                    {"q": "What is the purpose of a penetration test?", "options": ["To deploy malware", "To simulate an attack under controlled conditions to find exploitable vulnerabilities", "To increase network speed", "To confuse IT"], "correct": 1},
                    {"q": "Which is a sign you should patch a system?", "options": ["It’s running slow", "A vendor security advisory says it’s vulnerable", "It has a lot of users", "It’s new"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A scan report shows a critical vulnerability in an internet‑facing application. What should you do?", "options": ["Ignore it", "Take the application offline or apply the patch immediately and verify the fix", "Delete the application", "Open more ports"], "correct": 1}
            },
            {
                "section_title": "Secure Coding Practices",
                "concept_explanation": "Writing code with security in mind—validating input, handling errors, and avoiding hard-coded secrets—reduces bugs that attackers can exploit.",
                "real_world_example": "A developer uses parameterized queries instead of concatenating strings, preventing SQL injection.",
                "how_attack_works": "Code flaws create vulnerabilities; attackers look for common mistakes in code repositories or compiled binaries.",
                "warning_signs": "Code that trusts user input, contains TODO comments about security, or stores credentials in plain text.",
                "how_to_prevent": "Follow secure coding guides, perform code reviews, and use tools like linters and static analysis.",
                "quiz_mcqs": [
                    {"q": "What is a secure way to handle user input for database queries?", "options": ["Concatenate strings", "Use parameterized queries or prepared statements", "Ignore it", "Encrypt the input"], "correct": 1},
                    {"q": "Why should you not hard-code passwords in source code?", "options": ["They expire", "Anyone with access to the code can see them, making it easy for attackers", "It makes the code longer", "It slows the program"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You find database credentials in a GitHub repo. What do you do?", "options": ["Leave them", "Remove them, rotate the credentials, and inform the team about not storing secrets in code", "Use them yourself", "Upload more secrets"], "correct": 1}
            },
            {
                "section_title": "Digital Forensics",
                "concept_explanation": "Forensics involves collecting and analyzing digital evidence after an incident, using tools to examine logs, files, and memory without altering them.",
                "real_world_example": "After a breach, the team clones the affected disk and reviews it to see what malware was present and what data was accessed.",
                "how_attack_works": "Without proper forensics, it's hard to know what happened, which slows response and may lead to wrong conclusions.",
                "warning_signs": "Logs disappearing, timestamps changing, or evidence being overwritten during an investigation.",
                "how_to_prevent": "Prepare by having imaging tools ready, preserve evidence quickly, and handle data in a forensically sound way.",
                "quiz_mcqs": [
                    {"q": "What is a forensic image?", "options": ["A picture of a crime scene", "An exact bit-for-bit copy of a storage device used for analysis", "A scanned document", "A log file"], "correct": 1},
                    {"q": "Why is it important not to power off a compromised system before imaging?", "options": ["It wastes time", "Powering off may change or lose volatile evidence like RAM contents", "It fixes the problem", "It stops attackers"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You suspect a server has been compromised but need to investigate. What should you do first?", "options": ["Reboot it", "Isolate and image it so you can analyze without contaminating evidence", "Delete the logs", "Disconnect power completely"], "correct": 1}
            },
            {
                "section_title": "Reverse Engineering",
                "concept_explanation": "Reverse engineering means analyzing software or binaries to understand how they work, often used to study malware or recover lost code.",
                "real_world_example": "A security analyst decompiles a suspicious executable to see what it does and finds it contacts a known command-and-control server.",
                "how_attack_works": "Attackers reverse engineer software to find vulnerabilities or create cracks; defenders use it to study threats.",
                "warning_signs": "Malware samples with obfuscated code or packed executables designed to thwart analysis.",
                "how_to_prevent": "Use obfuscation and anti-reverse-engineering techniques for proprietary code, and enforce tight controls on sensitive binaries.",
                "quiz_mcqs": [
                    {"q": "Why might you reverse engineer a piece of malware?", "options": ["To add new features", "To understand its behavior and create defenses or signatures", "To make it run faster", "To translate it to another language"], "correct": 1},
                    {"q": "What tool is commonly used for reverse engineering binaries?", "options": ["Excel", "IDA Pro or Ghidra", "Photoshop", "Notepad"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You receive a suspicious executable email attachment. How do you safely analyze it?", "options": ["Run it on your main workstation", "Use a sandbox or isolated VM to reverse engineer without risking production systems", "Email it to a friend", "Ignore it"], "correct": 1}
            },
            {
                "section_title": "SIEM & Log Analysis",
                "concept_explanation": "Security Information and Event Management (SIEM) systems collect logs from across the network and help analysts spot anomalies and potential threats.",
                "real_world_example": "A SIEM alert highlights repeated failed login attempts from an unusual country; the analyst investigates and blocks the IP.",
                "how_attack_works": "Attackers try to hide their tracks by deleting or altering logs; without logs, detection is much harder.",
                "warning_signs": "Missing logs, unexpected log sources, or spikes in certain events like login failures.",
                "how_to_prevent": "Ensure logs are collected centrally, retained securely, and reviewed regularly; use alerting rules for suspicious activity.",
                "quiz_mcqs": [
                    {"q": "What does SIEM stand for?", "options": ["Security, Internet, Email, Management", "Security Information and Event Management", "System Integration and Event Monitoring", "Simple Internal Email Manager"], "correct": 1},
                    {"q": "Why analyze logs regularly?", "options": ["For fun", "To detect anomalies and signs of compromise early", "To fill disk space", "To confuse users"], "correct": 1}
                ],
                "scenario_question": {"scenario": "Your SIEM shows dozens of failed SSH logins from the same IP over 10 minutes. What should you do?", "options": ["Ignore it", "Investigate the source, block it if malicious, and ensure affected accounts rotate passwords", "Reboot the SSH server", "Disable logging"], "correct": 1}
            },
            {
                "section_title": "Cloud Security Basics",
                "concept_explanation": "Cloud providers (AWS, Azure) have shared responsibility models; you secure your data and configuration while they secure the infrastructure.",
                "real_world_example": "An S3 bucket set to public by mistake exposes customer data; the team corrects the permissions and reviews policies.",
                "how_attack_works": "Misconfigurations, stolen credentials, or insecure APIs allow attackers to access cloud resources.",
                "warning_signs": "Public storage buckets, overly permissive IAM roles, or keys checked into source control.",
                "how_to_prevent": "Follow provider best practices, use IAM least privilege, enable logging, and regularly audit cloud configurations.",
                "quiz_mcqs": [
                    {"q": "In the cloud shared responsibility model, who is responsible for your data?", "options": ["The cloud provider", "You (the customer)", "No one", "The government"], "correct": 1},
                    {"q": "What is a risky IAM configuration?", "options": ["Granting Admin access to all users when they only need read access", "Granting read-only access", "Using MFA", "Rotating keys"], "correct": 0}
                ],
                "scenario_question": {"scenario": "You discover an S3 bucket with sensitive data set to 'Public'. What do you do?", "options": ["Leave it", "Change the permissions to private, investigate how it happened, and notify your security team", "Delete the bucket", "Upload more data"], "correct": 1}
            },
            {
                "section_title": "Ethical Hacking & CTF Concepts",
                "concept_explanation": "Ethical hacking means testing systems legally with permission. Capture-the-Flag (CTF) competitions teach skills like exploiting vulnerabilities and reverse engineering.",
                "real_world_example": "Your security team runs a CTF exercise to help new analysts practice finding and fixing vulnerabilities.",
                "how_attack_works": "CTFs mimic real attacks; they help you learn how attackers think without causing harm.",
                "warning_signs": "Using hacking skills without authorization or against systems you don't own.",
                "how_to_prevent": "Always get permission before testing; stick to authorized CTFs and environments.",
                "quiz_mcqs": [
                    {"q": "What is a key rule of ethical hacking?", "options": ["Hack any system you like", "Get explicit permission before testing systems", "Forget your password", "Never ask"], "correct": 1},
                    {"q": "What is the purpose of a CTF?", "options": ["Steal flags", "Learn security skills in a safe, competitive environment", "Crash servers", "Build websites"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You find a bug in a service you use that lets you access other people's data. What should you do?", "options": ["Exploit it for fun", "Report it through the service's bug bounty or disclosure program and do not misuse it", "Share it publicly to brag", "Ignore it"], "correct": 1}
            },
            {
                "section_title": "Linux & Windows Security Hardening",
                "concept_explanation": "Hardening means configuring systems securely: disabling unnecessary services, applying patches, and using firewalls and access controls.",
                "real_world_example": "A server has SSH root login disabled and only allows key-based authentication; it hasn't been compromised in years.",
                "how_attack_works": "Default configurations often have open ports, weak passwords, and services attackers exploit.",
                "warning_signs": "Unused software installed, default passwords still active, or missing security updates.",
                "how_to_prevent": "Follow hardening guides, remove what you don't need, keep systems patched, and audit configurations regularly.",
                "quiz_mcqs": [
                    {"q": "What is a simple step to harden a Linux server?", "options": ["Enable SSH root login", "Disable unused services and close unnecessary ports", "Install more software", "Change the hostname"], "correct": 1},
                    {"q": "Why apply patches promptly?", "options": ["To get new features", "To fix security vulnerabilities before attackers can use them", "To slow down the system", "To change the logo"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A Windows machine hasn't been rebooted in months and hasn't received updates. What risk does this pose?", "options": ["None", "It may be vulnerable to known exploits that a patch would have fixed", "It will delete your files", "It will run faster"], "correct": 1}
            },
            {
                "section_title": "Exploit Development Basics",
                "concept_explanation": "Exploit development is creating code to take advantage of a vulnerability. Understanding it helps defenders patch and mitigate exploits before attackers use them.",
                "real_world_example": "Researchers write a proof‑of‑concept exploit for a buffer overflow to show the vendor how to fix it.",
                "how_attack_works": "Once an attacker knows how to exploit a vulnerability, they can execute arbitrary code or gain unauthorized access.",
                "warning_signs": "Seeing proof‑of‑concept code publicly available for a specific vulnerability.",
                "how_to_prevent": "Patch vulnerable software quickly and apply mitigations like ASLR and DEP to make exploitation harder.",
                "quiz_mcqs": [
                    {"q": "Why would a defender study exploit development?", "options": ["To create malware", "To understand how vulnerabilities are used so they can better protect systems", "To break the law", "To write games"], "correct": 1},
                    {"q": "What is a common mitigation against exploits?", "options": ["Disable the CPU", "Use address space layout randomization (ASLR) and data execution prevention (DEP)", "Share your password", "Open all ports"], "correct": 1}
                ],
                "scenario_question": {"scenario": "A new exploit is released for a widely used library. What should आपण do?", "options": ["Ignore it", "Update or patch the library immediately and consider applying additional mitigations", "Uninstall the library", "Delete all files"], "correct": 1}
            },
            {
                "section_title": "Security Operations (SOC) Concepts",
                "concept_explanation": "A SOC monitors, detects, and responds to security incidents using people, processes, and technology (like SIEM, EDR, and threat intel).",
                "real_world_example": "The SOC team receives an alert about unusual network traffic and escalates it to incident response.",
                "how_attack_works": "Without a SOC, attacks may go unnoticed for long periods, allowing greater damage.",
                "warning_signs": "Lack of monitoring, alert fatigue, or unclear escalation paths.",
                "how_to_prevent": "Support SOC efforts by reporting issues, providing relevant logs, and following incident response procedures.",
                "quiz_mcqs": [
                    {"q": "What is one role of a SOC?", "options": ["Designing hardware", "Monitoring for and responding to security incidents", "Marketing products", "Writing novels"], "correct": 1},
                    {"q": "Why is timely escalation important in a SOC?", "options": ["To keep analysts busy", "So incidents can be contained quickly before they spread", "To generate reports", "To slow down the network"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You notice an alert from the network IDS about a possible port scan. What should you do?", "options": ["Ignore it", "Notify the SOC or follow the incident reporting process so analysts can investigate", "Block your own IP", "Restart the IDS"], "correct": 1}
            }
        ],
        "final_assessment": [
            {"scenario": "An email from 'CFO' requests an urgent wire to a new account 'for a confidential deal.' The domain is one character different from the real one. What do you do?", "options": ["Process the wire", "Treat as potential BEC; verify through a separate, trusted channel and follow payment-authorization policy before any transfer", "Forward to finance", "Reply to the email"], "correct": 1},
            {"scenario": "You see rapid, mass file renames to .encrypted on a file server. What do you do?", "options": ["Wait for user reports", "Treat as active ransomware: isolate affected systems, preserve evidence, alert incident response, and check backup/restore capability", "Restart the server", "Run antivirus only"], "correct": 1},
            {"scenario": "A caller says they're from IT and need you to approve an MFA push so they can 'fix your account.' What do you do?", "options": ["Approve the push", "Don't approve; this is a common MFA fatigue attack. Deny and report", "Approve if they know your name", "Hang up and call IT back"], "correct": 1},
            {"scenario": "You need to send a dataset with PII to a third party for a project. The contract is signed but they asked you to use a personal file-sharing link. What do you do?", "options": ["Use the link", "Use only approved, secure methods per policy; don't send PII via unapproved or personal channels", "Send it encrypted by ZIP only", "Ask your manager verbally"], "correct": 1},
            {"scenario": "A new scheduled task appears on a critical server that runs a script from a user directory. No change ticket exists. What do you do?", "options": ["Leave it", "Treat as suspicious: investigate origin, contain if needed, and follow security and change management procedures", "Disable the task and delete the script", "Restart the server"], "correct": 1}
        ],
        "risk_score_logic": "Your Personal Risk Awareness Score is derived from correct answers across section quizzes and the final assessment. Higher score = stronger awareness and lower behavioral risk. The score is for this module only and is not used for compliance or HR. Use it to identify areas for further training.",
        "key_takeaways": [
            "Verify high-impact actions (payment changes, credential resets) through a separate, trusted channel. Assume BEC and targeted phishing.",
            "Understand the ransomware lifecycle; defend at multiple stages. Protect and test backups; assume paying does not guarantee recovery.",
            "Never share passwords or MFA codes. Challenge social engineering and tailgating; report and verify.",
            "Enforce strong authentication (MFA, phish-resistant where possible), least privilege, and monitoring. Harden service and legacy accounts.",
            "Handle data according to classification and policy. Use only approved, secure channels; know breach response and notification obligations."
        ]
    }
}
