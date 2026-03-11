// 简单后台：接收官网预约并转发到邮箱（需本地或服务器运行）

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 请将下面的 user 改为你的邮箱，将 pass 改为 163 邮箱的客户端授权码
// 授权码需要在 163 邮箱设置里单独开通，不要直接用登录密码
const transporter = nodemailer.createTransport({
  host: "smtp.163.com",
  port: 465,
  secure: true,
  auth: {
    user: "jiajia1234561109@163.com",
    pass: "XCv3k9XVkvtmaix3"
  }
});

app.post("/api/booking", async (req, res) => {
  const { name, phone, service, elderInfo } = req.body || {};

  if (!name || !phone || !service) {
    return res.status(400).json({ success: false, message: "必填信息不完整" });
  }

  const mailOptions = {
    from: '"颐安康养官网预约" <jiajia1234561109@163.com>',
    to: "jiajia1234561109@163.com",
    subject: "颐安康养服务中心官网预约意向",
    text: [
      "有新的预约意向信息：",
      "",
      "联系人姓名：" + name,
      "联系电话：" + phone,
      "意向服务：" + service,
      "",
      "老人基本情况：",
      elderInfo || "（未填写）",
      "",
      "—— 来自颐安康养服务中心官网表单（/contact.html）"
    ].join("\n")
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("发送邮件失败：", error);
    res.status(500).json({ success: false, message: "服务器发送邮件失败" });
  }
});

app.listen(PORT, () => {
  console.log(`预约后台已启动：http://localhost:${PORT}`);
});

