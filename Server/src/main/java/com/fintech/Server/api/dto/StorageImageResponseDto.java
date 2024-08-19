package com.fintech.Server.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StorageImageResponseDto {
    private String imageName;
    private String imagePath;

}
