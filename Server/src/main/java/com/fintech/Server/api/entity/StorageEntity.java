package com.fintech.Server.api.entity;

import com.fintech.Server.api.entity.user.UserEntity;
import com.fintech.Server.api.entity.user.UserStatus;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "storage")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 파라미터가 없는 기본 생성자를 생성
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 만듬
@Data
@Builder
public class StorageEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "storage_id")
    private Long storageId;

    @Column(name = "storage_name", length = 50, nullable = false)
    private String storageName;

    @Column(name = "storage_address", length = 100, nullable = false)
    private String storageAddress;

    @Column(name = "storage_latitude", length = 100, nullable = false)
    private String storageLatitude;

    @Column(name = "storage_longitude", length = 100, nullable = false)
    private String storageLongitude;

    @Column(name = "storage_type", length = 50, nullable = false)
    private String storageType;

    @Column(name = "storage_feature", length = 50, nullable = false)
    private String storageFeature;

    @Column(name = "storage_size", length = 50, nullable = false)
    private String storageSize;

    @Column(name = "storage_price", nullable = false)
    private Integer storagePrice;

    @Column(name = "storage_description", columnDefinition = "TEXT", nullable = false)
    private String storageDescription;

    @Column(name = "service_commission", nullable = false)
    private Integer serviceCommission;

    @Column(name = "return_policy", columnDefinition = "TEXT", nullable = false)
    private String returnPolicy;

    @OneToMany(mappedBy = "storage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StorageImageEntity> storageImages;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private StorageStatus status; // Available

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

}
