---
title: srs信令java版
date: 2023-10-10 08:21:22
tags: java
---

> 会赚钱的人，即使身无分文，也还有自身这个财产。——亚兰

前两天讲到了 [srs实现多人聊天室](https://VampireAchao.github.io/2023/10/08/srs%E5%AE%9E%E7%8E%B0%E5%A4%9A%E4%BA%BA%E8%81%8A%E5%A4%A9%E5%AE%A4/)

但是遇到个问题，官方的信令是`go`语言版的，于是在`gpt`协助下翻译成`java`版了

https://gitee.com/VampireAchao/simple-srs-signaling

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>simple-srs-signaling</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>simple-srs-signaling</name>
    <description>simple-srs-signaling</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter WebSocket for WebSocket support -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>

        <!-- For STOMP messaging protocol over WebSocket -->
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>webjars-locator-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>sockjs-client</artifactId>
            <version>1.0.2</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>stomp-websocket</artifactId>
            <version>2.3.3</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>RELEASE</version>
            <scope>compile</scope>
        </dependency>


    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

当然，代码一股`gpt`味:smile:

```java
package com.example.simplesrssignaling;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MyWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, Room> nameRootMap = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();

        ActionMessage actionMessage = objectMapper.readValue(payload, ActionMessage.class);
        String action = actionMessage.getMsg().getAction();

        switch (action) {
            case "join" -> handleJoin(actionMessage, session);
            case "publish" -> handlePublish(actionMessage, session);
            case "control" -> handleControl(actionMessage, session);
            default -> {
                // Log or send an error message for unrecognized actions.
            }
        }
    }

    private void handleJoin(ActionMessage actionMessage, WebSocketSession session) {
        String roomName = actionMessage.getMsg().getRoom();
        Room room = nameRootMap.computeIfAbsent(roomName, Room::new);

        Participant participant = new Participant();
        participant.setDisplay(actionMessage.getMsg().getDisplay());
        participant.setSession(session);
        room.add(participant);

        // Prepare response message
        var res = new HashMap<>();
        res.put("action", "join");
        res.put("room", actionMessage.getMsg().getRoom());
        res.put("self", participant); // Assuming you have a toJson method in Participant
        res.put("participants", room.getParticipants()); // Convert list of participants to JSONArray
        var message = new HashMap<>();
        message.put("msg", res);
        message.put("tid", actionMessage.getTid());
        sendMessage(session, message);

        // Notify other participants
        room.notify(session, participant, "join", actionMessage);
    }

    private void handlePublish(ActionMessage actionMessage, WebSocketSession session) {
        String roomName = actionMessage.getMsg().getRoom();
        Room room = nameRootMap.get(roomName);
        if (room != null) {
            Participant participant = room.get(actionMessage.getMsg().getDisplay());
            if (participant != null) {
                participant.setPublishing(true);

                // Notify other participants
                room.notify(session, participant, "publish", actionMessage);
            }
        }
    }

    private void handleControl(ActionMessage actionMessage, WebSocketSession session) {
        String roomName = actionMessage.getMsg().getRoom();
        Room room = nameRootMap.get(roomName);
        if (room != null) {
            Participant participant = room.get(actionMessage.getMsg().getDisplay());
            if (participant != null) {
                // You might need to handle more about control like starting a call, ending a call, etc.

                // Notify other participants
                room.notify(session, participant, "control", actionMessage);
            }
        }
    }

    @SneakyThrows
    private void sendMessage(WebSocketSession session, Object message) {
        if (!session.isOpen()) {
            return;
        }
        String jsonMessage = objectMapper.writeValueAsString(message);
        session.sendMessage(new TextMessage(jsonMessage));
    }

    // Define classes like ActionMessage, JoinResponse, and possibly more based on your needs.
    // This provided code should serve as a base structure upon which you can further build as per requirements.


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        nameRootMap.values().removeIf(room -> {
            var participants = room.getParticipants();
            for (Participant participant : participants) {
                if (session.getId().equals(participant.getSession().getId())) {
                    room.remove(participant);
                    var actionMessage = new ActionMessage();
                    room.notify(session, participant, "leave", actionMessage);
                    break;
                }
            }
            return participants.isEmpty();
        });
    }
}
```
