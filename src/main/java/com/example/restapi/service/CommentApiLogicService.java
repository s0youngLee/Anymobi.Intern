package com.example.restapi.service;

import com.example.restapi.ifs.CrudInterface;
import com.example.restapi.model.entity.Comment;
import com.example.restapi.model.network.Header;
import com.example.restapi.model.network.request.CommentApiRequest;
import com.example.restapi.model.network.response.CommentApiResponse;
import com.example.restapi.repository.ArticleRepository;
import com.example.restapi.repository.CommentRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentApiLogicService implements CrudInterface<CommentApiRequest, CommentApiResponse> {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;

    public CommentApiLogicService(@Lazy CommentRepository commentRepository, @Lazy ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }

    // /board/{article_id} POST
    public Header<CommentApiResponse> create(Header<CommentApiRequest> request, int articleId) {
        CommentApiRequest body = request.getData();

        Comment comment = Comment.builder()
                .userId(body.getUserId())
                .content(body.getContent())
                .createdAt(LocalDateTime.now())
                .article(articleRepository.getReferenceById(articleId))
                .build();

        Comment newComment = commentRepository.save(comment);

        return response(newComment);
    }

    // /board/{article_id}/{id} DELETE
    public Header delete(int articleId,int id) {
        return commentRepository.findById((id))
                .map(comment -> {
                    commentRepository.delete(comment);
                    return Header.OK();
                })
                .orElseGet(()->Header.ERROR("No DATA"));
    }

    private Header<CommentApiResponse> response(Comment comment) {
        CommentApiResponse body = CommentApiResponse.builder()
                .id(comment.getId())
                .userId(comment.getUserId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .articleId(comment.getArticleId())
                .build();

        return Header.OK(body);
    }

    public List<CommentApiResponse> findAllByArticleId(int articleId){
        List<Comment> commentList = commentRepository.findAll();

        List<CommentApiResponse> findByArticleId = new ArrayList<CommentApiResponse>();
        for(Comment comment : commentList){
            if(comment.getArticleId() == articleId){
                CommentApiResponse addBody =CommentApiResponse.builder()
                        .id(comment.getId())
                        .userId(comment.getUserId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                        .articleId(comment.getArticleId())
                        .build();

                findByArticleId.add(addBody);
            }
        }
        return findByArticleId;
    }

    @Override
    public Header<CommentApiResponse> create(Header<CommentApiRequest> request) {
        return null;
    }

    @Override
    public Header<CommentApiResponse> read(int id) {
        return null;
    }

    @Override
    public Header<CommentApiResponse> update(Header<CommentApiRequest> request, int id) {
        return null;
    }

    @Override
    public Header delete(int id) {
        return null;
    }


}