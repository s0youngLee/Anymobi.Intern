package com.example.restapi.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentApiResponse {
    private Integer id;

    private String userId;

    private String content;

    private String createdAt;

    private Integer articleId;
}