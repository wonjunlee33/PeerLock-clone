package com.fintech.Server.api.entity;

import com.fintech.Server.api.entity.user.UserEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "reservation")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Data
@Builder
public class ReservationEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reservation_id")
    private Long reservationId;

    @Column(name = "start_date", nullable = false )
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name="item_size", length = 50, nullable = false)
    private String itemSize;

    @Column(name = "insurance_plan", nullable = false)
    private String insurancePlan;

    @Column(name = "insurance_price", nullable = false)
    private Integer insurancePrice;

    @Column(name = "total_payment", nullable = false)
    private Integer totalPayment;
    @Column(name = "total_storage_price", nullable = false)
    private Integer totalStoragePrice;
    @Column(name = "total_months", nullable = false)
    private Integer totalMonths;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "storage_id", nullable = false)
    private StorageEntity storage;


    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationImageEntity> reservationImages;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private ReservationStatus status; // Available

}
