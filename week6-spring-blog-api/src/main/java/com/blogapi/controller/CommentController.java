package com.blogapi.controller;

import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.entity.Comment;
import com.blogapi.model.entity.Post;
import com.blogapi.repository.CommentRepository;
import com.blogapi.repository.PostRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Comments", description = "Comment Management APIs")
public class CommentController {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentController(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @GetMapping("/posts/{postId}/comments")
    @Operation(summary = "Get comments for post")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("Post not found with id: " + postId);
        }
        return ResponseEntity.ok(commentRepository.findByPostId(postId));
    }

    @PostMapping("/posts/{postId}/comments")
    @Operation(summary = "Add comment to post")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        comment.setPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentRepository.save(comment));
    }

    @PutMapping("/comments/{id}")
    @Operation(summary = "Update comment")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        comment.setText(commentDetails.getText());
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @DeleteMapping("/comments/{id}")
    @Operation(summary = "Delete comment")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (!commentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        commentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}