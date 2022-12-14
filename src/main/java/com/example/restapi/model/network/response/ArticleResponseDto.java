package com.example.restapi.model.network.response;

import java.util.List;

import lombok.Builder;

@Builder
public record ArticleResponseDto(Integer id,
                                 String title,
                                 String content,
                                 // Integer createdId,
                                 String userNickname,
                                 String createdAt,
								 String finalEditDate,
                                 Integer categoryId,
                                 String categoryName,
                                 Integer visitCnt,
                                 List<CommentResponseDto> comment,
                                 List<FileResponseDto> files) { }
