const { ActivityHandler } = require('botbuilder');

class BotActivityHandler extends ActivityHandler {
    constructor(conversationState, userState) {
        super();
        // กำหนด state
        this.conversationState = conversationState;
        this.userState = userState;

        // กำหนด handler สำหรับการส่งข้อความ
        this.onMessage(async (context, next) => {
            await context.sendActivity(`You said '${context.activity.text}'`);
            // โปรดจำไว้ว่าคุณต้องเรียก next() เพื่อให้การประมวลผลต่อไปเกิดขึ้น
            await next();
        });

        // กำหนด handler สำหรับเหตุการณ์การเข้าร่วมการสนทนา
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity('Hi, I am ChatCPE');
                }
            }
            // เรียก next() เพื่อให้การประมวลผลต่อไปเกิดขึ้น
            await next();
        });
    }

    async run(context) {
        await super.run(context);
        // บันทึกสถานะการสนทนาและผู้ใช้
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.BotActivityHandler = BotActivityHandler;
