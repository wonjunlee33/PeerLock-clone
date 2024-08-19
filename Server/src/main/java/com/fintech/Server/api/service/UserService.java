package com.fintech.Server.api.service;

import com.fintech.Server.api.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    // 회원가입
    UserResponseDto register(UserRegistrationDto registrationDto);
    // 로그인
    UserInfoResponseDto login(UserLoginRequestDto request);
    // 게스트 -> 호스트로 전환 // 호스트 -> 게스트로 전환
    UserResponseDto switchStatus(Long userId);
    // 호스트 창고 목록 출력 List



    // 유저 정보 가져오기
    ResponseEntity<UserInfoResponseDto> getUserDetail(Long userId);

    // 전체 유저 정보 가져오기
    List<UserInfoResponseDto> getAllUsers();

    // 계정 지우기
    UserDeleteResponseDto deleteUser(Long userId);

}
