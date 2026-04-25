// Snake & Ladder – Level Question Banks (20 questions each)
window.SL_LEVELS = [
  // ─── LEVEL 1: Cyber Basics (Beginner) ───
  {
    id:1, name:'Cyber Basics', subtitle:'Foundation Level', icon:'🛡️',
    color:'#00d4ff', bg:'linear-gradient(135deg,#0a1628,#0d2137)',
    boardBg:'#0b1929', gridColor:'rgba(0,212,255,0.25)', snakeColor:'#ff4757', ladderColor:'#2ed573',
    snakes:{16:6,47:26,49:11,56:53,62:19,64:60,87:24,93:73,95:75,98:78},
    ladders:{2:38,7:14,8:31,15:26,21:42,28:84,36:44,51:67,71:91,78:98},
    questions:[
      {q:"What is cybersecurity?",o:["A video game","Protecting computers and data from threats","A type of virus","A social media app"],c:1,e:"Cybersecurity means protecting systems, networks, and data from digital attacks."},
      {q:"What does a strong password look like?",o:["123456","password","Tr0pic@lFish!99","myname"],c:2,e:"Strong passwords use a mix of upper/lowercase, numbers, and symbols."},
      {q:"What is phishing?",o:["A fishing hobby","Fake messages to steal your info","A computer game","A software update"],c:1,e:"Phishing tricks you into revealing sensitive information through fake messages."},
      {q:"What does HTTPS mean in a website URL?",o:["The site is fast","The connection is encrypted and secure","The site is free","Nothing important"],c:1,e:"HTTPS encrypts data between your browser and the website."},
      {q:"What should you do with suspicious emails?",o:["Click all links","Reply with your password","Delete and report as spam","Forward to friends"],c:2,e:"Never interact with suspicious emails. Delete and report them."},
      {q:"What is malware?",o:["Helpful software","Malicious software that harms your device","A browser extension","An antivirus"],c:1,e:"Malware is software designed to damage or gain unauthorized access to systems."},
      {q:"What is two-factor authentication (2FA)?",o:["Using two passwords","A second verification step beyond your password","Two different emails","Logging in twice"],c:1,e:"2FA adds an extra security layer by requiring a second form of verification."},
      {q:"Why should you update your software?",o:["To change the color","To fix security vulnerabilities","To slow down your computer","It's not important"],c:1,e:"Updates patch security holes that attackers could exploit."},
      {q:"What is a firewall?",o:["A wall made of fire","A system that blocks unauthorized network access","A type of virus","A password manager"],c:1,e:"Firewalls monitor and control incoming and outgoing network traffic."},
      {q:"Is public Wi-Fi safe for banking?",o:["Yes, always","No, it can be intercepted","Only on weekends","Only with a strong password"],c:1,e:"Public Wi-Fi is risky because attackers can intercept your data."},
      {q:"What is a VPN used for?",o:["Making internet faster","Creating a secure, private connection","Downloading movies","Blocking ads"],c:1,e:"VPNs encrypt your internet connection for privacy and security."},
      {q:"What should you NOT share online?",o:["Your favorite color","Your home address and phone number","Your favorite movie","Your pet's breed"],c:1,e:"Never share personally identifiable information publicly online."},
      {q:"What does the lock icon in your browser mean?",o:["The site is locked","The connection is encrypted","The site is expensive","You can't type"],c:1,e:"The lock icon means the site uses HTTPS encryption."},
      {q:"What is a computer virus?",o:["A sick computer","Self-replicating malicious code","A helpful program","A hardware issue"],c:1,e:"A virus is malicious code that copies itself and spreads to other files."},
      {q:"How often should you back up important files?",o:["Never","Regularly (weekly or more)","Once a year","Only when your computer breaks"],c:1,e:"Regular backups protect you from data loss due to attacks or hardware failure."},
      {q:"What is spam email?",o:["Important messages","Unwanted bulk messages, often with scams","Messages from friends","System updates"],c:1,e:"Spam is unsolicited email, often containing scams or malware."},
      {q:"What should a good password manager do?",o:["Share your passwords","Store and generate strong unique passwords","Delete your accounts","Post passwords online"],c:1,e:"Password managers securely store and create strong, unique passwords."},
      {q:"What is identity theft?",o:["Changing your name","Someone stealing your personal info to commit fraud","A board game","A type of password"],c:1,e:"Identity theft is when criminals use your personal data for fraud."},
      {q:"What's the safest way to download apps?",o:["From any website","From official app stores only","From email links","From pop-up ads"],c:1,e:"Official app stores verify apps for safety before listing them."},
      {q:"Why is it bad to use the same password everywhere?",o:["It's not bad","If one site is hacked, all accounts are compromised","It makes passwords stronger","It saves time"],c:1,e:"Reusing passwords means one breach can compromise all your accounts."}
    ]
  },
  // ─── LEVEL 2: Threat Hunter (Intermediate) ───
  {
    id:2, name:'Threat Hunter', subtitle:'Intermediate Level', icon:'🔍',
    color:'#a78bfa', bg:'linear-gradient(135deg,#1a0a2e,#2d1b69)',
    boardBg:'#150a25', gridColor:'rgba(167,139,250,0.25)', snakeColor:'#ff6b6b', ladderColor:'#48dbfb',
    snakes:{17:7,54:34,62:19,64:60,87:36,92:73,95:75,98:78,31:10,46:25},
    ladders:{1:38,4:14,9:31,21:42,28:84,51:67,71:91,80:100,36:44,15:26},
    questions:[
      {q:"What is ransomware?",o:["A security tool","Malware that encrypts files and demands payment","A firewall type","A backup system"],c:1,e:"Ransomware locks your files and demands money to unlock them."},
      {q:"What is social engineering?",o:["Building bridges","Manipulating people to reveal confidential info","A coding language","Network engineering"],c:1,e:"Social engineering exploits human psychology rather than technical vulnerabilities."},
      {q:"What is a DDoS attack?",o:["A security scan","Flooding a server with traffic to take it offline","A password attack","A backup method"],c:1,e:"DDoS attacks overwhelm servers with massive traffic to cause outages."},
      {q:"What is encryption?",o:["Deleting files","Converting data into unreadable code","Making files bigger","Compressing files"],c:1,e:"Encryption scrambles data so only authorized parties can read it."},
      {q:"What is a zero-day vulnerability?",o:["A virus found on day zero","An unknown flaw exploited before a patch exists","A firewall setting","A password type"],c:1,e:"Zero-day flaws are unknown to the vendor, giving zero days to fix before exploitation."},
      {q:"What is spear phishing?",o:["Fishing with a spear","Targeted phishing aimed at a specific person","Mass email spam","A network scan"],c:1,e:"Spear phishing is highly personalized phishing targeting specific individuals."},
      {q:"What does a keylogger do?",o:["Locks your keyboard","Records every keystroke you make","Speeds up typing","Fixes keyboard errors"],c:1,e:"Keyloggers secretly record what you type, including passwords."},
      {q:"What is a brute force attack?",o:["Physical attack","Systematically trying all possible passwords","A firewall test","A software update"],c:1,e:"Brute force attacks try every possible combination until the right one is found."},
      {q:"What is a man-in-the-middle attack?",o:["A mediator service","An attacker intercepting communications between two parties","A network setup","A help desk feature"],c:1,e:"MITM attacks intercept and potentially alter communications between two parties."},
      {q:"What is multi-factor authentication?",o:["Multiple passwords","Using 2+ verification methods (password + phone, etc.)","Multiple usernames","Multiple email addresses"],c:1,e:"MFA requires multiple forms of verification for stronger security."},
      {q:"What is a trojan horse in cybersecurity?",o:["A wooden horse","Malware disguised as legitimate software","An antivirus","A firewall"],c:1,e:"Trojans appear to be safe software but contain hidden malicious code."},
      {q:"What is SQL injection?",o:["A database backup","Inserting malicious code into database queries","A programming language","A network protocol"],c:1,e:"SQL injection exploits vulnerabilities in database-driven applications."},
      {q:"What is a botnet?",o:["A robot network for good","A network of compromised computers controlled by attackers","An internet provider","A social network"],c:1,e:"Botnets are armies of infected computers used for coordinated attacks."},
      {q:"What is the dark web?",o:["Websites with dark themes","Hidden internet requiring special software to access","Offline websites","Government websites"],c:1,e:"The dark web is an encrypted part of the internet often used for illicit activities."},
      {q:"What is credential stuffing?",o:["Filling out forms","Using stolen username/password pairs across multiple sites","Creating new passwords","A backup strategy"],c:1,e:"Credential stuffing uses leaked credentials to break into other accounts."},
      {q:"What is a honeypot in cybersecurity?",o:["A sweet trap for bears","A decoy system designed to attract and study attackers","A password storage","An email filter"],c:1,e:"Honeypots are fake systems that lure attackers to study their methods."},
      {q:"What is cross-site scripting (XSS)?",o:["Writing code for multiple sites","Injecting malicious scripts into trusted websites","A web design technique","A browser feature"],c:1,e:"XSS injects malicious scripts into websites that other users then execute."},
      {q:"What is a security patch?",o:["A physical patch","A software update that fixes security vulnerabilities","A new feature","A backup file"],c:1,e:"Patches fix known security holes in software to prevent exploitation."},
      {q:"What is data exfiltration?",o:["Data backup","Unauthorized transfer of data out of an organization","Data encryption","Data compression"],c:1,e:"Exfiltration is the theft of data from a system, often during a breach."},
      {q:"What is the principle of least privilege?",o:["Everyone gets admin access","Users get only the minimum access needed for their role","No one gets access","Only the CEO gets access"],c:1,e:"Least privilege limits access rights to reduce the attack surface."}
    ]
  },
  // ─── LEVEL 3: Cyber Defender (Advanced) ───
  {
    id:3, name:'Cyber Defender', subtitle:'Advanced Level', icon:'⚔️',
    color:'#f59e0b', bg:'linear-gradient(135deg,#2a1a0a,#3d2512)',
    boardBg:'#1a1008', gridColor:'rgba(245,158,11,0.25)', snakeColor:'#ff4757', ladderColor:'#7bed9f',
    snakes:{16:6,47:26,49:11,56:53,62:19,87:24,93:73,95:75,98:78,34:1},
    ladders:{2:38,7:14,8:31,15:26,28:84,36:44,51:67,71:91,78:98,21:42},
    questions:[
      {q:"What is an Advanced Persistent Threat (APT)?",o:["A quick virus scan","A prolonged, targeted cyberattack by sophisticated actors","A firewall brand","A password policy"],c:1,e:"APTs are long-term, stealthy attacks typically by nation-state actors."},
      {q:"What is ASLR in memory protection?",o:["A login system","Address Space Layout Randomization prevents exploit reliability","A network protocol","An encryption method"],c:1,e:"ASLR randomizes memory addresses to make buffer overflow exploits harder."},
      {q:"What is a supply chain attack?",o:["Attacking delivery trucks","Compromising software/hardware before it reaches the end user","A shipping company hack","An inventory system"],c:1,e:"Supply chain attacks compromise trusted vendors to reach many downstream targets."},
      {q:"What is threat modeling?",o:["3D printing threats","Systematically identifying and prioritizing security threats","Drawing pictures of hackers","A video game"],c:1,e:"Threat modeling proactively identifies attack vectors and prioritizes defenses."},
      {q:"What is a SIEM system?",o:["A type of firewall","Security Information and Event Management for log analysis","A social media platform","A programming language"],c:1,e:"SIEM collects and analyzes security logs to detect threats in real-time."},
      {q:"What is lateral movement in an attack?",o:["Moving sideways physically","An attacker moving through a network after initial compromise","A network cable layout","A backup strategy"],c:1,e:"Lateral movement is how attackers spread through a network after breaching one system."},
      {q:"What is a WAF?",o:["A sound effect","Web Application Firewall that filters HTTP traffic","A wireless protocol","A password type"],c:1,e:"WAFs protect web applications by filtering malicious HTTP requests."},
      {q:"What is the MITRE ATT&CK framework?",o:["A military weapon","A knowledge base of adversary tactics and techniques","A programming language","A hardware component"],c:1,e:"MITRE ATT&CK catalogs real-world adversary behaviors for threat detection."},
      {q:"What is certificate pinning?",o:["Pinning a certificate to a wall","Binding a specific SSL certificate to prevent MITM attacks","Creating a new certificate","A DNS setting"],c:1,e:"Certificate pinning ensures apps only trust specific certificates, blocking MITM."},
      {q:"What is a canary token?",o:["A pet bird","A tripwire that alerts you when an attacker accesses a resource","A password hint","A network cable"],c:1,e:"Canary tokens are digital tripwires that alert on unauthorized access."},
      {q:"What is the CIA triad?",o:["A spy agency motto","Confidentiality, Integrity, and Availability","A virus type","Computer, Internet, Application"],c:1,e:"The CIA triad is the foundation of information security principles."},
      {q:"What is a buffer overflow?",o:["Too much water","Writing data beyond allocated memory, enabling code execution","A slow internet connection","A full hard drive"],c:1,e:"Buffer overflows overwrite memory to potentially execute arbitrary code."},
      {q:"What is EDR?",o:["A music format","Endpoint Detection and Response for threat monitoring","An email protocol","A database type"],c:1,e:"EDR continuously monitors endpoints to detect and respond to threats."},
      {q:"What is DNS tunneling?",o:["Building internet tunnels","Hiding malicious data inside DNS queries to bypass firewalls","A VPN alternative","A DNS server type"],c:1,e:"DNS tunneling hides data exfiltration within normal-looking DNS traffic."},
      {q:"What is a logic bomb?",o:["A math problem","Malicious code triggered by a specific condition or date","A puzzle game","A firewall rule"],c:1,e:"Logic bombs are dormant malware that activate under specific conditions."},
      {q:"What is the difference between IDS and IPS?",o:["Same thing","IDS detects threats; IPS detects AND blocks them","IDS is newer","IPS is software only"],c:1,e:"IDS alerts on threats while IPS actively blocks them."},
      {q:"What is privilege escalation?",o:["Getting a promotion","An attacker gaining higher access rights than intended","Upgrading software","Increasing bandwidth"],c:1,e:"Privilege escalation lets attackers gain admin-level control of systems."},
      {q:"What is a red team vs blue team?",o:["Sports teams","Red attacks to find vulnerabilities; Blue defends","Color preferences","Hardware vs software"],c:1,e:"Red teams simulate attacks while blue teams defend — together they improve security."},
      {q:"What is OSINT?",o:["An operating system","Open Source Intelligence — gathering info from public sources","A network tool","A file format"],c:1,e:"OSINT uses publicly available information for intelligence gathering."},
      {q:"What is a rootkit?",o:["A gardening tool","Malware that hides deep in the OS to maintain persistent access","A root user password","A system backup"],c:1,e:"Rootkits embed in the OS kernel to hide attacker presence and maintain access."}
    ]
  }
];
