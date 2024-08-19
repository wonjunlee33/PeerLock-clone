package com.fintech.Server.api.service;

import com.fintech.Server.api.dto.StorageListResponseDto;
import com.fintech.Server.api.dto.StorageRegisterRequestDto;
import com.fintech.Server.api.entity.StorageEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StorageService {
    Long makeTempStorage(Long userId);
    // C : 새로운 창고 등록
    StorageListResponseDto registerStorage(StorageRegisterRequestDto request);

    // R : 서비스 내 모든 창고 List 출력
    List<StorageListResponseDto> getAllStorages();

    // R : 창고 Detail
    ResponseEntity<StorageListResponseDto> getStorageDetail(Long storageId);

    // U : 창고 정보 수정
    // D : 창고 삭제
    ResponseEntity deleteStorage(Long storageId);
}
