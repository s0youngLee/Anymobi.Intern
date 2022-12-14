package com.example.restapi.controller;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.example.restapi.model.network.request.CommentRequest;
import com.example.restapi.model.network.response.CommentResponseDto;
import com.example.restapi.model.network.response.UserResponseDto;
import com.example.restapi.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;
    public CommentController(@Lazy CommentService commentService) {
        super();
        this.commentService = commentService;
    }

    @PostMapping("")
    public ResponseEntity<CommentResponseDto> create(@RequestBody CommentRequest request) {
        return commentService.create(request);
    }

    @GetMapping("{id}")
    public ResponseEntity<CommentResponseDto> read(@PathVariable int id) {
        return commentService.read(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<CommentResponseDto> update(@RequestBody CommentRequest request, @PathVariable int id) {
        return commentService.update(request, id);
    }

    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable int id) {
        return commentService.delete(id);
    }

    @GetMapping("/user")
    public ResponseEntity<List<CommentResponseDto>> getMyComments(@SessionAttribute("user") UserResponseDto user){
        return commentService.getUserComment(user.nickName());
    }

}
