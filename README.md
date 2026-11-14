Siyam WhatsApp Bot V5
Baileys-based WhatsApp bot. Node.js 20+ required.
Setup
npm install
Copy .env.example to .env.
Set PAIRING_NUMBER and OWNER_NUMBER using international digits only (no +, spaces or dashes), e.g. 8801XXXXXXXXX.
npm start
Enter the pairing code shown in the terminal in WhatsApp → Linked devices → Link a device → Link with phone number.
Change the WhatsApp number
Stop the bot. Back up anything needed, then delete the .session folder and change PAIRING_NUMBER in .env to the new number. Start again and link the new number using its pairing code. The bot will then run as that WhatsApp account. Do not share the session folder or pairing code.
Commands
!menu, !ping, !owner. Owner-only commands are checked against OWNER_NUMBER.
Notes
This is a clean WhatsApp implementation, not a Messenger API port. Group/admin actions are handled through WhatsApp group metadata and must be granted admin rights in the group where required.
