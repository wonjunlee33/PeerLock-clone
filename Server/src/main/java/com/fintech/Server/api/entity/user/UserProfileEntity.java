package com.fintech.Server.api.entity.user;

import com.fintech.Server.api.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "UserProfile")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Data
@Builder
public class UserProfileEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long profileId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity user;

    @Column(name = "image_name", length = 50)
    private String imageName;

    @Column(name = "path", length = 255)
    private String path;

    @Column(name = "introduction_text", length = 255)
    private String introductionText;

    @Column(name = "language", length = 100)
    private String language;

//    @Column(name = "status", length = 50)
//    private String status; // confirmation, unconfirmation
}
