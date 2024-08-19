package com.fintech.Server.api.service;

import com.fintech.Server.api.dto.ReservationCreateRequestDto;
import com.fintech.Server.api.dto.ReservationListResponseDto;
import com.fintech.Server.api.entity.ReservationEntity;
import com.fintech.Server.api.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReservationService {

    // 예약 등록
    ReservationListResponseDto createReservation(ReservationCreateRequestDto request);

    // 예약 List 조회
    List<ReservationListResponseDto> getAllReservations();

    // 예약 detail
    ResponseEntity<ReservationListResponseDto> getReservationDetail(Long reservationId);

    // 예약 수정
//    ReservationEntity updateReservation(Long reservationId, ReservationListResponseDto request);

    // 예약 삭제
    ResponseEntity deleteReservation(Long reservationId);
}
