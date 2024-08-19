package com.fintech.Server.api.dto;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserRegistrationDto {
    private String username;
    private String password;
    private int sex;
    private String email;
    private String phoneNumber;
    private Date birth;
    private String status;
}
