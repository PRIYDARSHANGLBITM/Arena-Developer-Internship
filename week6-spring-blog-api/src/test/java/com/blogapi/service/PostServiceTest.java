package com.blogapi.service;

import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;
import com.blogapi.model.entity.Category;
import com.blogapi.model.entity.Post;
import com.blogapi.repository.CategoryRepository;
import com.blogapi.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private PostService postService;

    @Test
    void createPost_Success() {
        PostRequest request = new PostRequest("Title", "Content", "Author", 1L);
        Category category = new Category(1L, "Tech", "Tech Category");
        Post post = new Post(1L, "Title", "Content", "Author", category, null, null);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(postRepository.save(any(Post.class))).thenReturn(post);

        PostResponse response = postService.createPost(request);

        assertNotNull(response);
        assertEquals("Title", response.getTitle());
        verify(postRepository, times(1)).save(any(Post.class));
    }
}
