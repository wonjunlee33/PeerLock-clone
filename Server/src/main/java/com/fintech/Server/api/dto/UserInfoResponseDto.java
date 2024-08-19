package com.fintech.Server.api.dto;

import com.fintech.Server.api.entity.StorageEntity;
import com.fintech.Server.api.entity.user.UserProfileEntity;
import com.fintech.Server.api.entity.user.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserInfoResponseDto {

    private Long userId;
    private String userName;
    private int userSex;
    private String userEmail;
    private Date userBirth;
    private String userPhoneNumber;
    private String status;
    private List<StorageListResponseDto> storages;

}