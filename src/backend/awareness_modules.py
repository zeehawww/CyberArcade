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
                "concept_explanation": "What you post and share online can be seen, saved, and spread. Privacy settings control who sees your posts and profile. Once something is online, it's hard to take back. Some apps and sites collect a lot of data about you—know what you're sharing.",
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
    "title": "Cybersecurity Awareness for Digital Citizens",
    "target_audience": "This module is for everyday internet users: people who bank online, shop, use email and social media, and want to protect themselves and their family from scams, fraud, and privacy risks.",
    "learning_objective": "Develop a cautious, verifying mindset: question unexpected requests, verify before you act, and protect your identity and finances.",
    "content": {
        "sections": [
            {
                "section_title": "Phishing: Don't Get Hooked by Fake Messages",
                "concept_explanation": "Phishing is when criminals send emails, texts, or messages that look like they're from your bank, a shop, or a service you use. The goal is to get you to click a link or open an attachment so they can steal your password, card details, or personal information.",
                "real_world_example": "You get an email that looks like it's from your bank saying there's a problem with your account and you must 'verify' by clicking a link. The link goes to a fake site that captures your login details. The criminal then empties your account.",
                "how_attack_works": "You receive a message that looks legitimate and creates urgency (account locked, refund, delivery issue). You click a link or open an attachment. You enter your details on a fake site or the attachment installs malware. The attacker uses your data to steal money or identity.",
                "warning_signs": "Urgent or threatening language, sender address that doesn't match the real company (e.g. @bank-secure.com instead of @yourbank.com), generic greetings ('Dear Customer'), links that show a different URL when you hover, requests for password or card number by email or message.",
                "how_to_prevent": "Don't click links in emails or messages about your account. Open your browser and type the real website address or use your saved bookmark, then log in. Don't open attachments from senders you don't know or weren't expecting. If in doubt, call the company using the number on their official website or your card.",
                "quiz_mcqs": [
                    {"q": "Your bank emails asking you to click a link to 'secure your account.' What should you do?", "options": ["Click the link", "Don't click; go to the bank's real website yourself and log in there to check", "Reply to the email", "Forward the email to the bank"], "correct": 1},
                    {"q": "Which is a common sign of a phishing email?", "options": ["It has no images", "It uses urgent language and asks you to act immediately", "It's long", "It's from a friend"], "correct": 1},
                    {"q": "Where is it safe to enter your bank password?", "options": ["On a page you reached by clicking a link in an email", "Only on the bank's real website after you typed the URL or used a bookmark", "In a reply to an email", "In a text message"], "correct": 1}
                ],
                "scenario_question": {"scenario": "You get a text saying your card was used for a big purchase and to call a number to dispute it. You're not sure if you made the purchase. What do you do?", "options": ["Call the number in the text", "Call the number on the back of your card or your bank's official website to check", "Reply to the text", "Ignore it"], "correct": 1}
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
            }
        ],
        "final_assessment": [
            {"scenario": "An email says your tax refund is ready and you must click a link to receive it. What do you do?", "options": ["Click the link", "Don't click. Use the official tax authority website or contact them through known channels to check refund status", "Reply to the email", "Forward to your accountant"], "correct": 1},
            {"scenario": "A caller says they're from your bank and need you to confirm your full card number to 'release a hold.' What do you do?", "options": ["Give the number", "Hang up and call the number on the back of your card to verify", "Give the last 4 digits", "Ask them to email you"], "correct": 1},
            {"scenario": "A pop-up on a website says your computer is infected and you must call a number. What do you do?", "options": ["Call the number", "Close the tab. Don't call; legitimate security software doesn't ask this way", "Click 'Remove virus'", "Restart the computer"], "correct": 1},
            {"scenario": "You get a text with a link to 'track your delivery.' You did order something. What do you do?", "options": ["Click the link in the text", "Go to the real delivery company or retailer website yourself and track with your order number", "Reply to the text", "Ignore it"], "correct": 1},
            {"scenario": "Your sibling messages from a new number saying their phone was stolen and they need money wired to a new account. What do you do?", "options": ["Wire the money", "Contact your sibling on a number or channel you already trust to confirm before sending money", "Send a small amount first", "Ignore the message"], "correct": 1}
        ],
        "risk_score_logic": "Your Personal Risk Awareness Score is based on correct answers in the section quizzes and final assessment. Higher correct answers = higher awareness and lower risk. The score is for this module only and is not stored long-term. Use it to see which topics to review.",
        "key_takeaways": [
            "Don't click links in messages about your accounts. Go to the real website yourself and log in there.",
            "Never give remote access to your computer, or your password or full card details, to someone who contacted you first.",
            "Use strong, unique passwords and turn on 2FA for email and banking. Use a password manager.",
            "Back up important files. Don't trust pop-ups that say your device is infected and ask you to call a number.",
            "Protect your and your family's privacy: limit what you post, lock down privacy settings, and teach kids not to share personal details online."
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
