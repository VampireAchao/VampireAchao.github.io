---
title: java阿里云企业邮箱发送邮件
date: 2020-07-16 18:55:55
tags: java
---

提供一个跟阿里云客服小姐姐要到的Demo

```java
package com.ruben;

import com.sun.net.ssl.internal.ssl.Provider;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.Security;
import java.util.Date;
import java.util.Properties;

/**
 * @ClassName: AliCompanyEmailSender
 * @Date: 2020/7/16 0014 13:47
 * @Description:
 * @Author: <achao1441470436@gmail.com>
 *
 *     <dependency>
 *        <groupId>javax.mail</groupId>
 *        <artifactId>mail</artifactId>
 *        <version>1.4.3-rc1</version>
 *     </dependency>
 *
 */
public class AliCompanyEmailSender {
    public static void main(String[] args) throws MessagingException {
        Security.addProvider(new Provider());
        final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
        Properties props = System.getProperties();
        props.put("mail.smtp.host", "smtp.mxhichina.com");
        props.put("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.put("mail.smtp.socketFactory.fallback", "false");
        props.put("mail.smtp.port", "465");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.auth", "true");
        //建立邮件会话
        Session session = Session.getDefaultInstance(props, new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("阿里云企业账号用户名", "阿里云企业账号密码");
                    }
                }
        );
        //建立邮件对象
        MimeMessage message = new MimeMessage(session);
        //设置邮件的发信人、收件人、主题
        //附带发件人名字
        message.setFrom(new InternetAddress("发件人名字"));
        message.setRecipients(Message.RecipientType.TO, "收件人邮箱");
        message.setSubject("标题");
        //文本
        String content = "正文";
        message.setText(content);
        message.setSentDate(new Date());
        message.saveChanges();
        //发送邮件
        Transport.send(message);
    }
}
```

还有就是一定要把<code>POP3/SMTP</code>服务和<code>IMAP/SMTP</code>服务

![image-20200716194833136](/imgs/oss/picGo/image-20200716194833136.png)

