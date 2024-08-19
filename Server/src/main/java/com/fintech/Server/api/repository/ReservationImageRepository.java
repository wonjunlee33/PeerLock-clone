package com.fintech.Server.api.repository;

import com.fintech.Server.api.entity.ReservationImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationImageRepository extends JpaRepository<ReservationImageEntity, Long> {
}
