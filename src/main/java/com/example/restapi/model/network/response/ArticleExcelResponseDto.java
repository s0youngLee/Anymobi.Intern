package com.example.restapi.model.network.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;

@Builder
public record ArticleExcelResponseDto(Integer id, String title, String createdBy, String createdAt, String finalEditDate) {
	public List<String> getData(){
		List<String> data = new ArrayList<>();
		data.add(id.toString());
		data.add(title);
		data.add(createdBy);
		data.add(createdAt);
		data.add(finalEditDate);
		return data;
	}
}
