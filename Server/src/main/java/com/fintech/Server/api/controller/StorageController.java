package com.fintech.Server.api.controller;

import com.fintech.Server.api.dto.StorageListResponseDto;
import com.fintech.Server.api.dto.StorageRegisterRequestDto;
import com.fintech.Server.api.entity.StorageEntity;
import com.fintech.Server.api.service.ImageUploadService;
import com.fintech.Server.api.service.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class StorageController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final StorageService storageService;

    @Autowired
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/images")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") MultipartFile[] images, @RequestParam("storageId") Long storageId) {
        try {
            String div = "storage";
            List<String> imageUrls = imageUploadService.uploadImagesToNCP(images, storageId, div);
            return new ResponseEntity<>(imageUrls, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // C : 새로운 창고 등록
    @PostMapping("")
    public ResponseEntity<StorageListResponseDto> registerStorage(@RequestBody StorageRegisterRequestDto request) throws IOException {

        StorageListResponseDto dto = storageService.registerStorage(request);
        if (dto != null) {

//            return ResponseEntity.ok(HttpStatus.CREATED);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    // R : 서비스 내 모든 창고 List 출력
    @GetMapping("")
    public ResponseEntity<List<StorageListResponseDto>> getAllStorageList() {
        List<StorageListResponseDto> storages = storageService.getAllStorages();
        return ResponseEntity.ok(storages);
    }

    // R : 창고 Detail
    @GetMapping("/{storageId}")
    public ResponseEntity<StorageListResponseDto> storageDetail(@PathVariable("storageId") Long storageId) {
        return storageService.getStorageDetail(storageId);
    }

    // U : 창고 정보 수정
    // D : 창고 삭제
    @DeleteMapping("/{storageId}")
    public ResponseEntity deleteStorage(@PathVariable("storageId") Long storageId) {
        return storageService.deleteStorage(storageId);
    }
}

