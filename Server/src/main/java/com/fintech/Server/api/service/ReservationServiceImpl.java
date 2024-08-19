package com.fintech.Server.api.service;

import com.fintech.Server.api.dto.*;
import com.fintech.Server.api.entity.*;
import com.fintech.Server.api.entity.user.UserEntity;
import com.fintech.Server.api.repository.ReservationImageRepository;
import com.fintech.Server.api.repository.ReservationRepository;
import com.fintech.Server.api.repository.StorageRepository;
import com.fintech.Server.api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationServiceImpl.class);

    private final ReservationRepository reservationRepository;

    private final ReservationImageRepository reservationImageRepository;

    private final UserRepository userRepository;

    private final StorageRepository storageRepository;

    @Autowired
    public ReservationServiceImpl(
            @Autowired ReservationRepository reservationRepository,
            @Autowired UserRepository userRepository,
            @Autowired ReservationImageRepository reservationImageRepository,
            @Autowired StorageRepository storageRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.reservationImageRepository = reservationImageRepository;
        this.storageRepository = storageRepository;
    }
    @Override
    public ReservationListResponseDto createReservation(ReservationCreateRequestDto request) {
        Optional<UserEntity> user = userRepository.findById(request.getUserId());
        if (user.isPresent() && user.get().getStatus().name().equals("USER")) {
            Long storageId = request.getStorageId(); // request에서 storageId 가져오기
            Optional<StorageEntity> storageEntityOpt = storageRepository.findById(storageId);

            if (!storageEntityOpt.isPresent()) {
                // todo: Storage를 찾을 수 없는 경우에 대한 처리 (예외 던지기 등)
                return null; // 필요한 경우 적절한 예외를 던지거나 처리 로직 추가
            }

            StorageEntity storageEntity = storageEntityOpt.get();

            ReservationEntity reservationEntity = ReservationEntity.builder()
                    .user(user.get())
                    .storage(storageEntity) // storage 설정
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .itemSize(request.getItemSize())
                    .insurancePlan(request.getInsurancePlan())
                    .insurancePrice(request.getInsurancePrice())
                    .totalMonths(request.getTotalMonths())
                    .totalStoragePrice(request.getTotalStoragePrice())
                    .totalPayment(request.getTotalPayment())
                    .paymentMethod("not yet")
                    .status(ReservationStatus.AVAILABLE)
                    .build();

            ReservationEntity savedReservation = reservationRepository.save(reservationEntity);

            ReservationListResponseDto responseDto = new ReservationListResponseDto();
            responseDto.setReservationId(savedReservation.getReservationId());

//            // 여러 이미지 저장
//            List<ReservationCreateRequestDto.ImageInfo> imageInfos = request.getReservationImages();
//            for (ReservationCreateRequestDto.ImageInfo imageInfo : imageInfos) {
//                ReservationImageEntity reservationImageEntity = ReservationImageEntity.builder()
//                        .reservation(savedReservation)
//                        .imageName(imageInfo.getImageName())
//                        .imagePath(imageInfo.getImagePath())
//                        .build();
//                reservationImageRepository.save(reservationImageEntity);
//            }
//            return savedReservation;
            return responseDto;
        } else {
            // 사용자 상태가 "USER"가 아닌 경우에 대한 처리 (예외 던지기 등)
            return null; // 필요한 경우 적절한 예외를 던지거나 처리 로직 추가
        }
    }



//    @Override
//    public ReservationEntity updateReservation(Long reservationId, ReservationListResponseDto reservationDto) {
//        ReservationEntity existingReservation = reservationRepository.findById(reservationId)
//                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));
//
//        // Update existingReservation with reservationDto
//        // ...
//
//        reservationRepository.save(existingReservation);
//        return convertToDto(existingReservation);
//    }

    @Override
    public ResponseEntity deleteReservation(Long reservationId) {
        Optional<ReservationEntity> reservationOpt = reservationRepository.findById(reservationId);

        if (!reservationOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ReservationEntity reservationEntity = reservationOpt.get();
        reservationEntity.setStatus(ReservationStatus.DELETED);
        reservationRepository.save(reservationEntity);

        return ResponseEntity.ok().build();

    }

    @Override
    public ResponseEntity<ReservationListResponseDto> getReservationDetail(Long reservationId) {
        Optional<ReservationEntity> reservationOpt = reservationRepository.findById(reservationId);

        if (!reservationOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ReservationEntity reservationEntity = reservationOpt.get();
        ReservationListResponseDto reservationListResponseDto = convertToDto(reservationEntity);

        return ResponseEntity.ok(reservationListResponseDto);
    }

    @Override
    public List<ReservationListResponseDto> getAllReservations() {
        List<ReservationEntity> reservationEntities = reservationRepository.findAllByOrderByCreatedAtDesc();
        List<ReservationListResponseDto> reservationDtos = new ArrayList<>();
        for (ReservationEntity reservationEntity : reservationEntities) {
            if (!reservationEntity.getStatus().name().equals("DELETED")) {
                ReservationListResponseDto dto = convertToDto(reservationEntity);
                reservationDtos.add(dto);
            }
        }
        return reservationDtos;
    }

    private ReservationListResponseDto convertToDto(ReservationEntity reservationEntity) {
        ReservationListResponseDto dto = new ReservationListResponseDto();

        dto.setReservationId(reservationEntity.getReservationId());
        dto.setStartDate(reservationEntity.getStartDate());
        dto.setEndDate(reservationEntity.getEndDate());
        dto.setItemSize(reservationEntity.getItemSize());
        dto.setInsurancePlan(reservationEntity.getInsurancePlan());
        dto.setStatus(reservationEntity.getStatus().name());

        UserEntity userEntity = reservationEntity.getUser();

        StorageEntity storageEntity = reservationEntity.getStorage();
        if (storageEntity != null) {
            dto.setStorageId(storageEntity.getStorageId());
        }
//         Images
        List<ReservationImageResponseDto> imageDtos = reservationEntity.getReservationImages().stream()
                .map(image -> new ReservationImageResponseDto(image.getImageName(), image.getImagePath()))
                .collect(Collectors.toList());

        dto.setReservationImages(imageDtos); // 메서드 이름 변경

        return dto;
    }


}
