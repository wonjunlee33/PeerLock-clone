package com.fintech.Server.api.repository;

import com.fintech.Server.api.entity.StorageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StorageRepository extends JpaRepository<StorageEntity, Long> {
    // R : 창고 생성 날짜(최신) 기준으로 가져오기
    List<StorageEntity> findAllByOrderByCreatedAtDesc();
}
