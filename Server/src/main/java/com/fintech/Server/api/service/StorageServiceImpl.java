package com.fintech.Server.api.service;

import com.fintech.Server.api.dto.*;
import com.fintech.Server.api.entity.StorageEntity;
import com.fintech.Server.api.entity.StorageImageEntity;
import com.fintech.Server.api.entity.StorageStatus;
import com.fintech.Server.api.entity.user.UserEntity;
import com.fintech.Server.api.repository.StorageImageRepository;
import com.fintech.Server.api.repository.StorageRepository;
import com.fintech.Server.api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StorageServiceImpl implements StorageService {
    private static final Logger logger = LoggerFactory.getLogger(StorageServiceImpl.class);
    private final StorageRepository storageRepository;
    private final StorageImageRepository storageImageRepository;
    private final UserRepository userRepository;

    @Autowired
    public StorageServiceImpl(
            @Autowired StorageRepository storageRepository,
            @Autowired UserRepository userRepository,
            @Autowired StorageImageRepository storageImageRepository
    ) {
        this.storageRepository = storageRepository;
        this.userRepository = userRepository;
        this.storageImageRepository = storageImageRepository;
    }


    @Override
    public Long makeTempStorage(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        // todo: user.Status = HOST 일 때 수행하도록
        if (user.get().getStatus().name().equals("HOST")) {
            // 등록 창고 저장
            StorageEntity storageEntity = StorageEntity.builder()
                    .user(user.get())
                    .build();
            StorageEntity savedStorage = storageRepository.save(storageEntity);

            return savedStorage.getStorageId();
        }
        return null;
    }

    @Override
    public StorageListResponseDto registerStorage(StorageRegisterRequestDto request) {
        Optional<UserEntity> user = userRepository.findById(request.getUserId());
        // todo: user.Status = HOST 일 때 수행하도록
        if (user.get().getStatus().name().equals("HOST")) {

            // 등록 창고 저장
            StorageEntity storageEntity = StorageEntity.builder()
                    .user(user.get())
                    .storageName(request.getStorageName())
                    .storageAddress(request.getStorageAddress())
                    .storageLatitude(request.getStorageLatitude())
                    .storageLongitude(request.getStorageLongitude())
                    .storageType(request.getStorageType())
                    .storageSize(request.getStorageSize())
                    .storageFeature(request.getStorageFeature())
                    .storagePrice(request.getStoragePrice())
                    .serviceCommission(request.getServiceCommission())
                    .storageDescription(request.getStorageDescription())
                    .returnPolicy(request.getReturnPolicy())
                    .status(StorageStatus.AVAILABLE)
                    .build();
            StorageEntity savedStorage = storageRepository.save(storageEntity);

            StorageListResponseDto responseDto = new StorageListResponseDto();
            responseDto.setStorageId(savedStorage.getStorageId());

//            // 여러 이미지 저장
//            List<StorageRegisterRequestDto.ImageInfo> imageInfos = request.getImages();
//
//            for (StorageRegisterRequestDto.ImageInfo imageInfo : imageInfos) {
//                StorageImageEntity storageImageEntity = StorageImageEntity.builder()
//                        .storage(savedStorage) // 연관 관계 설정
//                        .imageName(imageInfo.getImageName())
//                        .imagePath(imageInfo.getImagePath())
//                        .build();
//                storageImageRepository.save(storageImageEntity);
//            }

//            return savedStorage;
            return responseDto;
        } else {
            return null;
        }
    }

//    @Override
//    public List<StorageListResponseDto> getAllStorages() {
//        List<StorageEntity> storageEntities = storageRepository.findAll();
//        List<StorageListResponseDto> storageDtos = new ArrayList<>();
//
//        for (StorageEntity storageEntity : storageEntities) {
//            if (!storageEntity.getStatus().name().equals("DELETED")) {
//                StorageListResponseDto dto = convertToDto(storageEntity);
//                storageDtos.add(dto);
//            }
//        }
//
//        return storageDtos;
//    }

    // 최신 순으로 목록 가져오기
    @Override
    public List<StorageListResponseDto> getAllStorages() {
        List<StorageEntity> storageEntities = storageRepository.findAllByOrderByCreatedAtDesc();
        List<StorageListResponseDto> storageDtos = new ArrayList<>();

        for (StorageEntity storageEntity : storageEntities) {
            if (!storageEntity.getStatus().name().equals("DELETED")) {
                StorageListResponseDto dto = convertToDto(storageEntity);
                storageDtos.add(dto);
            }
        }

        return storageDtos;
    }


    @Override
    public ResponseEntity<StorageListResponseDto> getStorageDetail(Long storageId) {
        Optional<StorageEntity> storageOpt = storageRepository.findById(storageId);

        if (!storageOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        StorageEntity storageEntity = storageOpt.get();
        StorageListResponseDto storageListResponseDto = convertToDto(storageEntity);

        return ResponseEntity.ok(storageListResponseDto);
    }

    @Override
    public ResponseEntity deleteStorage(Long storageId) {
        Optional<StorageEntity> storageOpt = storageRepository.findById(storageId);

        if (!storageOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        StorageEntity storageEntity = storageOpt.get();
        storageEntity.setStatus(StorageStatus.DELETED);
        storageRepository.save(storageEntity);

        return ResponseEntity.ok().build();

    }

    private StorageListResponseDto convertToDto(StorageEntity storageEntity) {
        // Storage
        StorageListResponseDto dto = new StorageListResponseDto();

        // dto 에 값 입력
        dto.setStorageId(storageEntity.getStorageId());
        dto.setStorageName(storageEntity.getStorageName());
        dto.setStorageAddress(storageEntity.getStorageAddress());
        // todo: 주소를 통해 위도, 경도 찾기 -> 프론트에서? 백에서? naver 지도 api에 따라 다를듯
        dto.setStorageLatitude(storageEntity.getStorageLatitude());
        dto.setStorageLongitude(storageEntity.getStorageLongitude());
        dto.setStorageType(storageEntity.getStorageType());
        dto.setStorageSize(storageEntity.getStorageSize());
        dto.setStorageFeature(storageEntity.getStorageFeature());
//        dto.setStorageTotalCapacity(storageEntity.getStorageTotalCapacity());
//        dto.setStorageAvailableCapacity(storageEntity.getStorageAvailableCapacity());
//        dto.setStorageUsage(storageEntity.getStorageUsage());
        dto.setStoragePrice(storageEntity.getStoragePrice());
        dto.setServiceCommission(storageEntity.getServiceCommission());
        dto.setStorageDescription(storageEntity.getStorageDescription());
//        dto.setAvailableFrom(storageEntity.getAvailableFrom());
//        dto.setAvailableUntil(storageEntity.getAvailableUntil());
        dto.setReturnPolicy(storageEntity.getReturnPolicy());
        dto.setCreatedAt(storageEntity.getCreatedAt());
        dto.setUpdatedAt(storageEntity.getUpdatedAt());
        dto.setStatus(storageEntity.getStatus().name());


        // Images
        List<StorageImageResponseDto> imageDtos = storageEntity.getStorageImages()
                .stream()
                .map(image -> new StorageImageResponseDto(image.getImageName(), image.getImagePath()))
                .collect(Collectors.toList());

        dto.setImages(imageDtos);

        /*
        // User
        UserResponseDto userDto = new UserResponseDto();
        userDto.setUserId(storageEntity.getUser().getUserId());
        userDto.setUsername(storageEntity.getUser().getUserName());
        userDto.setStatus(storageEntity.getUser().getStatus().name());

        dto.setUser(userDto);
        */


        UserEntity userEntity = storageEntity.getUser();

        if (userEntity != null && userEntity.getStorages() != null && !userEntity.getStorages().isEmpty()) {
            dto.setUserId(userEntity.getStorages().get(0).getUser().getUserId());
        }

        return dto;
    }
}