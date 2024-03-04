const {
  BotFrameworkAdapter,
  MemoryStorage,
  ConversationState,
  UserState,
} = require("botbuilder");
const { BotActivityHandler } = require("./botActivityHandler");

// สร้าง adapter ซึ่งจะจัดการการสื่อสารกับ Bot Framework Connector
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
});

// สร้าง storage สำหรับบอท
const memoryStorage = new MemoryStorage();

// สร้าง state สำหรับบอท
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// สร้าง bot ที่จะจัดการกับการสื่อสารกับผู้ใช้
const bot = new BotActivityHandler(conversationState, userState);

// สร้างเซิร์ฟเวอร์ HTTP สำหรับบอท
const restify = require("restify");
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`\n${server.name} listening to ${server.url}`);
});

// รับคำขอจากผู้ใช้และส่งไปยังบอท
server.post("/api/messages", (req, res, next) => {
  adapter
    .processActivity(req, res, async (context) => {
      await bot.run(context);
      next();
    })
    .catch((error) => {
      console.error(`Failed to process request: ${error}`);
      res.send(500);
      next();
    });
});
