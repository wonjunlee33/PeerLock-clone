package com.fintech.Server.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StorageRegisterRequestDto {
    private String storageName;
    private String storageAddress;
    private String storageLatitude;
    private String storageLongitude;
    private String storageType;
    private String storageFeature;
    private String storageSize;
//    private String storageTotalCapacity;
//    private String storageAvailableCapacity;
//    private String storageUsage;
    private Integer storagePrice;
    private Integer serviceCommission;
    private String storageDescription;
//    private Date availableFrom;
//    private Date availableUntil;
    private String returnPolicy;
    private Long userId; // UserEntity의 ID를 참조하기 위한 필드

    // 이미지 저장
    private List<ImageInfo> images;

    @Data
    public static class ImageInfo {
        private String imageName;
        private String imagePath;
    }
//    @Data
//    public class StorageFeature {
//        private boolean smokeFree;
//        private boolean cameraIndoor;
//        private boolean fireExtinguisher;
//    }

}

