package com.fintech.Server.api.controller;

import com.fintech.Server.api.dto.ReservationCreateRequestDto;
import com.fintech.Server.api.dto.ReservationListResponseDto;
import com.fintech.Server.api.entity.ReservationEntity;
import com.fintech.Server.api.service.ImageUploadService;
import com.fintech.Server.api.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) { this.reservationService = reservationService;}

    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/images")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") MultipartFile[] images, @RequestParam("reservationId") Long reservationId) {
        try {
            String div = "reservation";
            List<String> imageUrls = imageUploadService.uploadImagesToNCP(images, reservationId, div);
            return new ResponseEntity<>(imageUrls, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<ReservationListResponseDto> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PostMapping("")
    public ResponseEntity<ReservationListResponseDto> createReservation(@RequestBody ReservationCreateRequestDto request) {
        ReservationListResponseDto reservationEntity = reservationService.createReservation(request);
        if (reservationEntity != null) {
            return ResponseEntity.ok(reservationEntity);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

//    @PutMapping("/{reservationId}")
//    public ReservationListResponseDto updateReservation(@PathVariable Long reservationId, @RequestBody ReservationListResponseDto reservationDto) {
//        return reservationService.updateReservation(reservationId, reservationDto);
//    }

    @DeleteMapping("/{reservationId}")
    public void deleteReservation(@PathVariable Long reservationId) {
        reservationService.deleteReservation(reservationId);
    }
}
