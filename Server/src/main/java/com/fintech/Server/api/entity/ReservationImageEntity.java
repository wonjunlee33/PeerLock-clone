package com.fintech.Server.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "reservation_images")
@NoArgsConstructor(access = AccessLevel.PUBLIC) // 파라미터가 없는 기본 생성자를 생성
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 만듬
@Data
@Builder
public class ReservationImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_path", length = 300)
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "reservation_id", referencedColumnName = "reservation_id")
    private ReservationEntity reservation;


}
