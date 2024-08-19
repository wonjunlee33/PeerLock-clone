package com.fintech.Server.api.repository;

import com.fintech.Server.api.entity.StorageImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageImageRepository extends JpaRepository<StorageImageEntity, Long> {
}
