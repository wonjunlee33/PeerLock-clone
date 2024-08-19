package com.fintech.Server.api.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReservationListResponseDto {
    private Long reservationId;
    private Date startDate;
    private Date endDate;
    private String itemSize;
    private String insurancePlan;
    private Integer insurancePrice;
    private Integer totalPayment;
    private Integer totalStoragePrice;
    private Integer totalMonths;
    private String paymentMethod;
    private Long userId;
    private Long storageId;
    private String status;
    private List<ReservationImageResponseDto> reservationImages;
}