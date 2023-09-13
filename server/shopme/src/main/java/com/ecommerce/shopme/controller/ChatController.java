package com.ecommerce.shopme.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.ecommerce.shopme.chat.ChatMessage;

@Controller
public class ChatController {
//Khi  đánh dấu một phương thức trong một Spring Controller hoặc một bean WebSocket với 
//@MessageMapping, nó sẽ chỉ định rằng phương thức đó sẽ được gọi khi một tin nhắn (message) 
//đến đường dẫn (endpoint) tương ứng.

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatmessage){
        return chatmessage;
    }
    
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        //add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
