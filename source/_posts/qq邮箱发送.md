---
title: qq邮箱发送
date: 2020-11-14 14:48:01
tags: java
---

> 宁鸣而死，不默而生。——胡适

```
package com.ruben.utils; 
/**
 * @ClassName: SendEmail
 * @Date: 2020/11/7 0007 19:36
 * @Description:
 */

import com.ruben.pojo.EmailDataTransferObject;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * @ClassName: SendEmail
 * @Description: 我还没有写描述
 * @Date: 2020/11/7 0007 19:36
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class SendEmail {
    public static void sendEmail(EmailDataTransferObject emailDataTransferObject) throws MessagingException {
        //做链接前的准备工作  也就是参数初始化
        Properties properties = new Properties();
        properties.setProperty("mail.smtp.host", "smtp.qq.com");//发送邮箱服务器
        properties.setProperty("mail.smtp.port", "465");//发送端口
        properties.setProperty("mail.smtp.auth", "true");//是否开启权限控制
        properties.setProperty("mail.debug", "true");//true 打印信息到控制台
        properties.setProperty("mail.transport", "smtp");//发送的协议是简单的邮件传输协议
        properties.setProperty("mail.smtp.ssl.enable", "true");
        //建立两点之间的链接
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailDataTransferObject.getSender(), emailDataTransferObject.getCode());
            }
        });
        //创建邮件对象
        Message message = new MimeMessage(session);
        //设置发件人
        try {
            message.setFrom(new InternetAddress(emailDataTransferObject.getSender()));

            //设置收件人
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(emailDataTransferObject.getReceiver()));//收件人
            //设置主题
            message.setSubject(emailDataTransferObject.getTitle());
            //设置邮件正文  第二个参数是邮件发送的类型
            message.setContent(emailDataTransferObject.getContent(), "text/html;charset=UTF-8");
            //发送一封邮件
            Transport transport = session.getTransport();
            transport.connect(emailDataTransferObject.getSender(), emailDataTransferObject.getCode());
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        } finally {

        }

    }

}

```

```java
package com.ruben.pojo;
/**
 * @ClassName: EmailDataTransferObject
 * @Date: 2020/11/7 0007 21:50
 * @Description:
 */

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @ClassName: EmailDataTransferObject
 * @Description: 我还没有写描述
 * @Date: 2020/11/7 0007 21:50
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailDataTransferObject {
    @Email(message = "请输入合法邮箱")
    private String sender;
    @NotBlank(message = "请输入授权码")
    private String code;
    @Email(message = "请输入合法邮箱")
    private String receiver;
    @NotBlank(message = "请输入标题")
    private String title;
    @NotBlank(message = "请输入内容")
    private String content;
    @NotNull(message = "请输入间隔时间(秒)")
    @Min(value = 0, message = "间隔时间不能为负数")
    private Long split;
    @NotNull(message = "请输入发送次数")
    @Min(value = 0, message = "发送次数不能为负数")
    private Long times;
}
```

